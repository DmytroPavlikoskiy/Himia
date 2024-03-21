import logging

from django.shortcuts import redirect, render
from liqpay import LiqPay
from django.http import JsonResponse
import json
import requests
from django.conf import settings
from django.db.models import Q
from django.http import HttpResponseServerError

from basket.models import OrderDeliveryInfo, Order, ExpressWaybill
from users.services import get_user_or_session
from novaposhta.services import creation_of_an_express_invoice

from django.utils import timezone
from datetime import datetime

from urllib.parse import unquote
import base64


def create_payment_by_card_btn(request):
    if request.method == "POST":
        body = json.loads(request.body)
        liqpay = LiqPay(settings.LIQPAY_PUBLIC_KEY, settings.LIQPAY_PRIVATE_KEY)
        params = {
            "version": 3,
            "action": "pay",
            "amount": body.get("total_price"),
            "currency": "UAH",
            "description": "Test",
            "language": "uk",
            "paytypes": "gpay, apay, liqpay, privat24, card, qr",
            "order_id": body.get("for_liqpay_order_id"),
            "result_url": f"http://localhost:2000/liqpay/thanks_for_buy/{int(body.get('order'))}"
            # "server_url": "https://5968-194-44-22-149.ngrok-free.app/liqpay/callback/",
        }
        signature = liqpay.cnb_signature(params)
        data = liqpay.cnb_data(params)
        return JsonResponse({"data": data, "signature": signature})
    else:
        return JsonResponse({"data_error": "Method Not Found!"})


def create_order_payment_by_card(request):
    if request.method == "POST":
        body = json.loads(request.body)
        try:
            order_instance = Order.objects.get(id=body.get("order"))
            order_delivery_info = OrderDeliveryInfo.objects.create(
                order=order_instance,
                name=body.get("name"),
                surname=body.get("surname"),
                phone=body.get("phone"),
                email=body.get("email"),
                delivery=body.get("delivery"),
                street=body.get("street"),
                home=body.get("home"),
                apartment=body.get("apartment"),
                department_full_name=body.get("department_full_name"),
                recipient_depart_ref=body.get("recipient_depart_ref"),
                recipient_index=body.get("recipient_index"),
                city=body.get("city"),
                city_ref=body.get("city_ref"),
                total_price=float(body.get("total_price")),
                delivery_price=float(body.get("delivery_cost")),
                total_weight=body.get("total_weight"),
                liqpay_data=body.get("data"),
                liqpay_signature=body.get("signature"),
                payment_method=body.get("payment_method")
            )
        except Order.DoesNotExist:
            return JsonResponse({"error": "Order does not exist"}, status=400)
        except Exception as e:
            logging.exception(f"ERROR: {str(e)}")
            return JsonResponse({"error": "error", "message": f"Упс! Сталась помилка, при обробці даних. Будь ласка Зверніться до Служби підтримки Ordedr ID: {body.get('order')}"}, status=500)

        return JsonResponse({"success": "Successfully"})
    else:
        return JsonResponse({"error": "Method Not Found!"})


def crete_confirmed_order(request):
    if request.method == "POST":
        body = json.loads(request.body)
        try:
            order_instance = Order.objects.get(id=body.get("order"))
            order_delivery_info = OrderDeliveryInfo.objects.create(
                order=order_instance,
                name=body.get("name"),
                surname=body.get("surname"),
                phone=body.get("phone"),
                email=body.get("email"),
                delivery=body.get("delivery"),
                street=body.get("street"),
                home=body.get("home"),
                apartment=body.get("apartment"),
                department_full_name=body.get("department_full_name"),
                recipient_depart_ref=body.get("recipient_depart_ref"),
                recipient_index=body.get("recipient_index"),
                city=body.get("city"),
                city_ref=body.get("city_ref"),
                total_price=float(body.get("total_price")),
                delivery_price=float(body.get("delivery_cost")),
                total_weight=body.get("total_weight"),
                payment_method=body.get("payment_method")
            )
        except Order.DoesNotExist:
            return JsonResponse({"error": "Order does not exist"}, status=400)
        except Exception as e:
            logging.exception(f"ERROR: {str(e)}")
            return JsonResponse({"error": "error", "message": f"Упс! Сталась помилка, при обробці даних. Будь ласка Зверніться до Служби підтримки Ordedr ID: {body.get('order')}"}, status=500)
        order_instance.complete = True
        order_instance.status = "success"
        order_instance.save()
        creation_of_an_express_invoice(order=order_instance)
        return JsonResponse({"success": "Successfully", "order_id": order_instance.id})
    else:
        return JsonResponse({"error": "Method Not Found!"})


def thanks_for_buy(request, order_id):
    try:
        user_or_session = get_user_or_session(request)
        order = Order.objects.get(
            id=order_id,
            user=user_or_session if hasattr(user_or_session, 'id') else None,
            session_id=user_or_session.session_key if hasattr(user_or_session, 'session_key') else None
        )
        order_del_inf = OrderDeliveryInfo.objects.get(order=order)
        if order_del_inf.delivery == "Courier":
            context = {
                "order_del_inf": order_del_inf,
            }
        else:
            express_waybill = ExpressWaybill.objects.get(order=order)
            context = {
                "order_del_inf": order_del_inf,
                "express_waybill": express_waybill,
            }
        return render(request, "thanks_for_buy.html", context=context)

    except Order.DoesNotExist:
        logging.exception(f"Order with id: {order_id} does not exist!")
        return redirect("404_not_found")
    except OrderDeliveryInfo.DoesNotExist:
        logging.exception(f"OrderDeliveryInfo with order_id: {order_id} does not exist!")
        return redirect("404_not_found")
    except Exception as e:
        logging.exception(f"An unexpected error occurred: {str(e)}")
        return redirect("404_not_found")
