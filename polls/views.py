from django.core import serializers
from polls.models import MessageFromSpace
from django.http import HttpResponse


# Create your views here.

def get_messages(request):
    messages = MessageFromSpace.objects.filter(read=False)
    data = serializers.serialize('json', messages, fields=('date', 'text'), )
    return HttpResponse(data)


def mark_message(request, id_message):
    message = MessageFromSpace.objects.get(pk=id_message)
    message.read = True
    message.save()
    return HttpResponse('marked')
