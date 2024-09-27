from django.http import HttpResponse

def home(request):
    return HttpResponse("Hello. You're at the bookstore_backend homepage.")