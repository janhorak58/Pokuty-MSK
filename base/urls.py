from django.urls import path
from . import views

# Toto je ve skutečnosti /api/

urlpatterns = [
    path('users/login/', views.MyTokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    
    
    path('player/<int:pk>/', views.getPlayer, name="getPlayer"),
    path('player/all/', views.getPlayers, name="getPlayers"),
    path('player/fines/<int:pk>/', views.getPlayerFines, name="getPlayerFines"),
    path('player/create/', views.createPlayer, name="createPlayer"),
    path('player/edit/', views.editplayer, name="editplayer"),
    path('player/delete/', views.deletePlayer, name="deletePlayer"),
    
    path('fine/all/', views.getFines, name="getFines"),
    path('fine/create/', views.createFine, name="createFine"),
    path('fine/edit/', views.editFine, name="editFine"),
    path('fine/delete/', views.deleteFine, name="deleteFine"),

]





