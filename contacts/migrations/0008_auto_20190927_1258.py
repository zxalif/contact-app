# Generated by Django 2.2.3 on 2019-09-27 12:58

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('contacts', '0007_auto_20190711_0517'),
    ]

    operations = [
        migrations.CreateModel(
            name='ContactType',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=120, unique=True)),
            ],
        ),
        migrations.AddField(
            model_name='contact',
            name='contact_type',
            field=models.ForeignKey(default='', on_delete=django.db.models.deletion.DO_NOTHING, to='contacts.ContactType', verbose_name='Contact Type'),
        ),
    ]
