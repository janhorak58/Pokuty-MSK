# Generated by Django 4.0 on 2022-02-23 23:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0002_fine_created_at'),
    ]

    operations = [
        migrations.AddField(
            model_name='fine',
            name='paid',
            field=models.BooleanField(default=False),
        ),
    ]