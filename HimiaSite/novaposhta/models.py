from django.db import models
from users.models import CustomUser


class CounterpartyNP(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    ref = models.CharField(max_length=1000, null=True, blank=True)
    description = models.CharField(max_length=255, null=True, blank=True)
    first_name = models.CharField(max_length=255, null=True, blank=True)
    middle_name = models.CharField(max_length=255, null=True, blank=True)
    last_name = models.CharField(max_length=255, null=True, blank=True)
    EDRPOU = models.CharField(max_length=1000, null=True, blank=True)
    counterparty_type = models.CharField(max_length=1000, null=True, blank=True)






