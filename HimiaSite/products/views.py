from django.shortcuts import render
from django.http import JsonResponse
from .models import CommentProduct, Products
from users.models import CustomUser

from .services import get_arithmetic_mean_rating_star
import json


def save_comment_rating_for_product(request):
    if request.method == "POST":
        user = None

        data = json.loads(request.body)
        user_id = data.get("user_id")
        if user_id is not None:
            user = CustomUser.objects.get(id=user_id)
        try:
            product = Products.objects.get(id=data.get("product_id"))
        except Exception as ex:
            print(ex)
            return JsonResponse({"error": f"Product with id {request.POST.get('product_id')} not found"})
        comment_rating_product = CommentProduct.objects.create(
            user=user,
            product=product,
            name=data.get("input_name_value"),
            comment=data.get("input_comments_value"),
            rating_product=float(data.get("rating_product")),
        )
        comment_rating_product.save()
        comment_product = CommentProduct.objects.filter(product=product).all()
        count_reviews = len(comment_product)
        final_rating = get_arithmetic_mean_rating_star(comment_product)
        return JsonResponse({"success": "Successfully", "final_rating": final_rating, "count_reviews": count_reviews})
    else:
        return JsonResponse({"error": "Invalid query method!"})