from django.views.generic.base import TemplateView
from rest_framework.generics import (ListCreateAPIView,
                                     RetrieveUpdateDestroyAPIView)
from contacts.models import Contact, ContactType
from contacts.serializers import ContactSerializer, ContactTypeSerializer


class IndexView(TemplateView):
    template_name = 'contacts/base.html'


class ContactListView(ListCreateAPIView):
    """Class for Create and Retrieve Contact data"""

    queryset = Contact.objects.all()
    serializer_class = ContactSerializer


class ContactDetailsView(RetrieveUpdateDestroyAPIView):
    """Class for Update, Retrieve and Delete Contact data"""

    queryset = Contact.objects.all()
    serializer_class = ContactSerializer


class ContactTypeListView(ListCreateAPIView):
    """Class for Create and Retrieve Contact data"""

    queryset = ContactType.objects.all()
    serializer_class = ContactTypeSerializer


class ContactTypeDetailsView(RetrieveUpdateDestroyAPIView):
    """Class for Update, Retrieve and Delete Contact data"""

    queryset = ContactType.objects.all()
    serializer_class = ContactTypeSerializer