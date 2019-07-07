from django.urls import path
from contacts.views import IndexView


app_name = 'contacts'
urlpatterns = [
    path('', IndexView.as_view(), name='index'),
]
