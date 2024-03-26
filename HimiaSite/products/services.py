from .models import CommentProduct

def get_arithmetic_mean_rating_star(queryset):
    rating_sum = 0
    total_ratings = 0

    for el in queryset:
        rating_sum += el.rating_product
        total_ratings += 1

    final_rating = rating_sum / total_ratings if total_ratings > 0 else 0
    final_rating = round(final_rating)
    return final_rating


