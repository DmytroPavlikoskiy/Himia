from django.contrib import admin
from .models import Category, SubCategory, Products, Brand, CustomUser

admin.site.register(Category)
admin.site.register(SubCategory)
admin.site.register(Products)
admin.site.register(Brand)
admin.site.register(CustomUser)
