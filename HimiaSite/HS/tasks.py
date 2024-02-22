# from __future__ import absolute_import, unicode_literals

import json
import logging
import time
import datetime
import os
from HimiaSite.celery_app import app
from django.http import JsonResponse

from liqpay import LiqPay

from django.conf import settings
from celery import shared_task
from basket.models import OrderDeliveryInfo, Order

# from celery.task.control import revoke, inspect


def add_order_inf_in_order_model(order_id:int, transaction_id:int, liqpay_order_id:str, payment_id:int, status:str):
    try:
        order = Order.objects.get(id=order_id)
        order.transaction_id = transaction_id
        order.liqpay_order_id = liqpay_order_id
        order.payment_id = payment_id
        order.status = status
        order.complete = True
        order.save()
        return {"success": "success"}
    except Order.DoesNotExist:
        return {"error": "DoesNotExist"}


@app.task
def get_order_status():
    orders = Order.objects.filter(complete=False).all()
    if orders:
        liqpay = LiqPay(settings.LIQPAY_PUBLIC_KEY, settings.LIQPAY_PRIVATE_KEY)

        for order in orders:
            order_id = order.id
            try:
                order_del_inf = OrderDeliveryInfo.objects.get(order=order_id)
                data = {
                    "data": order_del_inf.liqpay_data,
                    "signature": order_del_inf.liqpay_signature,
                    "action": "status",
                    "order_id": order_id
                }
                res = liqpay.api("request", data)
                if res.get('status') == "success":
                    add_order_inf_in_order_model(order_id=order_id, transaction_id=int(res.get('transaction_id')),
                                                 liqpay_order_id=str(res.get('liqpay_order_id')),
                                                 payment_id=int(res.get('payment_id')),
                                                 status=str(res.get('status')))

            except OrderDeliveryInfo.DoesNotExist:
                logging.exception(f"OrderDeliveryInfo does not exist for Order with id: {order_id}")
            except Exception as e:
                logging.exception(f"An error occurred: {str(e)}")