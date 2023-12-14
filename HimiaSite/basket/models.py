from django.db import models
from users.models import CustomUser
from products.models import Products


class Order(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, blank=True, null=True)
    session_id = models.CharField(max_length=255, null=True, blank=True)
    date_ordered = models.DateTimeField(auto_now_add=True)
    complete = models.BooleanField(default=False)
    transaction_id = models.CharField(max_length=100, null=True)

    def __str__(self):
        return str(self.id)

    @property
    def get_cart_total(self):
        orderitems = self.orderitem_set.all()
        total = sum([item.get_total["total"] for item in orderitems])
        return total

    # @property
    # def get_total_old_price(self):


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
    # @property
    # def get_old_price(self):
    #     old_price = 0
    #     if self.product and self.quantity is not None:
    #         if self.product.action:
    #             price = float(self.product.price) * self.quantity
    #             old_price = round(price, 2)
    #         else:
    #             pass
    #     return old_price


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

