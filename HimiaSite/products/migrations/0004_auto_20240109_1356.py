# Generated by Django 3.1.1 on 2024-01-09 11:56

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0003_auto_20240109_1334'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='products',
            name='features',
        ),
        migrations.CreateModel(
            name='FeaturesProduct',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('features', models.CharField(blank=True, max_length=255, null=True, verbose_name='Особливість')),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='products.products')),
            ],
        ),
    ]
