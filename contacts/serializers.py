from rest_framework import serializers
from contacts.models import Contact, ContactType


class ContactTypeSerializer(serializers.ModelSerializer):
    """Serailizer for Contact Model"""

    class Meta:
        model = ContactType
        fields = '__all__'


class ContactSerializer(serializers.ModelSerializer):
    """Serailizer for Contact Model"""

    contact_type = ContactTypeSerializer()

    class Meta:
        model = Contact
        fields = '__all__'
