# Generated by Django 3.1.1 on 2023-08-16 13:42

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Brand',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=255, null=True, unique=True)),
                ('image', models.ImageField(blank=True, null=True, upload_to='brand_img/')),
            ],
            options={
                'ordering': ('name',),
            },
        ),
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(db_index=True, max_length=255)),
                ('slug', models.SlugField(blank=True, max_length=255, null=True)),
                ('image', models.ImageField(blank=True, null=True, upload_to='category_img/')),
            ],
            options={
                'ordering': ('name',),
            },
        ),
        migrations.CreateModel(
            name='SubCategory',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=255, null=True)),
                ('slug', models.SlugField(blank=True, max_length=255, null=True)),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='HS.category')),
            ],
            options={
                'ordering': ('name',),
            },
        ),
        migrations.CreateModel(
            name='Products',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=255, null=True)),
                ('image', models.ImageField(blank=True, null=True, upload_to='product_img/')),
                ('size', models.CharField(blank=True, max_length=255, null=True)),
                ('pieces_volume', models.CharField(blank=True, max_length=255, null=True, verbose_name="Об'єм/шт")),
                ('age_category', models.CharField(blank=True, default='0+', max_length=255, null=True)),
                ('make_county', models.CharField(blank=True, max_length=255, null=True)),
                ('appointment', models.CharField(blank=True, max_length=255, null=True, verbose_name='Призначення')),
                ('kind', models.CharField(blank=True, max_length=255, null=True, verbose_name='Вид')),
                ('color', models.CharField(blank=True, max_length=255, null=True)),
                ('description', models.TextField(blank=True, null=True)),
                ('price', models.FloatField()),
                ('discount', models.FloatField(blank=True, null=True)),
                ('slug', models.SlugField(blank=True, max_length=255, null=True)),
                ('action', models.BooleanField(default=False)),
                ('in_stock', models.BooleanField(default=True)),
                ('brand', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='HS.brand', to_field='name')),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='HS.category')),
                ('sub_category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='HS.subcategory')),
            ],
            options={
                'ordering': ('name',),
            },
        ),
    ]
