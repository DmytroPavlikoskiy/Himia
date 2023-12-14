from django.db import models
from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):
    bonus = models.IntegerField(null=True, blank=True)
    last_date_bonus = models.DateField(null=True, blank=True)
    phone_number = models.CharField(max_length=21, unique=True, default=0)
    acceptance_and_consent = models.BooleanField(
        verbose_name="Acceptance of Conditions and Consent to Data Processing",
        default=False,
    )

    EMAIL_FIELD = 'email'

    def __str__(self):
        return self.first_name
