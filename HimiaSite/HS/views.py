from django.shortcuts import render
from django.http import JsonResponse
from django.core.paginator import Paginator
from django.core import serializers
from .models import Category, Products, SubCategory, Brand


def home(request):
    category = Category.objects.all()
    sub_category = SubCategory.objects.all()
    action_products = Products.objects.filter(action=True)
    products = Products.objects.all()
    count_products = len(products)
    paginator = Paginator(products, 4)

    page_number = request.GET.get("page")
    page = paginator.get_page(page_number)

    context = {"category": category, "sub_category": sub_category, "products": products, "count_products": count_products, "page": page, "action_products": action_products}
    return render(request, "home.html", context)


# def get_products_data(request):
#     products = Products.objects.all()
#     products_data = serializers.serialize("json", products)
#
#     return JsonResponse({"products": products_data}, safe=False)



# def products_sub_cut(request):
#     return render(request, "product_sub_cut.html")

# def get_subcut_product(request):
#     if request.method == "POST":
#         data_slug = request.POST.get("dataSlug")
#
#         products = Products.objects.filter(slug=data_slug)
#         print(products)
#         products_data = serializers.serialize("json", products)
#         return JsonResponse({"products": products_data}, safe=False)

def sub_cut_products(request, slug):
    category = Category.objects.all()
    sub_category = SubCategory.objects.all()
    products = Products.objects.filter(slug=slug)
    count_products = len(products)
    paginator = Paginator(products, 1)


    page_number = request.GET.get("page")
    page = paginator.get_page(page_number)

    context = {"category": category, "sub_category": sub_category, "products": products,
               "count_products": count_products, "page": page, "slug": slug}
    return render(request, "product_sub_cut.html", context)


def search(request):
    pass