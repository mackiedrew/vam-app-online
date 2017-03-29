from django.http import HttpResponse

def index(request):
    return HttpResponse("<b>Hello, world</b>. You're at the VAM_CORE index.")