from django.http import JsonResponse, HttpResponse
from github import Github
from PIL import Image
import base64
from io import BytesIO
from PIL import ImageFont
from PIL import ImageDraw 
g = Github('ebd026d4736c985826055cc7b1d8a5db1c6f26b3')

def get_contributors_from_list(contributors, username):
    for contributor in contributors:
        if contributor.author.login == username:
            return contributor, False
    return None, True

    

def contributor_to_dict(contributor):
    d = {}
    d['username'] = contributor.author.login
    d['name'] = contributor.author.name
    d['total'] = contributor.total
    last_week = contributor.weeks[len(contributor.weeks)-1]
    d['last_week'] = { # TODO: Might be first week...
        
        'additions': last_week.a,
        'deletes' : last_week.d,
        'commits' : last_week.c,
        }
    return d

def get_lines_week(request, owner, repo, username):
    repo = g.get_repo(owner + '/' + repo)
    stats = repo.get_stats_contributors()
    json = {'success' : True}
    contributor, fail = get_contributors_from_list(stats, username)
    if not fail:
            data = contributor_to_dict(contributor)
            json['lines'] = data['last_week']['additions'] + data['last_week']['deletes']
            json['additions'] = data['last_week']['additions']
            json['deletes'] = data['last_week']['deletes']
    else:
        json['success'] = False
        json['error']  = 'username not found'
            

    return JsonResponse(json, safe=False)

def get_commits_week(request, owner, repo, username):
    repo = g.get_repo(owner + '/' + repo)
    stats = repo.get_stats_contributors()
    json = {'success' : True}
    contributor, fail = get_contributors_from_list(stats, username)
    if not fail:
            json['commits'] = contributor_to_dict(contributor)['last_week']['commits']
    else:
        json['success'] = False
        json['error']  = 'username not found'
            

    return JsonResponse(json, safe=False)

def get_leaderboard_commits_week(request, owner, repo):
    repo = g.get_repo(owner + '/' + repo)
    stats = repo.get_stats_contributors()
    json = {'success': True, 'contributors': []}
    for i, contributor in enumerate(stats): #Convert author objects to the username
        contributor_dict = contributor_to_dict(contributor)
        contributor_json = {}
        contributor_json['username'] = contributor_dict['username']
        contributor_json['name'] = contributor_dict['name']
        contributor_json['commits'] = contributor_dict['last_week']['commits']
        json['contributors'].append(contributor_json)

    json['contributors'].sort(key=lambda x: x['commits'], reverse=True)

    return JsonResponse(json, safe=False)

def get_image(request):
    img = Image.new('RGB', (800,1280), (255, 255, 255))
    buffered = BytesIO()
    img.save(buffered, format="PNG")
    img_str = base64.b64encode(buffered.getvalue())
    return HttpResponse(img_str, content_type="text/plain")


def get_sticker_week(request, owner, repo, username):
    #Get lines
    github_repo = g.get_repo(owner + '/' + repo)
    stats = github_repo.get_stats_contributors()
    contributor, fail = get_contributors_from_list(stats, username)
    if not fail:
            data = contributor_to_dict(contributor)

            #Load the image
            img = Image.open("./gitapi/static/img/Sticker_Week.png")

            #Add text to the image
            draw = ImageDraw.Draw(img)
            font = ImageFont.truetype("./gitapi/static/font/Roboto-Regular.ttf", 24)
            font_secondary = ImageFont.truetype("./gitapi/static/font/Roboto-Regular.ttf", 12)
            draw.text((80, 85),str(data['last_week']['additions'] + data['last_week']['deletes']),(0,0,0),font=font)
            draw.text((80, 155),str(data['last_week']['commits']),(0,0,0),font=font)
            draw.text((30, 265),str(owner + '/' + repo),(95,99,104),font=font_secondary)

            #Convert to base64
            buffered = BytesIO()
            img.save(buffered, format="PNG")
            img_str = base64.b64encode(buffered.getvalue())
            return HttpResponse(img_str, content_type="text/plain")
    else:
        json['success'] = False
        json['error']  = 'username not found'
            

    return JsonResponse(json, safe=False)


    