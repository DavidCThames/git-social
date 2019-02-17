from django.shortcuts import render

from django.http import HttpResponse
from django.shortcuts import render


def index(request):
    return render(request, 'sitemain/index.html')

def apidocs(request):
    return render(request, 'sitemain/api_documentation.html')
