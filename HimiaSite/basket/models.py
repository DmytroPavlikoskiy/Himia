from django.db import models
from users.models import CustomUser
from products.models import Products
from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
from datetime import datetime, timedelta

import random


class Order(models.Model):
    for_liqpay_order_id = models.BigIntegerField(null=False, unique=True)
    user = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, blank=True, null=True)
    session_id = models.CharField(max_length=255, null=True, blank=True)
    date_ordered = models.DateTimeField(auto_now_add=True)
    complete = models.BooleanField(default=False)
    status = models.CharField(max_length=300, null=True, blank=True)
    liqpay_order_id = models.CharField(max_length=300, null=True, blank=True)
    transaction_id = models.BigIntegerField(null=True, blank=True) #Unique True
    payment_id = models.BigIntegerField(null=True, blank=True) #Unique True

    def __str__(self):
        return f"{self.id}"

    def save(self, *args, **kwargs):
        if not self.for_liqpay_order_id:
            while True:
                unique_id = random.randint(1000000000, 9999999999)
                if not Order.objects.filter(for_liqpay_order_id=unique_id).exists():
                    self.for_liqpay_order_id = unique_id
                    break
        super(Order, self).save(*args, **kwargs)

    @property
    def get_cart_total(self):
        orderitems = self.orderitem_set.all()
        total = sum([item.get_total["total"] for item in orderitems])
        return total

    @property
    def get_cart_item(self):
        orderitems = self.orderitem_set.all()
        total = sum([item.quantity for item in orderitems])
        return total


class OrderItem(models.Model):
    product = models.ForeignKey(Products, on_delete=models.SET_NULL, null=True)
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True)
    quantity = models.PositiveIntegerField(default=0, null=True, blank=True)
    date_added = models.DateTimeField(auto_now_add=True)
    action = models.BooleanField(default=False)
    product_price = models.FloatField(null=True)
    product_no_discount_price = models.FloatField(null=True)
    discount = models.FloatField(null=True, blank=True)
    reservation_time = models.DateTimeField(auto_now_add=True, null=True)

    @property
    def get_total(self):
        total = 0
        old_price = 0
        if self.product and self.quantity is not None:
            if self.action:
                total = float(self.product_price) * float(self.quantity)
                price = float(self.product_no_discount_price) * float(self.quantity)
                old_price = round(price, 2)
            else:
                total = float(self.product_price) * float(self.quantity)

        return {"total": total, "old_price": old_price}

    @property
    def get_gross_weight(self):
        gross_weight = self.product.gross_weight
        return {"gross_weight": gross_weight}


@receiver(post_save, sender=OrderItem)
def add_order_item_product_price(sender, instance, created, **kwargs):
    if created:
        product = instance.product
        if product.action:
            instance.discount = product.discount
            instance.action = product.action
            instance.product_price = product.discount_price
            instance.product_no_discount_price = product.price
        else:
            instance.product_price = product.price
        instance.save()


class OrderDeliveryInfo(models.Model):
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=255, null=False)
    surname = models.CharField(max_length=255, null=False)
    phone = models.CharField(max_length=255, null=False)
    email = models.CharField(max_length=255, null=False)
    delivery = models.CharField(max_length=255, null=False)
    street = models.CharField(max_length=255, null=True, blank=True)
    home = models.CharField(max_length=255, null=True, blank=True)
    apartment = models.CharField(max_length=255, null=True, blank=True)
    department_full_name = models.CharField(max_length=255, null=True, blank=True)
    recipient_depart_ref = models.CharField(max_length=255, null=True, blank=True)
    recipient_index = models.CharField(max_length=50, null=True, blank=True)
    city = models.CharField(max_length=255, null=False)
    city_ref = models.CharField(max_length=255, null=False)
    delivery_price = models.FloatField(null=True)
    total_price = models.FloatField(null=True)
    total_weight = models.FloatField(null=True) #Забрати null=True
    zipcode = models.CharField(max_length=255, null=True, blank=True)
    date_added = models.DateTimeField(auto_now_add=True)
    liqpay_data = models.CharField(max_length=500, null=True, blank=True, db_index=False)
    liqpay_signature = models.CharField(max_length=500, null=True, blank=True, db_index=False)
    order_number = models.BigIntegerField(null=True, blank=True)
    status = models.CharField(max_length=255, null=True, blank=True)
    payment_method = models.CharField(max_length=50, null=True, blank=True)

    def __str__(self):
        return f"{self.name}"

    @property
    def date_added_date(self):
        return self.date_added.strftime('%d.%m.%Y')

    @property
    def get_estimated_shipping_date(self):
        shipping_date = datetime.now() + timedelta(days=2)

        estimated_delivery_date = shipping_date.strftime('%d.%m.%Y')

        return estimated_delivery_date

    def save(self, *args, **kwargs):
        if not self.order_number:
            last_order = OrderDeliveryInfo.objects.order_by('-order_number').first()
            if last_order:
                self.order_number = last_order.order_number + 1
            else:
                self.order_number = 100000000  # початкове значення
        super(OrderDeliveryInfo, self).save(*args, **kwargs)


class ExpressWaybill(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    waybill_ref = models.CharField(max_length=300, unique=True)
    cost_on_site = models.FloatField()
    estimated_delivery_date = models.CharField(max_length=30)
    int_doc_number = models.CharField(max_length=100)

    def __str__(self):
        return f"Замовлення: {self.order} \n Номер Накладної: {self.int_doc_number}"



