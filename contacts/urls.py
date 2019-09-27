from django.urls import path
from contacts.views import (
    IndexView,
    ContactListView,
    ContactDetailsView,
    ContactTypeListView,
    ContactTypeDetailsView,
)


app_name = 'contacts'
urlpatterns = [
    path('', IndexView.as_view(), name='index'),
    path('api/v1/contacts/', ContactListView.as_view()),
    path('api/v1/contacts/<int:pk>/', ContactDetailsView.as_view()),
    path('api/v1/contacts-type/', ContactListView.as_view()),
    path('api/v1/contacts-type/<int:pk>/', ContactDetailsView.as_view()),
]
