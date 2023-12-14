from django.db import models


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