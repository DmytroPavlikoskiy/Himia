from django.contrib import admin
from django.utils.safestring import mark_safe

from .models import Products, Category, Brand, SubCategory, ProductImages


admin.site.register(Category)
admin.site.register(Brand)
admin.site.register(SubCategory)
admin.site.register(Products)


class ProductImagesAdmin(admin.ModelAdmin):
    list_display = ('display_image', 'product')

    def display_image(self, obj):
        if obj.img:
            return mark_safe(f'<img src="{obj.img.url}" alt="{obj.product.name}" style="max-height: 50px; max-width: 50px;">')
        return "No image"

    display_image.allow_tags = True
    display_image.short_description = 'Image'


admin.site.register(ProductImages, ProductImagesAdmin)


# class CompositionInformationProductInline(admin.TabularInline):
#     model = InformationStockCountProduct
#     extra = 1
#
#
# class ProductsAdmin(admin.ModelAdmin):
#     inlines = [CompositionInformationProductInline]
#
#
# admin.site.register(Products, ProductsAdmin)
