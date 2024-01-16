from django.urls import path
from . import views

urlpatterns = [
    path("save_comment_rating_for_product/", views.save_comment_rating_for_product, name="save_comment_rating_for_product"),
]