from django.urls import path
from . import views


urlpatterns = [
    path("", views.home, name="home"),
    path("catalog/<str:slug>", views.catalog, name="catalog"),
    path("product_detail/<int:id>", views.product_detail, name="product_detail"),
    path("create_sales_invoices/<int:order_id>", views.create_sales_invoices, name="create_sales_invoices"),
]