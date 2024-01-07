from django.db import models
from users.models import CustomUser


class City(models.Model):
    name = models.CharField(max_length=1000)
    short_name = models.CharField(max_length=1000)
    city_ref = models.CharField(max_length=1000)

    class Meta:
        ordering = ("name", )

    def __str__(self):
        return self.name


class Streets(models.Model):
    name = models.CharField(max_length=1000)
    city = models.ForeignKey("City", on_delete=models.CASCADE)


class CounterpartyNP(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    ref = models.CharField(max_length=1000, null=True, blank=True)
    description = models.CharField(max_length=255, null=True, blank=True)
    first_name = models.CharField(max_length=255, null=True, blank=True)
    middle_name = models.CharField(max_length=255, null=True, blank=True)
    last_name = models.CharField(max_length=255, null=True, blank=True)
    EDRPOU = models.CharField(max_length=1000, null=True, blank=True)
    counterparty_type = models.CharField(max_length=1000, null=True, blank=True)




