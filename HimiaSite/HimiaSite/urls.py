from django.conf import settings
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static


urlpatterns = [
    path('admin/', admin.site.urls),
    path('cart/', include("Cart.urls", namespace='cart')),
    path('', include("HS.urls")),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# if settings.DEBUG:
#     from django.conf.urls.static import static
#     from django.contrib.staticfiles.urls import staticfiles_urlpatterns
#
#     urlpatterns += staticfiles_urlpatterns()
#     urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
