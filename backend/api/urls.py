from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('api/data', views.load_data, name='load_data'),
    path('toggle/<int:item_id>', views.toggle_content, name='toggle_content'),
]
