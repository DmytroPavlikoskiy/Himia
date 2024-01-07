from django.contrib import admin
from .models import Order, OrderItem, ShippingAddress, OrderDeliveryInfo

admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(ShippingAddress)
admin.site.register(OrderDeliveryInfo)



# class OrderInline(admin.TabularInline):
#     model = Order
#     extra = 0
# 
# 
# @admin.register(OrderDeliveryInfo)
# class OrderDeliveryInfoAdmin(admin.ModelAdmin):
#     list_display = ['name', 'surname', 'phone', 'email', 'delivery', 'total_price', 'date_added']
#     inlines = [OrderInline]



