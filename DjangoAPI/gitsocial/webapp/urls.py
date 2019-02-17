from django.conf.urls import url
from django.urls import path
from . import views

app_name = 'webapp'
urlpatterns = [
    # url(r'^apidocs/?$',views.apidocs, name="apidocs"),
    path('search/',views.search, name="search"),
    url(r'^(?P<owner>[\w-]+)/(?P<repo>[\w-]+)/user/(?P<username>[\w-]+)/(?P<time>[\w-]+)/?$', views.user_info, name="user_info"),
]
