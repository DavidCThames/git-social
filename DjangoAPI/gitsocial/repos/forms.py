from django.contrib.auth.forms import UserCreationForm
from django import forms
from django.utils.translation import  gettext_lazy as _


from users.models import User
from .models import Repos

class RepoForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
         self.user = kwargs.pop('user',None)
         super(RepoForm, self).__init__(*args, **kwargs)
         
    class Meta:
        model = Repos
        fields = ('owner', 'repo_name')

    def save(self, commit=True):
        form = super(RepoForm, self)
        self.clean()
        repo = form.save(commit=False)
        self.is_valid()
        repo.user = self.user
        if commit:
            repo.save()
        return repo


