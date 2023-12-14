from django.db import models

from django.db.models.signals import post_save
from django.dispatch import receiver


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
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

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
    action = models.BooleanField(default=False)
    in_stock = models.BooleanField(default=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE, to_field='name')
    sub_category = models.ForeignKey(SubCategory, on_delete=models.CASCADE)

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


# class InformationStockCountProduct(models.Model):
#     balance_in_stock = models.IntegerField(null=True, blank=True, verbose_name="Залишок на складі", default=0)
#     reserved = models.IntegerField(null=True, blank=True, verbose_name="Зарезервовано", default=0)
#     available = models.IntegerField(null=True, blank=True, verbose_name="В Відкритому доступі", default=0)
#     new_party = models.IntegerField(null=True, blank=True, verbose_name="Нова Партія", default=0)
#     product = models.OneToOneField(Products, on_delete=models.CASCADE, related_name='info_stock_count')
#
#     def __str__(self):
#         return f'Товар {self.product.short_name} Кількість На складі: {self.balance_in_stock}, В Резерві: {self.reserved}, У Відкритому доступі: {self.available}'



