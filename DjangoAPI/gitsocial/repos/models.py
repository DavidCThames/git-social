from django.db import models
from users.models import User


class Repos(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    owner = models.CharField(max_length=200)
    repo_name = models.CharField(max_length=200)

