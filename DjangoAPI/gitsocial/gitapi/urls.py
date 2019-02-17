from django.conf.urls import url
from django.contrib import admin
from . import api

app_name = 'api'
urlpatterns = [
    url(r'^v1/userrepo/(?P<username>[\w-]+)/?$', api.get_user_repo, name="get_user_repo"),
    url(r'^v1/(?P<owner>[\w-]+)/(?P<repo>[\w-]+)/user/(?P<username>[\w-]+)/lines/(?P<dt>(week|month))/?$', api.get_lines, name="get_lines"),
    url(r'^v1/(?P<owner>[\w-]+)/(?P<repo>[\w-]+)/user/(?P<username>[\w-]+)/commits/(?P<dt>(week|month))/?$', api.get_commits, name="get_lines"),
    url(r'^v1/(?P<owner>[\w-]+)/(?P<repo>[\w-]+)/leaderboard/commits/(?P<dt>(week|month))/?$', api.get_leaderboard_commits, name="get_commits"),
    url(r'^v1/image/?$', api.get_image, name="get_image"),
    url(r'^v1/badge/(?P<id>[0-9]{2})/?$', api.get_sticker_badge, name="get_sticker_badge"),
    url(r'^v1/(?P<owner>[\w-]+)/(?P<repo>[\w-]+)/user/(?P<username>[\w-]+)/sticker/(?P<dt>(week|month))/?$', api.get_sticker, name="get_sticker"),
    url(r'^v1/(?P<owner>[\w-]+)/(?P<repo>[\w-]+)/user/(?P<username>[\w-]+)/badges/(?P<dt>(week|month))/?$', api.get_badge_list, name="get_badge_list"),
]
