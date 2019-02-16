from django.conf.urls import url
from django.contrib import admin
from . import api

urlpatterns = [
    url(r'^api/v1/(?P<owner>\w+)/(?P<repo>\w+)/(?P<username>\w+)/lines/today/?$', api.get_lines_today, name="get_lines_today"),
    url(r'^api/v1/(?P<owner>\w+)/(?P<repo>\w+)/(?P<username>\w+)/commits/today/?$', api.get_commits_today, name="get_lines_today"),
]
