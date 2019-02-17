from django.shortcuts import render
from django.urls import reverse, reverse_lazy
from django.http import HttpResponseRedirect, HttpResponse
import requests

# Create your views here.
def search(request):

    if request.method=='POST':
        data = request.POST
        owner = data['repo-owner']
        name = data['repo-name']
        user = data['username']
        return HttpResponseRedirect(reverse('webapp:user_info',
                                            kwargs = {
                                                'owner' : owner,
                                                'repo' : name,
                                                'username' : user,
                                                'time' : 'month'
                                                }))
    return render(request, 'webapp/home.html')

def user_info(request, owner, repo, username, time):

    api_endpoint = 'http://git-social.com/api/v1/'+ owner + '/' + repo + '/user/' + username + '/lines/' + time + '/'
    response = requests.get(api_endpoint)
    json_response = response.json()
    data_lines = json_response['lines']

    api_endpoint = 'http://git-social.com/api/v1/'+ owner + '/' + repo + '/user/' + username + '/commits/' + time + '/'
    response = requests.get(api_endpoint)
    json_response = response.json()
    data_commits = json_response['commits']

    api_endpoint = 'http://git-social.com/api/v1/'+ owner + '/' + repo + '/user/' + username + '/badges/' + time + '/'
    response = requests.get(api_endpoint)
    json_response = response.json()
    badge_ids = json_response['badges']

    data_badges = []
    for badge_id in badge_ids:
        api_endpoint = 'http://git-social.com/api/v1/badge/0' + str(badge_id)
        response = requests.get(api_endpoint)
        data_badges.append(response.text)
    
    api_endpoint = 'http://git-social.com/api/v1/'+ owner + '/' + repo + '/leaderboard/commits/' + time + '/'
    response = requests.get(api_endpoint)
    json_response = response.json()
    data_leaderboard = json_response['contributors'][:10]
    


    return render(request, 'webapp/user_info.html', {'owner': owner, 'repo': repo, 'username': username, 'data_lines': data_lines, 'data_commits': data_commits, 'data_badges': data_badges, 'data_leaderboard': data_leaderboard})
