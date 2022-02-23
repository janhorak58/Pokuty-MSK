from xmlrpc.client import ResponseError
from django.shortcuts import render
from django.shortcuts import get_object_or_404

from django.contrib.auth.hashers import make_password

from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from .serializers import FineSerializer, PlayerSerializer, UserSerializerWithToken


from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import Player, Fine



# ----------------------- USER --------------------------

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        user = get_object_or_404(User, id=self.user.id)
        if (user):
            serializer = UserSerializerWithToken(user, many=False).data

            for k, v in serializer.items():
                data[k] = v

            return data
        return Response(False)

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['POST'])
def registerUser(request):
    data = request.data
    user = User.objects.create(
        first_name=data['name'],
        username=data['email'],
        email=data['email'],
        password=make_password(data["password"]),
    )
    
    if user.first_name == "":
        user.first_name = user.email
        user.save()
  
    serializer = UserSerializerWithToken(user, many=False)
    return Response(serializer.data)


@api_view(['GET'])
def getPlayer(request, pk):
    player = get_object_or_404(Player, id=pk)
    serializer = PlayerSerializer(player, many=False)
    return Response(serializer.data)

@api_view(['GET'])
def getPlayers(request):
    players = Player.objects.all()
    serializer = PlayerSerializer(players, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getFines(request):
    fines = Fine.objects.all()
    serializer = FineSerializer(fines, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getPlayerFines(request, pk):
    player = get_object_or_404(Player, id=pk)
    fines = Fine.objects.filter(player = player)
    serializer = FineSerializer(fines, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAdminUser])
def createPlayer(request):
    data = request.data
    player = Player.objects.create(
        name=data['name'],
    )
      
    players = Player.objects.all()
    serializer = PlayerSerializer(players, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def editplayer(request):
    data = request.data
    player = get_object_or_404(Player, id=int(data["id"]))
    
    if data["name"]:
        player.name=data["name"]
        
    player.save()
      
    players = Player.objects.all()
    serializer = PlayerSerializer(players, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAdminUser])
def deletePlayer(request):
    data = request.data
    player = get_object_or_404(Player, id=int(data["id"]))
    player.delete()      
    players = Player.objects.all()
    serializer = PlayerSerializer(players, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def createFine(request):
    data = request.data
    player = get_object_or_404(Player, id=int(data["playerId"]))
    fine = Fine.objects.create(
        player=player,
        reason=data["reason"],
        value=data["value"],

    )
      
    fines = Fine.objects.all()
    serializer = FineSerializer(fines, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAdminUser])
def editFine(request):
    data = request.data
    player = get_object_or_404(Player, id=int(data["playerId"]))
    fine = get_object_or_404(Fine, id=int(data["id"]))
    
    if player:
        fine.player=player
    if data["reason"]:
        fine.reason=data["reason"]
    if data["value"]:
        fine.value=data["value"]
    
    fine.paid=data["paid"]
        
        
    fine.save()
    fines = Fine.objects.all()
    serializer = FineSerializer(fines, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def deleteFine(request):
    data = request.data
    fine = get_object_or_404(Fine, id=int(data["id"]))
    fine.delete()      
    fines = Fine.objects.all()
    serializer = FineSerializer(fines, many=True)
    return Response(serializer.data)