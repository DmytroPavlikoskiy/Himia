from django.shortcuts import render, redirect
from django.core.paginator import Paginator
from django.core import serializers
from django.urls import reverse
from products.models import Category, Products, SubCategory, SubSubCategory, ProductImages, FeaturesProduct, ApplicationMethodProduct, CommentProduct
from basket.models import Order, OrderDeliveryInfo
from products.services import get_arithmetic_mean_rating_star
from django.db.models import Q
from collections import defaultdict
from users.services import get_user_or_create_session
from basket.services import get_order

from .services import number_to_words

from django.http import JsonResponse


def home(request):
    order = None
    search_query = request.GET.get("q", "")

    user_or_anonymous_user = get_user_or_create_session(request)

    order = get_order(user_or_anonymous_user)

    if search_query:
        products = Products.objects.filter(Q(name__icontains=search_query) | Q(brand__name__icontains=search_query) | Q(category__name__icontains=search_query))
        print(products)
    else:
        products = Products.objects.all()
    category = Category.objects.all()
    sub_category = SubCategory.objects.all()
    sub_sub_category = SubSubCategory.objects.all()
    action_products = Products.objects.filter(action=True)


    paginator = Paginator(products, 4)

    page_number = request.GET.get("page")
    page = paginator.get_page(page_number)

    context = {"category": category, "sub_category": sub_category, "sub_sub_category": sub_sub_category, "products": products, "page": page, "action_products": action_products, "order": order}

    return render(request, "home.html", context)


def sub_cut_products(request, slug):
    products = Products.objects.filter(slug=slug)
    category = Category.objects.all()
    sub_category = SubCategory.objects.all()

    user_or_anonymous_user = get_user_or_create_session(request)
    order = get_order(user_or_anonymous_user)

    # products = Products.objects.filter(slug=slug)
    paginator = Paginator(products, 1)

    page_number = request.GET.get("page")
    page = paginator.get_page(page_number)

    context = {"category": category, "sub_category": sub_category, "products": products,
               "page": page, "slug": slug, "order": order}
    return render(request, "product_sub_cut.html", context)


def product_detail(request, id):
    order = None
    user_id = None

    product = Products.objects.filter(id=id).first()
    product_images = ProductImages.objects.filter(product=product).all()
    category = Category.objects.all()
    sub_category = SubCategory.objects.all()
    sub_sub_category = SubSubCategory.objects.all()

    user_or_anonymous_user = get_user_or_create_session(request)

    order = get_order(user_or_anonymous_user)

    features = FeaturesProduct.objects.filter(product=product).all()
    application_methods = ApplicationMethodProduct.objects.filter(product=product).all()
    comments_product = CommentProduct.objects.filter(product=product).all()
    length_comments = len(comments_product)

    final_rating = get_arithmetic_mean_rating_star(comments_product)

    context = {
        "product": product,
        "product_images": product_images,
        "category": category, "sub_category": sub_category, "sub_sub_category": sub_sub_category,
        "order": order,
        "features": features,
        "application_methods": application_methods,
        "final_rating": final_rating,
        "comments_product": comments_product,
        "length_comments": length_comments,
    }
    return render(request, "product_detail.html", context)


def create_sales_invoices(request, order_id):
    order = Order.objects.get(id=order_id)
    order_del_inf = OrderDeliveryInfo.objects.get(order=order)
    order_items = order.orderitem_set.all()

    number_list = []
    n = 0
    for order_item in order_items:
        n = n + 1
        number_list.append(int(n))
    print(number_list)

    text_order_suma = number_to_words(order.get_cart_total)

    context = {
        "order": order,
        "order_del_inf": order_del_inf,
        "order_items": order_items,
        "text_order_suma": text_order_suma
    }

    return render(request, "tables/sales_invoice.html", context=context)



