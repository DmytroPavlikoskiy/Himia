from django.conf import settings
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static


urlpatterns = [
    path('admin/', admin.site.urls),
    path('np/', include('novaposhta.urls')),
    path('basket/', include('basket.urls')),
    path('products/', include('products.urls')),
    path('users/', include('users.urls')),
    path('liqpay/', include('Liqpay.urls')),
    path('', include("HS.urls")),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
