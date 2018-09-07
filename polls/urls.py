from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.urls import path
from polls import views
from django.views.generic import TemplateView

urlpatterns = [
    path('api/get_messages/', views.get_messages),
    path('api/mark_read/<int:id_message>', views.mark_message),
    path('', TemplateView.as_view(template_name='index.html'))
]
