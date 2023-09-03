from django.db import models
from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):
    bonus = models.IntegerField(null=True, blank=True)
    last_date_bonus = models.DateField(null=True, blank=True)
    phone_number = models.CharField(max_length=21, unique=True, default=0)
    acceptance_and_consent = models.BooleanField(
        verbose_name="Acceptance of Conditions and Consent to Data Processing",
        default=False,
    )

    EMAIL_FIELD = 'email'

    def __str__(self):
        return self.first_name


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
    name = models.CharField(max_length=255, null=True, blank=True)
    image = models.ImageField(upload_to="product_img/", null=True, blank=True)
    size = models.CharField(max_length=255, null=True, blank=True)
    pieces_volume = models.CharField(max_length=255, null=True, blank=True, verbose_name="Об'єм/шт")
    age_category = models.CharField(max_length=255, null=True, blank=True, default="0+")
    make_county = models.CharField(max_length=255, null=True, blank=True)
    appointment = models.CharField(max_length=255, null=True, blank=True, verbose_name="Призначення")
    kind = models.CharField(max_length=255, null=True, blank=True, verbose_name="Вид")
    color = models.CharField(max_length=255, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Ціна")
    discount = models.FloatField(null=True, blank=True)
    discount_price = models.FloatField(null=True, blank=True)
    slug = models.SlugField(max_length=255, null=True, blank=True)
    action = models.BooleanField(default=False)
    in_stock = models.BooleanField(default=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE, to_field='name')
    sub_category = models.ForeignKey(SubCategory, on_delete=models.CASCADE)

    class Meta:
        ordering = ("name", )

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if self.action:
            self.discount_price = self.price - (self.price / 100 * self.discount)
        super(Products, self).save(*args, **kwargs)