from django.http import JsonResponse
from github import Github

g = Github('ebd026d4736c985826055cc7b1d8a5db1c6f26b3')

def contributor_to_dict(contributor):
    d = {}
    d['name'] = contributor.author.name
    d['total'] = contributor.total
    last_week = contributor.weeks[0]
    d['last_week'] = {
        
        'additions': last_week.a,
        'deletes' : last_week.d,
        'commits' : last_week.c,
        }
    return d

def get_lines_today(request,username):
    repo = g.get_repo('ArchiveTeam/ArchiveBot')
    stats = repo.get_stats_contributors()
    json = {'success' : True}
    for contributor in stats:
        if contributor.author.login == username:
            json['contributors'] = contributor_to_dict(contributor)
            break
    else:
        json['success'] = False
        json['error']  = 'username not found'
            

    return JsonResponse(json, safe=False)
