from django.shortcuts import render, redirect
from django.contrib.auth.hashers import make_password
from django.contrib.auth.hashers import check_password
from django.urls import reverse
from django.http import JsonResponse, HttpResponse
from django.contrib.auth import login, authenticate, logout
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from .models import CustomUser

import json
import os

from basket.models import OrderDeliveryInfo, Order


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
        orders = Order.objects.filter(user=user, complete=True).all()
        order_del_inf_list = OrderDeliveryInfo.objects.filter(order__in=orders)
        context = {
            "user": user,
            "order_del_inf_list": order_del_inf_list
        }
        return render(request, "user_profile.html", context=context)
    except CustomUser.DoesNotExist:
        return redirect("404_not_fount")


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


