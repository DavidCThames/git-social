from django.db import models
from django.contrib.postgres.fields import JSONField

from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    repos = models.JSONField()
