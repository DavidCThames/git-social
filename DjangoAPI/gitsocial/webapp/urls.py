from django.conf.urls import url

from . import views

app_name = 'webapp'
urlpatterns = [
    # url(r'^apidocs/?$',views.apidocs, name="apidocs"),
    url('home',views.home, name="index"),
    url(r'^(?P<owner>[\w-]+)/(?P<repo>[\w-]+)/user/(?P<username>[\w-]+)/?$', views.user_info, name="user_info"),
    ]
