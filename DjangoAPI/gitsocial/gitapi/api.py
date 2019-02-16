from django.http import JsonResponse
from github import Github

g = Github('ebd026d4736c985826055cc7b1d8a5db1c6f26b3')

def get_lines_today(request):
    
    json = {
        'success': 'success',
        'lines-today': 0
    }

    return JsonResponse(json, safe=False)
