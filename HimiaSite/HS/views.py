from django.shortcuts import render, redirect
from django.core.paginator import Paginator
from django.core import serializers
from django.urls import reverse
from products.models import Category, Products, SubCategory, ProductImages
from django.db.models import Q
from collections import defaultdict
from users.services import get_user_or_create_session
from basket.services import get_order


def home(request):
    order = None
    search_query = request.GET.get("q", "")

    user_or_anonymous_user = get_user_or_create_session(request)
    print(user_or_anonymous_user)

    order = get_order(user_or_anonymous_user)

    if search_query:
        products = Products.objects.filter(Q(name__icontains=search_query) | Q(brand__name__icontains=search_query) | Q(category__name__icontains=search_query))
        print(products)
    else:
        products = Products.objects.all()
    category = Category.objects.all()
    sub_category = SubCategory.objects.all()
    action_products = Products.objects.filter(action=True)


    paginator = Paginator(products, 4)

    page_number = request.GET.get("page")
    page = paginator.get_page(page_number)

    context = {"category": category, "sub_category": sub_category, "products": products, "page": page, "action_products": action_products, "order": order}

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

    product = Products.objects.filter(id=id).first()
    product_images = ProductImages.objects.filter(product=product).all()
    category = Category.objects.all()
    sub_category = SubCategory.objects.all()

    user_or_anonymous_user = get_user_or_create_session(request)
    print(user_or_anonymous_user)

    order = get_order(user_or_anonymous_user)

    context = {
        "product": product,
        "product_images": product_images,
        "category": category, "sub_category": sub_category,
        "order": order
    }
    return render(request, "product_detail.html", context)


