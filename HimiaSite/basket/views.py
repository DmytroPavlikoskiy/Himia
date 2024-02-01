from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import render, redirect
from django.conf import settings
from django.http import JsonResponse
from users.services import get_user_or_create_session
from .services import get_order, create_order
from products.models import Products
from .services import check_int_or_sting
from .models import *

import json
from .models import *
from django.db.models import Q


def basket_detail(request):
    items = []
    order = None

    user_or_anonymous_user = get_user_or_create_session(request)

    if user_or_anonymous_user:
        order = get_order(user_or_anonymous_user)
        if order:
            items = order.orderitem_set.all()

    context = {
        'items': items,
        'order': order,
        'user_or_anonymous_user': user_or_anonymous_user,
    }
    return render(request, "basket.html", context)


def get_total_order_weight(items):
    gross_weight_list = []
    for item in items:
        quantity = item.quantity
        gross_weight = item.get_gross_weight.get("gross_weight")
        result = float(gross_weight) * int(quantity)
        gross_weight_list.append(result)
    total_order_weight = 0
    for el in gross_weight_list:
        total_order_weight += el
    return total_order_weight


def add_reserved_product(request):
    data_bites = request.body
    data_json = json.loads(data_bites)
    order_id = data_json.get("order_id")

    order = Order.objects.get(id=order_id)

    order_items = OrderItem.objects.filter(order=order).all()
    for order_item in order_items:
        order_item.product.available -= int(order_item.quantity)
        order_item.product.reserved += int(order_item.quantity)
        order_item.product.save()
    return JsonResponse({"success": "success"})


def remove_reserved_products(request):
    data = request.body
    data_json = json.loads(data)
    order_id = data_json.get("order_id")

    # int_order_id = check_int_or_sting(order_id)

    order = Order.objects.get(id=order_id)

    order_items = OrderItem.objects.filter(order=order).all()
    for order_item in order_items:
        order_item.product.available += int(order_item.quantity)
        order_item.product.reserved -= int(order_item.quantity)
        order_item.product.save()
    return JsonResponse({"success": "success"})


def checkout(request):
    user_or_anonymous_user = get_user_or_create_session(request)
    order = get_order(user_or_anonymous_user)
    if order:
        items = order.orderitem_set.all()
        if items:
            context = {
                "order": order,
                "items": items,
                "user": user_or_anonymous_user,
                "total_order_weight": get_total_order_weight(items)
            }
            return render(request, 'checkout.html', context)
        else:
            return redirect("basket_detail")
    else:
        return redirect("home")


def basket_add_home_page(request):
    data = json.loads(request.body)
    productId = data.get('productId')

    user_or_anonymous_user = get_user_or_create_session(request)
    order = create_order(user_or_anonymous_user)

    product = Products.objects.get(id=productId)

    available = product.available

    if available == 0 or available == "0":
        # orderItem, created = OrderItem.objects.get_or_create(order=order, product=product)
        # productItem = orderItem.order.get_cart_item
        text = 'На даний момент Цей товар Недоступний!'
        return JsonResponse({'status': "success", 'message': text})
    else:
        orderItem, created = OrderItem.objects.get_or_create(order=order, product=product)
        orderItem.quantity += 1
        orderItem.save()
        # product.available -= 1
        # product.reserved += 1
        # product.save()

        productItem = orderItem.order.get_cart_item

        return JsonResponse({'status': "success", 'message': 'Товар додано в Корзину', 'productItem': productItem})


def basket_add_product(request):
    data = json.loads(request.body)
    productId = data.get('productId')
    input_value = data.get('inputValue')

    user_or_anonymous_user = get_user_or_create_session(request)
    order = get_order(user_or_anonymous_user)

    product = Products.objects.get(id=productId)
    order_item, created = OrderItem.objects.get_or_create(order=order, product=product)
    order_item.quantity = input_value
    # product.available -= 1
    # product.reserved += 1
    # product.save()
    order_item.save()
    get_total = order_item.get_total
    total = float(get_total.get('total'))
    old_price = float(get_total.get('old_price'))
    available = product.available
    productItem = order_item.order.get_cart_item
    productTotal = order_item.order.get_cart_total
    return JsonResponse({'status': "success", 'message': 'Товар додано в Корзину',
                         'productItem': productItem, 'productTotal': productTotal,
                         'total': total, 'old_price': old_price, 'productId': productId, "available": available})


def basket_input_value_product(request):
    data = json.loads(request.body)
    input_value = data.get("inputValue")
    product_id = data.get("ProductId")

    user_or_anonymous_user = get_user_or_create_session(request)
    order = get_order(user_or_anonymous_user)

    product = Products.objects.get(id=product_id)

    order_item, created = OrderItem.objects.get_or_create(order=order, product=product)
    order_item.quantity = input_value
    order_item.save()

    get_total = order_item.get_total
    total = float(get_total.get('total'))
    old_price = float(get_total.get('old_price'))
    available = product.available
    productItem = order_item.order.get_cart_item
    productTotal = order_item.order.get_cart_total
    quantity = order_item.quantity

    return JsonResponse({'status': "success", 'message': 'Товар додано в Корзину',
                         'productItem': productItem, 'productTotal': productTotal,
                         'total': total, 'old_price': old_price, 'productId': product_id, "available": available, "quantity": quantity})


def remove_product(request):
    data = json.loads(request.body)
    productId = data.get('productId')
    # valueInput = data.get('valueInput')

    user_or_anonymous_user = get_user_or_create_session(request)
    order = get_order(user_or_anonymous_user)

    product = Products.objects.get(id=productId)
    # product.available += int(valueInput)
    # product.reserved -= int(valueInput)
    # product.save()
    orderItem, created = OrderItem.objects.get_or_create(order=order, product=product)
    orderItem.delete()
    return JsonResponse({'status': "success", 'message': 'Товар видалено з Корзини'})


def basket_remove_product(request):
    data = json.loads(request.body)
    productId = data.get('productId')
    inputValue = data.get('inputValue')

    user_or_anonymous_user = get_user_or_create_session(request)
    order = get_order(user_or_anonymous_user)

    product = Products.objects.get(id=productId)

    orderItem, created = OrderItem.objects.get_or_create(order=order, product=product)

    if int(inputValue) >= 1:
        orderItem.quantity = inputValue
        # product.available += 1
        # product.reserved -= 1
        # product.save()
        orderItem.save()
        available = product.available
        productItem = orderItem.order.get_cart_item
        productTotal = orderItem.order.get_cart_total
        quantity = orderItem.quantity
        get_total = orderItem.get_total
        total = float(get_total.get('total'))
        old_price = float(get_total.get('old_price'))
        return JsonResponse({"available": available, 'productItem': productItem, 'productTotal': productTotal, 'quantity': quantity, 'total': total,
                             'old_price': old_price, 'productId': productId}, safe=False)
    if int(inputValue) == 0 or int(inputValue) < 0:
        orderItem.delete()
        quantity = orderItem.quantity
        productItem = orderItem.order.get_cart_item
        productTotal = orderItem.order.get_cart_total
        available = product.available
        get_total = orderItem.get_total
        total = float(get_total.get('total'))
        old_price = float(get_total.get('old_price'))
        return JsonResponse({'status': "success", 'message': 'Товар видалено з Корзини', 'available': available,
                             'productItem': productItem, 'productTotal': productTotal, 'quantity': quantity,'total': total, 'old_price': old_price,}, safe=False)


def delete_basket(request):
    data = json.loads(request.body)
    session_or_user_id = data.get('session_or_user_id')
    order_id = data.get("order_id")

    inp_or_str_session_or_user_id = check_int_or_sting(session_or_user_id)
    print(type(inp_or_str_session_or_user_id))

    if order_id == "None" and session_or_user_id == "":
        print("IM HERE1")
        return JsonResponse({'status': "error", 'message': 'Корзина вже порожня, верніться до магазину'}, safe=False)
    else:
        try:
            print("IM HERE2")
            order = Order.objects.filter(id=int(order_id)).first()
            print(order)
            if isinstance(inp_or_str_session_or_user_id, int):
                print("user is authenticated")
                order_items = OrderItem.objects.filter(
                    Q(order__user=inp_or_str_session_or_user_id) & Q(order=order)
                ).all()
            else:
                print("user is anonymouse")
                order_items = OrderItem.objects.filter(
                    Q(order__session_id=inp_or_str_session_or_user_id) & Q(order=order)
                ).all()

            # order_item = order_items.first()
            # order = order_item.order
            for order_item in order_items:
                order_item.delete()
            # order.delete()
            return JsonResponse({'status': "success", 'message': 'Корзину очищено'}, safe=False)
        except ObjectDoesNotExist:
            print(ObjectDoesNotExist)
            return JsonResponse({'status': "error", 'message': 'Корзина не знайдена'}, safe=False)
