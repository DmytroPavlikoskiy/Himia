import logging

from django.shortcuts import redirect, render
from liqpay import LiqPay
from django.http import JsonResponse
import json
import requests
from django.conf import settings
from django.http import HttpResponseServerError

from basket.models import OrderDeliveryInfo, Order

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
            "paytypes": "card|gpay|apay|liqpay|privat24|qr",
            "order_id": body.get("order"),
            "result_url": f"https://e859-194-44-22-149.ngrok-free.app/liqpay/thanks_for_buy/{int(body.get('order'))}"
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
        order_instance = Order.objects.get(id=body.get("order"))
        OrderDeliveryInfo.objects.create(
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
            city=body.get("city"),
            city_ref=body.get("city_ref"),
            total_price=body.get("total_price"),
            total_weight=body.get("total_weight"),
            liqpay_data=body.get("data"),
            liqpay_signature=body.get("signature"),
        )
        return JsonResponse({"success": "Successfully"})
    else:
        return JsonResponse({"error": "Method Not Found!"})


def thanks_for_buy(request, order_id):
    try:
        order = Order.objects.get(id=order_id)
        order_del_inf = OrderDeliveryInfo.objects.get(order=order)
        context = {
            "order_del_inf": order_del_inf
        }
        liqpay = LiqPay(settings.LIQPAY_PUBLIC_KEY, settings.LIQPAY_PRIVATE_KEY)
        print(f"liqpay_data: {order_del_inf.liqpay_data}\nliqpay_signature: {order_del_inf.liqpay_signature}\norder_id: {order_del_inf.order.id}")
        data = {
            "data": order_del_inf.liqpay_data,
            "signature": order_del_inf.liqpay_signature,
            "action": "status",
            "order_id": order_del_inf.order.id
        }
        res = liqpay.api("request", data)
        status = res.get("status")
        if status == "success":

            return render(request, "thanks_for_buy.html", context=context)
        else:
            context_error = {
                "error": f"Шановн(ий-на){order_del_inf.name} Щось пішло не так зверніться в службу підтримки. Ваше замолвення №{order_del_inf.id}"
            }
            return render(request, "thanks_for_buy.html", context=context_error)
    except Order.DoesNotExist:
        logging.exception(f"Order with id: {order_id} does not exist!")
    except OrderDeliveryInfo.DoesNotExist:
        logging.exception(f"OrderDeliveryInfo with order_id: {order_id} does not exist!")
    except Exception as e:
        logging.exception(f"An unexpected error occurred: {str(e)}")

    return HttpResponseServerError("An unexpected error occurred.")

# def callback(request_data):
#     res = request_data
#     if isinstance(res, bytes):
#         res_str: str = res.decode("utf-8")
#     else:
#         res_str: str = res
#
#     res_str = unquote(res_str)
#     resp_dict = {}
#     for el in res_str.split("&"):
#         try:
#             k, v = el.split("=", 1)
#             resp_dict[k] = v
#         except:
#             logging.exception(f"parsed text for param hasn't '=', param - {el},\nall request - {res}")
#     print(resp_dict)
#     if not resp_dict.get("signature"):
#         logging.info(f"server request hasn't parametr signature, request_data: \n{request_data}")
#         return 404
#     try:
#         order_del_inf = OrderDeliveryInfo.objects.filter(liqpay_signature=resp_dict.get("signature"), liqpay_data=resp_dict.get("data")).first()
#         data = order_del_inf.liqpay_data
#         data_decoded = base64.b64decode(data).decode("utf-8")
#         params = json.loads(data_decoded)
#         print(params)
#     except:
#         logging.info(f"OrderDeliveryInfo hasn't objects with this signature {resp_dict.get('signature')},\n Or not correct data {resp_dict.get('data')}")
#         return 404