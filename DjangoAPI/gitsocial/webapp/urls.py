from django.conf.urls import url

from . import views

app_name = 'webapp'
urlpatterns = [
    # url(r'^apidocs/?$',views.apidocs, name="apidocs"),
    url('',views.home, name="index"),

    ]
