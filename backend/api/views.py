from django.shortcuts import render
from django.http import JsonResponse
from django.http import HttpResponse


def load_data(request):
    data = {'message': 'This is the loaded data from the server.'}
    return JsonResponse(data)

def toggle_content(request, item_id):
    content = f'Content for item {item_id} has been toggled.'
    return JsonResponse({'content': content})

def index(request):
    return render(request, 'api/index.html')


# def toggle_content(request, item_id):
#     if request.GET.get('closed') == 'true':
#         return HttpResponse('<div class="accordion-content" id="content-{}"></div>'.format(item_id))
#     content = f'Content for item {item_id} has been toggled.'
#     return HttpResponse(f'<div class="accordion-content" id="content-{item_id}">{content}</div>')