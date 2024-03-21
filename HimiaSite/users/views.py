from django.shortcuts import render, redirect
from django.contrib.auth.hashers import make_password
from django.contrib.auth.hashers import check_password
from django.urls import reverse
from django.http import JsonResponse, HttpResponse
from django.contrib.auth import login, authenticate, logout
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from django.core.exceptions import ObjectDoesNotExist
from .models import CustomUser

import json
import os

from .services import get_user_or_create_session
from basket.services import get_order

from basket.models import OrderDeliveryInfo, Order
from products.models import Category, SubCategory, SubSubCategory
from novaposhta.services import get_order_status


def register(request):
    if request.method == "POST":
        data = json.loads(request.body)
        first_name = data.get("first_name")
        last_name = data.get("last_name")
        email = data.get("email")
        phone_number = data.get("phone_number")
        checkbox = data.get("checkbox")
        password = data.get("password")

        user_by_email = CustomUser.objects.filter(email=email)
        if user_by_email.exists():
            return JsonResponse({"status": "error", "message": "Вибачте, такий Email вже зареєстрований!"})

        user_by_phone = CustomUser.objects.filter(phone_number=phone_number)
        if user_by_phone.exists():
            return JsonResponse({"status": "error", "message": "Вибачте, такий номер телефону вже зареєстрований!"})

        hashed_password = make_password(password)
        username, unnecessary = email.split("@")
        new_user = CustomUser.objects.create(
            username=username,
            first_name=first_name,
            last_name=last_name,
            email=email,
            phone_number=phone_number,
            acceptance_and_consent=checkbox,
            password=hashed_password
        )
        new_user.save()
        return JsonResponse({"status": "success", "message": "Дякуємо, ви успішно зареєстровані!"})
    else:
        return JsonResponse({"status": "error", "message": "Недопустимий метод запиту."})


def login_view(request):
    if request.method == "POST":
        data = json.loads(request.body)
        email = data.get("email")
        password = data.get("password")

        user = CustomUser.objects.filter(email=email).first()

        if user is not None:
            if user is not None and check_password(password, user.password):
                login(request, user)
                return JsonResponse(
                    {"status": "success", "message": "Авторизація успішна!", "redirect_url": reverse("home")})
            else:
                return JsonResponse(
                    {"status": "error", "message": "Перевірте, чи коректно введений ваш Емейл або Пароль!"})
        else:
            return JsonResponse(
                {"status": "error", "message": "Дані введено не коректно. Ви точно зареєстованні ?"})

    else:
        return JsonResponse({"status": "error", "message": "Недопустимий метод запиту."})


def logout_view(request):
    if request.method == "GET":
        logout(request)
        return redirect("home")
    else:
        return JsonResponse({"status": "error", "message": "Недопустимий метод запиту."})


def user_profile_page(request, user_id):
    try:
        print("HELLO")
        user = CustomUser.objects.get(id=user_id)
        order = Order.objects.filter(user=user, complete=False).first()
        orders = Order.objects.filter(user=user, complete=True).all()
        order_del_inf_list = OrderDeliveryInfo.objects.filter(order__in=orders)
        print(order_del_inf_list)
        category = Category.objects.all()
        sub_category = SubCategory.objects.all()
        sub_sub_category = SubSubCategory.objects.all()
        context = {
            "user": user,
            "orders": orders,
            "order": order,
            "order_del_inf_list": order_del_inf_list,
            "category": category,
            "sub_category": sub_category,
            "sub_sub_category": sub_sub_category,
        }
        return render(request, "user_profile.html", context=context)
    except CustomUser.DoesNotExist:
        return redirect("404_not_fount")


def get_order_detail(request):
    if request.method == "POST":
        data = json.loads(request.body)
        order_id = data.get("order_id")
        try:
            order = Order.objects.get(id=order_id, complete=True)
            order_items = order.orderitem_set.all()
            order_del_inf = OrderDeliveryInfo.objects.filter(order=order).first()

            payment_method = ""
            if order_del_inf.payment_method == "Card_on_website":
                payment_method = "Оплата карткою"
            if order_del_inf.payment_method == "Upon_Receipt":
                payment_method = "Оплата при полученні"

            order_del_inf_data = {
                "order_number": order_del_inf.order_number,
                "date_added": order_del_inf.date_added_date,
                "delivery_price": order_del_inf.delivery_price,
                "total_price": order_del_inf.total_price,
                "department_full_name": order_del_inf.department_full_name,
                "recipient_city": order_del_inf.city,
                "payment_method": payment_method,
                "recipient_name": f"{order_del_inf.name} {order_del_inf.surname}",
                "recipient_phone": order_del_inf.phone,
                "recipient_email": order_del_inf.email
            }
            data_order_status = get_order_status(order_id=order_id)
            serialized_order_items = []
            for order_item in order_items:
                item_data = {
                    "id": order_item.id,
                    "product": {
                        "name": order_item.product.name,
                        "image": order_item.product.image.url,
                        "price": order_item.product.price,
                        "discount": order_item.product.discount,
                        "discount_price": order_item.product.discount_price,
                        "action": order_item.product.action
                    },
                    "quantity": order_item.quantity,
                }
                serialized_order_items.append(item_data)
            return JsonResponse({"status": "success", "data": {
                "order_del_inf": order_del_inf_data,
                "order_items": serialized_order_items,
                "data_order_status": data_order_status,
                "total_count":  order.get_cart_item
            }})
        except Order.DoesNotExist:
            return JsonResponse({"status": "error", "message": f"Order with ID: {order_id} Not Found"}, status=404)


def update_user_profile(request):
    if request.method == "POST":
        data = json.loads(request.body)
        status_email_error = ""
        message_email_error = ""
        try:
            user = CustomUser.objects.get(id=int(data.get("user_id")))
            if data.get("first_name") != user.first_name:
                user.first_name = data.get("first_name")
            if data.get("last_name") != user.last_name:
                user.last_name = data.get("last_name")
            # Перевірка та оновлення електронної пошти
            new_email = data.get("email")
            if new_email != user.email:
                # Перевіряємо, чи існує користувач з такою поштою
                try:
                    existing_user = CustomUser.objects.get(email=new_email)
                    if existing_user != user:
                        status_email_error = "error"
                        message_email_error = "Користувач з таким емейлом вже існує."
                except ObjectDoesNotExist:
                    # Якщо користувач з таким емейлом не існує, оновлюємо емейл
                    user.email = new_email

            if data.get("phone_number") != user.phone_number:
                user.phone_number = data.get("phone_number")
            user.save()
            return JsonResponse({"status": "success", "message": "Дані успішно оновлено!",
                                 "status_email_error": status_email_error, "message_email_error": message_email_error, "email": user.email})
        except ObjectDoesNotExist:
            return JsonResponse({"status": "error", "message": "Упс, щось пішло не так!"})


def check_old_password(request):
    if request.method == "POST":
        data = json.loads(request.body)
        if data.get("user_id") == "" or data.get("old_password") == "":
            return JsonResponse({"status": "error", "message": "Будь ласка, введіть старий пароль."})
        try:
            user = CustomUser.objects.get(id=int(data.get("user_id")))
            if user and check_password(data.get("old_password"), user.password):
                return JsonResponse({"status": "success", "message": "Введіть новий пароль", "password": True})
            else:
                return JsonResponse({"status": "error", "message": "Невірний пароль"})
        except ObjectDoesNotExist:
            return JsonResponse({"status": "error", "message": "Упс, щось пішло не так!"})


def update_password(request):
    if request.method == "POST":
        data = json.loads(request.body)
        if data.get("user_id") == "" or data.get("old_password") == "":
            return JsonResponse({"status": "error", "message": "Будь ласка, введіть новий пароль."})
        try:
            user = CustomUser.objects.get(id=int(data.get("user_id")))
            hashed_password = make_password(data.get("old_password"))
            user.password = hashed_password
            user.save()
            login(request, user)
            return JsonResponse({"status": "success", "message": "Пароль оновлено."})
        except ObjectDoesNotExist:
            return JsonResponse({"status": "error", "message": "Упс, щось пішло не так!"})


def upload_profile_image(request):
    user_id = request.POST.get("user_id")
    image_file = request.FILES.get("image")
    if user_id and image_file:
        try:
            user = CustomUser.objects.get(id=user_id)
            # Перевіряємо, чи існує вже фото у користувача
            if user.image:
                # Видаляємо старе фото
                old_image_path = user.image.path
                if default_storage.exists(old_image_path):
                    default_storage.delete(old_image_path)
            # Зберігаємо нове фото
            file_path = default_storage.save(f"profile_user_image/{image_file.name}", ContentFile(image_file.read()))
            user.image = file_path
            user.save()
            return JsonResponse({"success": "Ваше фото успішно добавлено!", "image_url": user.image.url})
        except CustomUser.DoesNotExist:
            return JsonResponse({"error": "Щось пішло не так, користувача не знайдено!"}, status=404)
    else:
        return JsonResponse({"error": "Помилка: Неправильні дані запиту!"}, status=400)


def delete_profile_image(request):
    if request.method == "POST":
        data = request.body
        data_json = json.loads(data)
        user_id = data_json.get("user_id")

        try:
            user = CustomUser.objects.get(id=int(user_id))
            image_path = user.image.path
            if os.path.exists(image_path):
                os.remove(image_path)
            user.image.delete()
            return JsonResponse({"success": "Фотографія успішно видалена!"})
        except CustomUser.DoesNotExist:
            return JsonResponse({"error": "Щось пішло не так, користувача не знайдено!"}, status=404)
    else:
        return JsonResponse({"error": "Метод не знайдено!"}, status=405)


