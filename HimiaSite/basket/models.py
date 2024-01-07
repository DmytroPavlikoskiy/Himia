from django.db import models
from users.models import CustomUser
from products.models import Products


class Order(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, blank=True, null=True)
    session_id = models.CharField(max_length=255, null=True, blank=True)
    date_ordered = models.DateTimeField(auto_now_add=True)
    complete = models.BooleanField(default=False)
    transaction_id = models.CharField(max_length=100, null=True) #Unique True

    def __str__(self):
        return str(self.id)

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

    @property
    def get_total(self):
        total = 0
        old_price = 0
        if self.product and self.quantity is not None:
            if self.product.action:
                total = float(self.product.discount_price) * float(self.quantity)
                price = float(self.product.price) * float(self.quantity)
                old_price = round(price, 2)
            else:
                total = float(self.product.price) * float(self.quantity)

        return {"total": total, "old_price": old_price}

    @property
    def get_gross_weight(self):
        gross_weight = self.product.gross_weight
        return {"gross_weight": gross_weight}


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
    city = models.CharField(max_length=255, null=False)
    city_ref = models.CharField(max_length=255, null=False)
    total_price = models.CharField(max_length=255, null=False)
    total_weight = models.FloatField(null=True) #Забрати null=True
    zipcode = models.CharField(max_length=255, null=True, blank=True)
    date_added = models.DateTimeField(auto_now_add=True)
    liqpay_data = models.CharField(max_length=1000, null=True, blank=True)
    liqpay_signature = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return f"{self.name}"


class ShippingAddress(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True)
    session_id = models.CharField(max_length=255, null=True, blank=True)
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True)
    address = models.CharField(max_length=255, null=False)
    city = models.CharField(max_length=255, null=False)
    state = models.CharField(max_length=255, null=False)
    zipcode = models.CharField(max_length=255, null=False)
    date_added = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.address

