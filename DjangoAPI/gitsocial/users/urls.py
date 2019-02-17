from django.urls import path, re_path
from django.conf.urls import url

from . import views

app_name = 'users'
urlpatterns = [
#    url('login/',views.login, name="login"),
    re_path(r'^activate/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',
            views.activate,
            name='activate'
    ),
    url('login/',views.my_login, name="login"),
    url('register/',views.register, name="register"),

    ]
