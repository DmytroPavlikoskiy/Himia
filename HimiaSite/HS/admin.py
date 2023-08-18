from django.contrib import admin
from .models import Category, SubCategory, Products, Brand

admin.site.register(Category)
admin.site.register(SubCategory)
admin.site.register(Products)
admin.site.register(Brand)
