from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes, name='routes'),
    path('notes/', views.getNotes, name='notes'),
    # here the <str:pK> is used to set the endpoint as the primaryKey of the note obj <str> can be replaced by <int> since the endpoint is numeric
    path('notes/<str:pk>/', views.getNote, name='note'),

]
