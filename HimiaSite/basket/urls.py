from django.urls import path
from . import views


urlpatterns = [
    path("", views.basket_detail, name="basket_detail"),
    path('basket_add_home_page/', views.basket_add_home_page, name='basket_add_home_page'),
    path('basket_detail/', views.basket_detail, name="basket_detail"),
    path('basket_add_product/', views.basket_add_product, name="basket_add_product"),
    path('basket_remove_product/', views.basket_remove_product, name="basket_remove_product"),
    path('remove_product/', views.remove_product, name='remove_product'),
    path('basket_input_value_product/', views.basket_input_value_product, name="basket_input_value_product"),
    path('checkout/', views.checkout, name='checkout'),
    path('delete_basket/', views.delete_basket, name="delete_basket"),
    path('remove_reserved_products/', views.remove_reserved_products, name="remove_reserved_products"),
    path('remove_basked_and_reserved_products/', views.remove_basked_and_reserved_products, name="remove_basked_and_reserved_products"),
    path('add_reserved_product/', views.add_reserved_product, name="add_reserved_product"),
    path("changing_basket/", views.changing_basket, name="changing_basket"),
]