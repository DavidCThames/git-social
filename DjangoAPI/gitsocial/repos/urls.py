from django.urls import path, re_path
from django.conf.urls import url

from . import views

app_name = 'repos'
urlpatterns = [
    re_path(r'^view/(?P<owner>[0-9A-Za-z_\-]+)/(?P<repo>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',
            views.repo,
            name='one_repo'
    ),

    ]
