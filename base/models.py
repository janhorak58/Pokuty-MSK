from django.db import models

class Player(models.Model):
    name = models.CharField(max_length=100)
    amount_paid = models.FloatField(blank=True, default=0)
    
    def __str__(self):
        return self.name
    
class Fine(models.Model):
    player = models.ForeignKey(Player, default=None, on_delete=models.CASCADE)
    reason = models.CharField(max_length=500)
    value = models.FloatField(null=True)
    paid = models.BooleanField(default=False)
    created_at = models.DateField(auto_now_add=True, blank=True, null=True)
    
    def __str__(self):
        return str(self.player.name) + " za " + str(self.reason)
    
