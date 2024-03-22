import requests
import json
from django.conf import settings
from django.http import JsonResponse
from django.core.exceptions import ObjectDoesNotExist

from .models import CounterpartyNP
from basket.models import OrderDeliveryInfo, Order, ExpressWaybill
import logging
from TelegramBot.send_message_telegram_chanel import send_message_to_channel
import openpyxl
import asyncio

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
        data_del = data.get("dataDel")
        if data_del == "Courier":
            return JsonResponse({"status": "success", "Cost": 0, "AssessedCost": order_price, "del_choice": data_del}, status=200)
        if data_del == "NP-Branch" or data_del == "NP-Postal-Machine":
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
                return JsonResponse({"status": "success", "Cost": data[0].get("Cost"), "AssessedCost": data[0].get("AssessedCost"), "del_choice": data_del},
                                    status=200)
            else:
                return JsonResponse({"status": "error", "message": "Невистарчає даних"}, status=500)
        else:
            return JsonResponse({"status": "error", "message": "Будь ласка, оберіть спосіб доставки!"})
    else:
        return JsonResponse({"status": "error", "message": "Невірний метод запиту"}, status=500)


def create_express_invoice(counterparty_res: CounterpartyNP, order_del_inf: OrderDeliveryInfo):
    payment_method = order_del_inf.payment_method
    cost = order_del_inf.total_price - order_del_inf.delivery_price
    payload = {
        "apiKey": settings.NP_API_TOKEN,
        "modelName": "InternetDocument",
        "calledMethod": "save",
        "methodProperties": {
            "SenderWarehouseIndex": "74/4",  # Відділення 200, з відки відправляємо товари!!!
            "RecipientWarehouseIndex": str(order_del_inf.recipient_index),
            "PayerType": "Sender" if payment_method == "Card_on_website" else "Recipient",
            "PaymentMethod": "Cash",
            "DateTime": order_del_inf.get_estimated_shipping_date,
            "CargoType": "Parcel",
            "Weight": str(order_del_inf.total_weight),
            "ServiceType": "WarehouseWarehouse" if order_del_inf.delivery == "NP-Branch" else "WarehouseDoors",
            "SeatsAmount": "1",
            "Description": "ТЕСТ ТЕСТ ТЕСТ",
            "Cost": str(cost),
            "CitySender": "e71abb60-4b33-11e4-ab6d-005056801329",  # ПОТІМ ПОМІНЯТИ НА НЕ ТЕСТОВІ ДАННІ
            "Sender": "82fb8da1-eb08-11eb-8513-b88303659df5",  # ПОТІМ ПОМІНЯТИ НА НЕ ТЕСТОВІ ДАННІ
            "SenderAddress": "1ec09daf-e1c2-11e3-8c4a-0050568002cf",  # ПОТІМ ПОМІНЯТИ НА НЕ ТЕСТОВІ ДАННІ
            "ContactSender": "82fd2e9d-eb08-11eb-8513-b88303659df5",  # ПОТІМ ПОМІНЯТИ НА НЕ ТЕСТОВІ ДАННІ
            "SendersPhone": "380630000000",  # ПОТІМ ПОМІНЯТИ НА НЕ ТЕСТОВІ ДАННІ
            "CityRecipient": str(order_del_inf.city_ref),
            "Recipient": str(counterparty_res.ref),
            "RecipientAddress": str(order_del_inf.recipient_depart_ref),
            "ContactRecipient": str(counterparty_res.contact_person_ref),
            "RecipientsPhone": str(order_del_inf.phone)
        }
    }
    response = requests.post(url=settings.NP_API_URL, json=payload)
    res = response.json()
    print(res)
    if res.get("success") is True:
        data = res.get("data")
        print(order_del_inf.order, data[0].get("Ref"), data[0].get("CostOnSite"), data[0].get("EstimatedDeliveryDate"),
              data[0].get("IntDocNumber"))
        express_waybill = ExpressWaybill.objects.create(
            order=order_del_inf.order,
            waybill_ref=data[0].get("Ref"),
            cost_on_site=data[0].get("CostOnSite"),
            estimated_delivery_date=data[0].get("EstimatedDeliveryDate"),
            int_doc_number=data[0].get("IntDocNumber"),
        )
        link = f"https://www.WhiteCollar.ua/informations_for_order/{order_del_inf.order.id}"
        loop = asyncio.get_event_loop()
        loop.run_until_complete(send_message_to_channel(message=link))


def get_or_create_recipient_counterparty(order_del_inf: OrderDeliveryInfo, user_id=None, session_id=None):
    if user_id is not None:
        print("************if user_id is not None:**************")
        payload = {
            "apiKey": settings.NP_API_TOKEN,
            "modelName": "Counterparty",
            "calledMethod": "save",
            "methodProperties": {
                "FirstName": str(order_del_inf.name),
                "LastName": str(order_del_inf.surname),
                "Phone": str(order_del_inf.phone),
                "Email": str(order_del_inf.email),
                "CounterpartyType": "PrivatePerson",
                "CounterpartyProperty": "Recipient"
            }
        }
        response = requests.post(url=settings.NP_API_URL, json=payload)

        res = response.json()
        print(res)
        status = res.get("success")
        if status is True:
            data = res.get("data")

            contact_person_dict = data[0].get("ContactPerson")
            contact_person_data = contact_person_dict.get("data")

            counterparty_res, created = CounterpartyNP.objects.get_or_create(
                user=order_del_inf.order.user,
                ref=data[0].get('Ref'),
                description=data[0].get("Description"),
                first_name=data[0].get("FirstName"),
                last_name=data[0].get("LastName"),
                counterparty_type=data[0].get("CounterpartyType"),
                contact_person_ref=contact_person_data[0].get("Ref"),
                contact_person_description=contact_person_data[0].get("Description"),
                contact_person_first_name=data[0].get("FirstName"),
                contact_person_last_name=data[0].get("LastName")
            )
            return counterparty_res
    elif session_id is not None:
        print("************elif session_id is not None:**************")
        payload = {
            "apiKey": settings.NP_API_TOKEN,
            "modelName": "Counterparty",
            "calledMethod": "save",
            "methodProperties": {
                "FirstName": str(order_del_inf.name),
                "LastName": str(order_del_inf.surname),
                "Phone": str(order_del_inf.phone),
                "Email": str(order_del_inf.email),
                "CounterpartyType": "PrivatePerson",
                "CounterpartyProperty": "Recipient"
            }
        }
        response = requests.post(url=settings.NP_API_URL, json=payload)

        res = response.json()
        print(res)
        status = res.get("success")
        if status is True:
            data = res.get("data")

            contact_person_dict = data[0].get("ContactPerson")
            contact_person_data = contact_person_dict.get("data")

            counterparty_res, created = CounterpartyNP.objects.get_or_create(
                ref=data[0].get('Ref'),
                description=data[0].get("Description"),
                first_name=data[0].get("FirstName"),
                last_name=data[0].get("LastName"),
                counterparty_type=data[0].get("CounterpartyType"),
                contact_person_ref=contact_person_data[0].get("Ref"),
                contact_person_description=contact_person_data[0].get("Description"),
                contact_person_first_name=data[0].get("FirstName"),
                contact_person_last_name=data[0].get("LastName")
            )
            return counterparty_res


def creation_of_an_express_invoice(order: Order):
    try:
        order_del_inf = OrderDeliveryInfo.objects.get(order=order)
        if order_del_inf.delivery == "Courier":
            link = f"https://www.WhiteCollar.ua/informations_for_order/{order_del_inf.order.id}"
            loop = asyncio.get_event_loop()
            loop.run_until_complete(send_message_to_channel(message=link))
            return
        else:
            if order.user is not None:
                counterparty_res = get_or_create_recipient_counterparty(order_del_inf=order_del_inf,
                                                                        user_id=order.user.id)
                create_express_invoice(counterparty_res=counterparty_res, order_del_inf=order_del_inf)
            elif order.session_id is not None:
                counterparty_res = get_or_create_recipient_counterparty(order_del_inf=order_del_inf,
                                                                        session_id=order.session_id)
                create_express_invoice(counterparty_res=counterparty_res, order_del_inf=order_del_inf)
            else:
                print("Neither user ID nor session ID is available for order with ID:", order.id)
    except OrderDeliveryInfo.DoesNotExist:
        logging.exception(f"OrderDeliveryInfo with order_id: {order.id} does not exist!")


def get_order_status(order_id: int):
    try:
        order = Order.objects.get(id=order_id)
        order_delivery_info = order.orderdeliveryinfo_set.first()
        express_waybill = order.expresswaybill_set.first()
        payload = {
            "apiKey": settings.NP_API_TOKEN,
            "modelName": "TrackingDocument",
            "calledMethod": "getStatusDocuments",
            "methodProperties": {
                "Documents": [
                    {
                        "DocumentNumber": express_waybill.int_doc_number,
                        "Phone": order_delivery_info.phone,
                    }
                ]
            }
        }
        response = requests.post(url=settings.NP_API_URL, json=payload)
        res = response.json()

        if res.get("success") is True:
            data = res.get("data")[0]
            order_status_code = data.get("StatusCode")
            if order_status_code == "1":
                text = "Наші працівники вже получили інформацію про ваше замолвення"
                video_path = "../../static/animation/order_tracking/Delivery Man Calling Customer.mp4"
            elif order_status_code in ["5", "4", "6", "101"]:
                text = "Ваше замовлення вже в дорозі"
                video_path = "../../static/animation/order_tracking/Delivery Service Review.mp4"
            elif order_status_code == "9":
                text = "Ви вже забрали своє замовлення і ми дуже надіємся, що вам все сподобалось. Гарного користування!"
                video_path = "../../static/animation/order_tracking/Delivery Service.mp4"
            elif order_status_code == "12":
                text = "Ваше замовлення вже готується до відправлення"
                video_path = "../../static/animation/order_tracking/Worker packing the goods.mp4"
            else:
                text = "Наші працівники вже получили інформацію про ваше замолвення"
                video_path = "../../static/animation/order_tracking/Delivery Man Calling Customer.mp4"

            return {"text": text, "video_path": video_path}
    except Order.DoesNotExist:
        logging.exception(f"Order with ID: {order_id} not found!")
