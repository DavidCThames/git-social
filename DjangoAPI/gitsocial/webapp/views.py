
from django.shortcuts import render

from django.contrib import messages
from django.urls import reverse, reverse_lazy
from github import Github
from django.http import HttpResponseRedirect, HttpResponse
import requests
from django.conf import settings

g = Github(settings.GITTOK)
# Create your views here.
def search(request):

    if request.method=='POST':
        data = request.POST
        
        owner = data['repo-owner']
        name = data['repo-name']
        user = data['username']
        if owner == '' or name == '' or user == '':
            messages.error(request, 'A field is invalid, fix the errors below')
            return HttpResponseRedirect(reverse('webapp:search'))
    
        return HttpResponseRedirect(reverse('webapp:user_info',
                                            kwargs = {
                                                'owner' : owner,
                                                'repo' : name,
                                                'username' : user,
                                                'time' : 'month'
                                                }))
    return render(request, 'webapp/home.html')

def user_info(request, owner, repo, username, time):
    try:
        g.get_repo(owner + '/' +repo)
    except:
        messages.error(request, 'Repo not found!! Please modify your search and try again')
        return render(request, 'webapp/home.html')
    
    try:
        print(g.get_user(username).name)
    except:
        messages.error(request, 'User is not a contributor to this repo! Please modify your search and try again')
        return render(request, 'webapp/home.html')        

    api_endpoint = request.scheme+ '://'+request.get_host()+'/api/v1/userone/'+ owner + '/' + repo + '/user/' + username + '/' + time + '/'

    response = requests.get(api_endpoint)
    json_response = response.json()
    data_lines = 3
    data_lines = json_response['selected']['last_week']['additions']+json_response['selected']['last_week']['deletes']



    data_commits = json_response['selected']['last_week']['commits']


    badge_ids = json_response['badge_ids']

    data_badges = []
    for im_str in json_response['badge_imgs']:
        data_badges.append(im_str[2:-1])
    
    data_leaderboard = json_response['contributors'][:10]
    


    return render(request, 'webapp/user_info.html', {'owner': owner, 'repo': repo, 'username': username, 'time': time, 'data_lines': data_lines, 'data_commits': data_commits, 'data_badges': data_badges, 'data_leaderboard': data_leaderboard})


