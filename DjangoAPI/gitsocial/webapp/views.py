from django.shortcuts import render

# Create your views here.
def home(request):
    return render(request, 'webapp/home.html')

def user_info(request, owner, repo, username):
    return render(request, 'webapp/user_info.html', {'owner': owner, 'repo': repo, 'username': username})