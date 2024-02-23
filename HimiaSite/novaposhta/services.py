import requests
import json
from django.conf import settings
from django.http import JsonResponse



def get_cities(request):
    if request.method == "POST":
        search_city = request.POST.get('search_city')
        # print(f"NP_API_TOKEN: {settings.NP_API_TOKEN}")
        # print(f"NP_API_URL: {settings.NP_API_URL}")
        if search_city:
            header = {
                "apiKey": settings.NP_API_TOKEN,
                "Content-Type": "application/json",
            }
            payload = {
                "modelName": "Address",
                "calledMethod": "searchSettlements",
                "methodProperties": {
                    "CityName": str(search_city),
                }
            }
            response = requests.post(url=settings.NP_API_URL, headers=header, data=json.dumps(payload))

            if response.status_code == 200:
                data = response.json()
                if data:
                    # print(data)
                    cities_data = []  # Створіть список для збереження даних про міста

                    response_data = data.get('data', [])
                    Addresses = response_data[0]
                    for item in Addresses.get('Addresses'):
                        city_info = {
                            'Present': item.get('Present'),
                            'Ref': item.get('Ref'),
                            'MainDescription': item.get('MainDescription'),
                        }
                        cities_data.append(city_info)  # Додайте дані міста до списку

                    return JsonResponse({"data": cities_data})  # Передайте список міст на фронтенд
        else:
            return JsonResponse({"data": {"error": "Щось пішло не так!"}})


def get_departments(request):
    if request.method == "POST":
        try:
            search_dep = request.POST.get('search_dep')
            total_order_weight = request.POST.get("total_order_weight")
            if search_dep:
                header = {
                    "apiKey": settings.NP_API_TOKEN,
                    "Content-Type": "application/json",
                }
                payload = {
                    "modelName": "Address",
                    "calledMethod": "getWarehouses",
                    "methodProperties": {
                        "CityName": search_dep,
                        "TypeOfWarehouseRef": "841339c7-591a-42e2-8233-7a0a00f0ed6f",
                    }
                }
                response = requests.post(url=settings.NP_API_URL, headers=header, data=json.dumps(payload))
                if response.status_code == 200:
                    data = response.json()
                    if data:
                        rep_list = []
                        response_data = data.get('data', [])
                        for item in response_data:
                            total_weight = item.get("TotalMaxWeightAllowed")
                            if float(total_order_weight) <= float(total_weight):
                                dep_info = {
                                    "Description": item.get("Description"),
                                    "ShortAddress": item.get("ShortAddress"),
                                    "RecipientDepartRef": item.get("Ref"),
                                    "RecipientWarehouseIndex": item.get("WarehouseIndex"),
                                }
                                rep_list.append(dep_info)
                        return JsonResponse({"data": rep_list})  # Передайте список міст на фронтенд
                    else:
                        # Відправляємо помилку на фронтенд, якщо отримано невдалу відповідь
                        return JsonResponse({"error": "Отримано невдалу відповідь від сервера Нової Пошти"}, status=500)
                else:
                    return
            else:
                # Відправляємо помилку на фронтенд, якщо не обране місто або вулиця
                return JsonResponse({"status": "error", "message": "Будь ласка, оберіть Місто!"}, status=400)

        except Exception as e:
            print(str(e))
            return JsonResponse({"status": "error", "message": "Щось пішло не так!"}, status=500)
    else:
        return


def get_postal_machine(request):
    if request.method == "POST":
        try:
            search_pm = request.POST.get('search_pm')
            total_order_weight = request.POST.get("total_order_weight")
            if search_pm:
                header = {
                    "apiKey": settings.NP_API_TOKEN,
                    "Content-Type": "application/json",
                }
                payload = {
                    "modelName": "Address",
                    "calledMethod": "getWarehouses",
                    "methodProperties": {
                        "CityName": search_pm,
                        "TypeOfWarehouseRef": "f9316480-5f2d-425d-bc2c-ac7cd29decf0",
                    }
                }
                response = requests.post(url=settings.NP_API_URL, headers=header, data=json.dumps(payload))
                if response.status_code == 200:
                    data = response.json()
                    if data:
                        rep_list = []
                        response_data = data.get('data', [])
                        for item in response_data:
                            total_weight = item.get("TotalMaxWeightAllowed")
                            if float(total_order_weight) <= float(total_weight):
                                dep_info = {
                                    "Description": item.get("Description"),
                                    "ShortAddress": item.get("ShortAddress"),
                                    "RecipientDepartRef": item.get("Ref"),
                                    "RecipientWarehouseIndex": item.get("WarehouseIndex"),
                                }
                                rep_list.append(dep_info)
                        return JsonResponse({"data": rep_list})  # Передайте список міст на фронтенд
                    else:
                        # Відправляємо помилку на фронтенд, якщо отримано невдалу відповідь
                        return JsonResponse({"error": "Отримано невдалу відповідь від сервера Нової Пошти"}, status=500)
                else:
                    return
            else:
                return JsonResponse({"status": "error", "message": "Будь ласка, оберіть Місто!"}, status=400)

        except Exception as e:
            print(str(e))
            return JsonResponse({"status": "error", "message": "Щось пішло не так!"}, status=500)
    else:
        return


def get_streets(request):
    if request.method == "POST":
        try:
            # selected_city_ref = request.POST.get('selectedCityRef')
            selected_city_ref = request.POST.get('dataRef')
            selected_street = request.POST.get('selectedStreet')
            data_city_ref = request.POST.get("dataCityRef")
            if selected_city_ref:
                if selected_street:
                    header = {
                        "apiKey": settings.NP_API_TOKEN,
                        "Content-Type": "application/json",
                    }
                    payload = {
                        "modelName": "Address",
                        "calledMethod": "searchSettlementStreets",
                        "methodProperties": {
                            "StreetName": str(selected_street),
                            "SettlementRef": str(data_city_ref),
                        }
                    }
                    response = requests.post(url=settings.NP_API_URL, headers=header, data=json.dumps(payload))

                    if response.status_code == 200:
                        data = response.json()
                        if data:
                            streets_data = []  # Створіть список для збереження даних про міста

                            response_data = data.get('data', [])
                            Addresses = response_data[0]
                            for item in Addresses.get('Addresses'):
                                city_info = {
                                    'Present': item.get('Present'),
                                }
                                streets_data.append(city_info)  # Додайте дані міста до списку

                            return JsonResponse({"data": streets_data})  # Передайте список міст на фронтенд
                    else:
                        # Відправляємо помилку на фронтенд, якщо отримано невдалу відповідь
                        return JsonResponse({"error": "Отримано невдалу відповідь від сервера Нової Пошти"}, status=500)
                else:
                    return
            else:
                # Відправляємо помилку на фронтенд, якщо не обране місто або вулиця
                return JsonResponse({"status": "error", "message": "Будь ласка, виберіть Місто"}, status=400)

        except Exception as e:
            print(str(e))
            return JsonResponse({"status": "error", "message": "Будь ласка, виберіть Місто"}, status=500)
    else:
        return JsonResponse({"status": "error", "message": "Невірний метод запиту"}, status=500)


def calc_cost_of_delivery(request):
    if request.method == "POST":
        data = json.loads(request.body)
        selected_city_ref = data.get("selectedCityRef")
        total_order_weight = data.get("total_order_weight")
        order_price = data.get("order_price")
        if selected_city_ref and total_order_weight and order_price:
            header = {
                "apiKey": settings.NP_API_TOKEN,
                "Content-Type": "application/json",
            }
            payload = {
                "modelName": "InternetDocument",
                "calledMethod": "getDocumentPrice",
                "methodProperties": {
                    "CitySender": "e71abb60-4b33-11e4-ab6d-005056801329",
                    "CityRecipient": str(selected_city_ref),
                    "Weight": str(total_order_weight),
                    "ServiceType": "WarehouseWarehouse",
                    "Cost": str(order_price),
                    "CargoType": "Parcel",
                    "SeatsAmount": "1",
                    "PackCount": "1"
                }
            }
            response = requests.post(url=settings.NP_API_URL, headers=header, data=json.dumps(payload))

            res = response.json()
            data = res.get("data")
            return JsonResponse({"Cost": data[0].get("Cost"), "AssessedCost": data[0].get("AssessedCost")}, status=200)
        else:
            return JsonResponse({"status": "error", "message": "Невистарчає даних"}, status=500)
    else:
        return JsonResponse({"status": "error", "message": "Невірний метод запиту"}, status=500)
