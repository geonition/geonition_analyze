# Create your views here.
from django.shortcuts import render_to_response

def proto(request):
    return render_to_response('index.html')