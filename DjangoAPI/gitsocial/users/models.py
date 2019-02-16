from django.db import models
import json

from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    repos = models.CharField(max_length=500)
    
    def set_repos(self, x):
        self.repos = json.dumps(x)

    def get_repos(self):
        return json.loads(self.repos)
