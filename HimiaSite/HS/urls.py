from django.urls import path
from .views import home, search, sub_cut_products


urlpatterns = [
    path("", home, name="home"),
    path("search", search, name="search"),
    # path("products", get_products_data, name="products"),
    # path("products_sub_cut", products_sub_cut, name="products_sub_cut"),
    path("sub_cut_products/<str:slug>", sub_cut_products, name="sub_cut_products"),
]