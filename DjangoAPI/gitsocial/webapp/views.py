from django.shortcuts import render
import requests

# Create your views here.
def home(request):
    return render(request, 'webapp/home.html')

def user_info(request, owner, repo, username):

    api_endpoint = 'http://git-social.com/api/v1/'+ owner + '/' + repo + '/user/' + username + '/lines/week/'
    response = requests.get(api_endpoint)
    json_response = response.json()
    data_lines = json_response['lines']

    api_endpoint = 'http://git-social.com/api/v1/'+ owner + '/' + repo + '/user/' + username + '/commits/week/'
    response = requests.get(api_endpoint)
    json_response = response.json()
    data_commits = json_response['commits']

    api_endpoint = 'http://git-social.com/api/v1/'+ owner + '/' + repo + '/leaderboard/commits/week'
    response = requests.get(api_endpoint)
    json_response = response.json()
    data_leaderboard = json_response['contributors']


    return render(request, 'webapp/user_info.html', {'owner': owner, 'repo': repo, 'username': username, 'data_lines': data_lines, 'data_commits': data_commits, 'data_leaderboard': data_leaderboard})