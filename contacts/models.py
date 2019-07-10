from django.db import models


class Contact(models.Model):

    contact_name = models.CharField(max_length=30)
    contact_phone = models.IntegerField()
    contact_email = models.EmailField(max_length=50)
    contact_address = models.TextField(max_length=120, default='')

    def __str__(self):
        return self.contact_name
