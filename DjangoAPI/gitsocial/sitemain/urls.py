from django.conf.urls import url

from . import views

app_name = 'site'
urlpatterns = [
    url('',views.index, name="index"),
    url('',views.index, name="register"),

    ]
