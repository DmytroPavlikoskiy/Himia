from django.urls import path
from . import views


urlpatterns = [
    path("", views.home, name="home"),
    path("sub_cut_products/<str:slug>", views.sub_cut_products, name="sub_cut_products"),
    path("register/", views.register, name="register"),
    path("login/", views.login_view, name="login"),
    path("logout/", views.logout_view, name="logout"),
]