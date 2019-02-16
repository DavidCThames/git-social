from django.conf.urls import url
from django.contrib import admin
import api

urlpatterns = [
    url(r'^api/v1/lines/today/?$', api.get_lines_today, name="get_lines_today"),
]
