from django.urls import path
from . import services


urlpatterns = [
    path('get_cities/', services.get_cities, name='get_cities'),
    path('get_streets/', services.get_streets, name='get_streets'),
    path('get_departments/', services.get_departments, name='get_departments'),
    path('get_postal_machine/', services.get_postal_machine, name='get_postal_machine'),
    path('calc_cost_of_delivery/', services.calc_cost_of_delivery, name='calc_cost_of_delivery'),
]