

from dataclasses import field
from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from django.utils import timezone
from django.contrib.auth.models import User
from .models import Player, Fine

class UserSerializerWithToken(serializers.ModelSerializer):
    is_admin = serializers.SerializerMethodField(read_only=True)
    name = serializers.SerializerMethodField(read_only=True)
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ["id", "username", "email", "name",
                  "is_admin",
                  "token"]

    def get_is_admin(self, obj):
        return obj.is_staff


    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)
    
    def get_name(self, obj):
        return obj.first_name


class PlayerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Player
        fields ='__all__'
        
class FineSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Fine
        fields ='__all__'


