from django.conf.urls import url

from . import views

app_nape = 'site'
urlpatterns = [
    url('',views.index, name="index"),

    ]
