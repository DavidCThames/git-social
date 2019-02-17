from django.urls import reverse, reverse_lazy
from django.contrib import messages
from django.http import HttpResponseRedirect, HttpResponse
from django.shortcuts import render
from .forms import RepoForm

# Create your views here.

def repo(request, owner, repo):
    if not request.user.is_authenticated:
            messages.error(request, 'You must be logged in to view this page.')
            return HttpResponseRedirect(reverse('site:index'))
    return HttpResponse('good')


def add(request):
    if not request.user.is_authenticated:
        messages.error(request, 'You must be logged in to view this page.')
        return HttpResponseRedirect(reverse('site:index'))
    if request.method == "POST":
        form = RepoForm(request.POST,user=request.user)
        
        if form.is_valid():
            form.clean()
            repo = form.save(commit=False)
            repo.save()
        
            messages.success(request, 'Repo added!')
            return HttpResponseRedirect(reverse('repos:add'))

        else: # needed for form ValidationErrors
            messages.error(request, 'A field is invalid, fix the errors below')
            return HttpResponse('invalid field')
            return render(request, 'repos/add.html', {'form' : form})
    else:
        form  = RepoForm(user=request.user)
        return render(request, 'repos/add.html', {'form' : form})

