from django.urls import path
from Liqpay import views

urlpatterns = [
    path("create_payment_by_card_btn/", views.create_payment_by_card_btn, name="create_payment_by_card_btn"),
    path("create_order_payment_by_card/", views.create_order_payment_by_card, name="create_order_payment_by_card"),
    path("thanks_for_buy/<int:order_id>", views.thanks_for_buy, name="thanks_for_buy"),
    # path("callback/", views.callback, name="callback"),
]