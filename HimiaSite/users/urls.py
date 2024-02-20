from django.urls import path
from . import views


urlpatterns = [
    # path("", views.home, name="home"),
    path("register/", views.register, name="register"),
    path("login/", views.login_view, name="login"),
    path("logout/", views.logout_view, name="logout"),
    path("user_profile/<int:user_id>", views.user_profile_page, name="user_profile_page"),
    path("upload_profile_image/", views.upload_profile_image, name="upload_profile_image"),
    path("delete_profile_image/", views.delete_profile_image, name="delete_profile_image"),
]