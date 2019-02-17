import itertools
from django.http import JsonResponse, HttpResponse
from github import Github
from PIL import Image
import base64
from io import BytesIO
from PIL import ImageFont
from PIL import ImageDraw
from users.models import User
from repos.models import Repos


g = Github('ebd026d4736c985826055cc7b1d8a5db1c6f26b3')

def get_contributors_from_list(contributors, username):
    for contributor in contributors:
        if contributor.author.login == username:
            return contributor, False
    return None, True

def repo_to_url(repo):
    return repo.owner+'/'+repo.repo_name

def get_user_repo(contributor,user):
    json = {'repos':[]}
    u = User.objects.get(username__iexact=user)
    repos = u.repos_set.all()

    json['repos'] = list(map(repo_to_url,repos))
    
    return JsonResponse(json, safe=False)

def contributor_to_dict(contributor, dt):
    d = {}
    d['username'] = contributor.author.login
    d['name'] = contributor.author.name
    d['total'] = contributor.total
    if dt == 'week':
        last_week = contributor.weeks[-2]
        d['last_week'] = { 
        'time' : last_week.w,
        'additions': last_week.a,
        'deletes' : last_week.d,
        'commits' : last_week.c,
        }
            
    if dt == 'month':
        month = [0,0,0,0]
        month[0] = contributor.weeks[-2].w
        low = max(-6, -len(contributor.weeks)-1)
        for i in range(-2,low,-1):
            cur = contributor.weeks[i]
            month[1] += cur.a
            month[2] += cur.d
            month[3] += cur.c
            d['last_week'] = { 
                'time' : month[0],
                'additions': month[1],
                'deletes' : month[2],
                'commits' : month[3]
            }

    
    return d

def get_lines(request, owner, repo, username, dt): # Documented
    repo = g.get_repo(owner + '/' + repo)
    stats = repo.get_stats_contributors()
    json = {'success' : True}
    contributor, fail = get_contributors_from_list(stats, username)
    if not fail:
            data = contributor_to_dict(contributor,dt)
            json['lines'] = data['last_week']['additions'] + data['last_week']['deletes']
            json['additions'] = data['last_week']['additions']
            json['deletes'] = data['last_week']['deletes']
    else:
        json['success'] = False
        json['error']  = 'username not found'
            

    return JsonResponse(json, safe=False)

def get_commits(request, owner, repo, username, dt): # Documented
    repo = g.get_repo(owner + '/' + repo)
    stats = repo.get_stats_contributors()
    json = {'success' : True}
    contributor, fail = get_contributors_from_list(stats, username)
    if not fail:
            json['commits'] = contributor_to_dict(contributor,dt)['last_week']['commits']
    else:
        json['success'] = False
        json['error']  = 'username not found'
            

    return JsonResponse(json, safe=False)

def get_leaderboard_commits(request, owner, repo, dt): # Documented
    repo = g.get_repo(owner + '/' + repo)
    stats = repo.get_stats_contributors()
    json = {'success': True, 'contributors': []}
    for i, contributor in enumerate(stats): #Convert author objects to the username
        contributor_dict = contributor_to_dict(contributor,dt)
        contributor_json = {}
        contributor_json['username'] = contributor_dict['username']
        contributor_json['name'] = contributor_dict['name']
        contributor_json['commits'] = contributor_dict['last_week']['commits']
        json['contributors'].append(contributor_json)

    json['contributors'].sort(key=lambda x: x['commits'], reverse=True)

    return JsonResponse(json, safe=False)


def get_sticker(request, owner, repo, username, dt): # Documented
    #Get lines
    github_repo = g.get_repo(owner + '/' + repo)
    stats = github_repo.get_stats_contributors()
    contributor, fail = get_contributors_from_list(stats, username)
    if not fail:
            data = contributor_to_dict(contributor,dt)

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
            img_str = str(base64.b64encode(buffered.getvalue()))
            json = {'image' : img_str}
            json['commits'] = data['last_week']['commits']
            json['deletes'] = data['last_week']['deletes']
            json['additions'] = data['last_week']['additions']
            json['time'] = data['last_week']['time']                                            
            json['success'] = True
           
    else:
        json['success'] = False
        json['error']  = 'username not found'
            

    return JsonResponse(json, safe=False)


def get_sticker_badge(request, id): # Documented
    #Load the image
    img = Image.open("./gitapi/static/img/Badges-" + id + ".png")
    
    #Convert to base64
    buffered = BytesIO()
    img.save(buffered, format="PNG")
    img_str = base64.b64encode(buffered.getvalue())
    return HttpResponse(img_str, content_type="text/plain")

def get_badge_list(request, owner, repo, username, dt): # Documented
    repo = g.get_repo(owner + '/' + repo)
    stats = repo.get_stats_contributors()
    json = {'success' : True}
    contributor, fail = get_contributors_from_list(stats, username)
    if not fail:
        json['badges'] = []
        data = contributor_to_dict(contributor,dt)
        commits = data['last_week']['commits']
        lines = data['last_week']['additions'] + data['last_week']['deletes']
        print(lines)

        if commits > 10:
            json['badges'].append(1)
        if commits > 50:
            json['badges'].append(2)
        if commits > 100:
            json['badges'].append(3)
        if lines > 100:
            json['badges'].append(4)
        if lines > 500:
            json['badges'].append(5)
        if lines > 1000:
            json['badges'].append(6)
    else:
        json['success'] = False

    return JsonResponse(json, safe=False)
