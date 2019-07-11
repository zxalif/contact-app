from django.db import models


class Contact(models.Model):
    """Model Class for storing contact information"""

    contact_name = models.CharField(max_length=30)
    contact_phone = models.IntegerField()
    contact_email = models.EmailField(max_length=50)
    contact_address = models.TextField(max_length=120)

    def __str__(self):
        return self.contact_name
