from django.contrib import admin
from .models import Products, Category, Brand, SubCategory


admin.site.register(Category)
admin.site.register(Brand)
admin.site.register(SubCategory)
admin.site.register(Products)


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
