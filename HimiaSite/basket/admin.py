from django.contrib import admin
from .models import Order, OrderItem, OrderDeliveryInfo, ExpressWaybill

admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(OrderDeliveryInfo)
admin.site.register(ExpressWaybill)



# class OrderInline(admin.TabularInline):
#     model = Order
#     extra = 0
# 
# 
# @admin.register(OrderDeliveryInfo)
# class OrderDeliveryInfoAdmin(admin.ModelAdmin):
#     list_display = ['name', 'surname', 'phone', 'email', 'delivery', 'total_price', 'date_added']
#     inlines = [OrderInline]



