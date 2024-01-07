from __future__ import absolute_import, unicode_literals

import json
import logging
import time
import datetime
import os
from HimiaSite.celery_app import app

from liqpay import LiqPay

from django.conf import settings
from celery import shared_task
from basket.models import OrderDeliveryInfo, Order

# from celery.task.control import revoke, inspect


# @app.task
# def get_order_status():
#     orders = Order.objects.filter(complete=False).all()
#     liqpay = LiqPay(settings.LIQPAY_PUBLIC_KEY, settings.LIQPAY_PRIVATE_KEY)
#
#     for order in orders:
#         order_id = order.id
#         try:
#             order_del_inf = OrderDeliveryInfo.objects.get(order=order_id)
#             data = {
#                 "data": order_del_inf.liqpay_data,
#                 "signature": order_del_inf.liqpay_signature,
#                 "action": "status",
#                 "order_id": order_id
#             }
#             res = liqpay.api("request", data)
#             print(res)
#         except OrderDeliveryInfo.DoesNotExist:
#             logging.exception(f"OrderDeliveryInfo does not exist for Order with id: {order_id}")
#         except Exception as e:
#             logging.exception(f"An error occurred: {str(e)}")