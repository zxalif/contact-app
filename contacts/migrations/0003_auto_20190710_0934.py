# Generated by Django 2.2.3 on 2019-07-10 09:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('contacts', '0002_auto_20190710_0930'),
    ]

    operations = [
        migrations.AlterField(
            model_name='contact',
            name='contact_phone',
            field=models.CharField(max_length=10),
        ),
    ]
