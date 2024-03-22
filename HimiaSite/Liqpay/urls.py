from django.urls import path
from Liqpay import views

urlpatterns = [
    path("create_payment_by_card_btn/", views.create_payment_by_card_btn, name="create_payment_by_card_btn"),
    path("create_order_payment_by_card/", views.create_order_payment_by_card, name="create_order_payment_by_card"),
    path("crete_confirmed_order/", views.crete_confirmed_order, name="crete_confirmed_order"),
    path("thanks_for_buy/<int:order_id>", views.thanks_for_buy, name="thanks_for_buy"),
    path("loader_thanks_for_buy/<int:order_id>/", views.loader_thanks_for_buy, name="loader_thanks_for_buy"),
    path("check_order_status/", views.check_order_status, name="check_order_status"),
]