from django.contrib import messages
from django.http import HttpResponseRedirect, HttpResponse
from django.shortcuts import render

# Create your views here.

def repo(request, owner, repo):
    if not request.user.is_authenticated():
            messages.error(request, 'You must be logged in to view this page.')
            return HttpResponseRedirect('site:index')
    return HttpResponse('good')
    
