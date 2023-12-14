from django.shortcuts import render, redirect
from django.contrib.auth.hashers import make_password
from django.contrib.auth.hashers import check_password
from django.urls import reverse
from django.http import JsonResponse, HttpResponse
from django.contrib.auth import login, authenticate, logout
from .models import CustomUser
import json


def register(request):
    if request.method == "POST":
        data = json.loads(request.body)
        first_name = data.get("first_name")
        last_name = data.get("last_name")
        email = data.get("email")
        phone_number = data.get("phone_number")
        checkbox = data.get("checkbox")
        password = data.get("password")
        user = CustomUser.objects.filter(email=email)
        username, unnecessary = email.split("@")

        if user.exists():
            return JsonResponse({"status": "error", "message": "Цей Емейл вже Зареєстрований!"})
        user = CustomUser.objects.filter(phone_number=phone_number)
        if user.exists():
            return JsonResponse({"status": "error", "message": "Цей Номер вже Зареєстрований!"})
        else:
            hashed_password = make_password(password)  # Захешований пароль
            new_user = CustomUser.objects.create(
                username=username,
                first_name=first_name,
                last_name=last_name,
                email=email,
                phone_number=phone_number,
                acceptance_and_consent=checkbox,
                password=hashed_password
            )
            # new_user.set_password(hashed_password)  # Встановлюємо захешований пароль
            new_user.save()
            return JsonResponse({"status": "success", "message": "Дякуємо, ви успішно Зареєстровані!"})
    else:
        return


def login_view(request):
    if request.method == "POST":
        data = json.loads(request.body)
        email = data.get("email")
        password = data.get("password")

        user = CustomUser.objects.filter(email=email).first()

        print(user.password)
        print(check_password(password, user.password))
        if user is not None and check_password(password, user.password):
            login(request, user)
            return JsonResponse({"status": "success", "message": "Авторизація успішна!", "redirect_url": reverse("home")})
        else:
            return JsonResponse({"status": "error", "message": "Перевірте, чи коректно введений ваш Емейл або Пароль!"})

    else:
        return JsonResponse({"status": "error", "message": "Недопустимий метод запиту."})


def logout_view(request):
    if request.method == "GET":
        logout(request)
        return redirect("home")
    else:
        return JsonResponse({"status": "error", "message": "Недопустимий метод запиту."})