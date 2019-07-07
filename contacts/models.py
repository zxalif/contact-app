from django.db import models


class Contact(models.Model):

    contact_id = models.IntegerField(primary_key=True)
    contact_name = models.CharField(max_length=30)

    def __str__(self):
        return self.contact_name
