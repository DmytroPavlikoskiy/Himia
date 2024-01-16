from django.db import models

from django.db.models.signals import post_save
from django.dispatch import receiver

from django.utils.safestring import mark_safe
from django.utils import timezone

from users.models import CustomUser


class Category(models.Model):
    name = models.CharField(max_length=255, db_index=True)
    slug = models.SlugField(max_length=255, null=True, blank=True)
    image = models.ImageField(upload_to="category_img/", null=True, blank=True)
    image_background = models.ImageField(upload_to="category_background_img/", null=True, blank=True)

    class Meta:
        ordering = ("name", )

    def __str__(self):
        return self.name


class Brand(models.Model):
    name = models.CharField(max_length=255, null=True, blank=True, unique=True)
    image = models.ImageField(upload_to="brand_img/", null=True, blank=True)

    class Meta:
        ordering = ("name", )

    def __str__(self):
        return self.name


class SubCategory(models.Model):
    name = models.CharField(max_length=255, null=True, blank=True)
    slug = models.SlugField(max_length=255, null=True, blank=True)
    sub_slug = models.SlugField(max_length=255, null=True, blank=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    class Meta:
        ordering = ("name", )

    def __str__(self):
        return self.name


class SubSubCategory(models.Model):
    name = models.CharField(max_length=255, null=True, blank=True)
    sub_slug = models.SlugField(max_length=255, null=True, blank=True)
    sub_category = models.ForeignKey(SubCategory, on_delete=models.CASCADE)

    class Meta:
        ordering = ("name", )

    def __str__(self):
        return self.name


class Products(models.Model):
    short_name = models.CharField(max_length=255, null=True, blank=True, verbose_name="Коротке ім'я")
    name = models.CharField(max_length=255, null=True, blank=True)
    image = models.ImageField(upload_to="product_img/", null=True, blank=True)
    size = models.CharField(max_length=255, null=True, blank=True)
    pieces_volume = models.CharField(max_length=255, null=True, blank=True, verbose_name="Об'єм/шт")
    age_category = models.CharField(max_length=255, null=True, blank=True, default="0+")
    make_county = models.CharField(max_length=255, null=True, blank=True)
    appointment = models.CharField(max_length=255, null=True, blank=True, verbose_name="Призначення")
    kind = models.CharField(max_length=255, null=True, blank=True, verbose_name="Вид")
    color = models.CharField(max_length=255, null=True, blank=True)
    clas = models.CharField(max_length=255, null=True, blank=True, verbose_name="Клас")
    sex = models.CharField(max_length=255, null=True, blank=True, verbose_name="Стать")
    description = models.TextField(null=True, blank=True)
    price = models.FloatField(null=True, blank=True, verbose_name="Ціна")
    discount = models.FloatField(null=True, blank=True)
    discount_price = models.FloatField(null=True, blank=True)
    slug = models.SlugField(max_length=255, null=True, blank=True)
    sub_slug = models.SlugField(max_length=255, null=True, blank=True)
    action = models.BooleanField(default=False)
    in_stock = models.BooleanField(default=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE, to_field='name')
    sub_category = models.ForeignKey(SubCategory, on_delete=models.CASCADE)
    sub_sub_category = models.ForeignKey(SubSubCategory, on_delete=models.CASCADE, null=True, blank=True) #Have be null False blank False

    gross_weight = models.FloatField(null=True, blank=True, verbose_name="Масса Брутто")
    height = models.FloatField(null=True, blank=True, verbose_name="Висота")
    depth = models.FloatField(null=True, blank=True, verbose_name="Глубина")
    width = models.FloatField(null=True, blank=True, verbose_name="Ширина")

    balance_in_stock = models.IntegerField(null=True, blank=True, verbose_name="Залишок на складі", default=0)
    reserved = models.IntegerField(null=True, blank=True, verbose_name="Зарезервовано", default=0)
    available = models.IntegerField(null=True, blank=True, verbose_name="В Відкритому доступі", default=0)
    new_party = models.IntegerField(null=True, blank=True, verbose_name="Нова Партія", default=0)

    class Meta:
        ordering = ("name", )

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if self.balance_in_stock is not None and self.new_party is not None:
            self.balance_in_stock += self.new_party
            self.available += self.new_party
            self.new_party = 0

        if self.action:
            discount_price = self.price - (self.price / 100 * self.discount)
            self.discount_price = round(discount_price, 2)
        else:
            self.discount_price = 0

        super(Products, self).save(*args, **kwargs)


class FeaturesProduct(models.Model):
    product = models.ForeignKey(Products, on_delete=models.CASCADE)
    features = models.CharField(max_length=255, null=True, blank=True, verbose_name="Особливість")

    def __str__(self):
        return f"{self.product.name}"


class ApplicationMethodProduct(models.Model):
    product = models.ForeignKey(Products, on_delete=models.CASCADE)
    application_method = models.CharField(max_length=255, null=True, blank=True, verbose_name="Спосіб застосування")

    def __str__(self):
        return f"{self.product.name}"


class ProductImages(models.Model):
    img = models.ImageField(upload_to="product_imgs/", null=True, blank=True)
    product = models.ForeignKey(Products, on_delete=models.CASCADE)


class CommentProduct(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, blank=True, null=True)
    product = models.ForeignKey(Products, on_delete=models.CASCADE)
    date_comment = models.DateField(auto_now_add=True)
    name = models.CharField(max_length=100, blank=True, null=True)
    comment = models.TextField(max_length=500)
    rating_product = models.FloatField(null=True, blank=True)

    def __str__(self):
        return f"Product Name: {self.product.name} Rating_product: {self.rating_product}"

    def formatted_date_comment(self):
        return self.date_comment.strftime("%d.%m.%Y")





