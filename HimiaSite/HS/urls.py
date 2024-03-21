from django.urls import path
from . import views


urlpatterns = [
    path("", views.home, name="home"),
    path("sub_cut_products/<str:slug>", views.sub_cut_products, name="sub_cut_products"),
    path("product_detail/<int:id>", views.product_detail, name="product_detail"),
    path("create_sales_invoices/<int:order_id>", views.create_sales_invoices, name="create_sales_invoices"),
]