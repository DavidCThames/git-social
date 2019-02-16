from django.http import JsonResponse

def get_lines_today(request):

    json = {
        'success': 'success',
        'lines-today': 0
    }

    return JsonResponse(json, safe=False)