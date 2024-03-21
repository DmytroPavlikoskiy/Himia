from django.urls import path
from . import views


urlpatterns = [
    path("register/", views.register, name="register"),
    path("login/", views.login_view, name="login"),
    path("logout/", views.logout_view, name="logout"),
    path("user_profile/<int:user_id>", views.user_profile_page, name="user_profile_page"),
    path("upload_profile_image/", views.upload_profile_image, name="upload_profile_image"),
    path("delete_profile_image/", views.delete_profile_image, name="delete_profile_image"),
    path("get_order_detail/", views.get_order_detail, name="get_order_detail"),
    path("update_user_profile/", views.update_user_profile, name="update_user_profile"),
    path("check_old_password/", views.check_old_password, name="check_old_password"),
    path("update_password/", views.update_password, name="update_password"),
]