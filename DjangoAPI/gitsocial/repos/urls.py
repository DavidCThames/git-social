from django.urls import path, re_path
from django.conf.urls import url

from . import views

app_name = 'repos'
urlpatterns = [
    re_path(r'^view/(?P<owner>[\w-]+)/(?P<repo>[\w-]+)/$',
            views.repo,
            name='one_repo'
    ),
    path('add/', views.add, name='add'),

    ]
