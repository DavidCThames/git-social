from django.contrib.auth.forms import UserCreationForm
from .models import User

class CustomUserCreationForm(UserCreationForm):
    
    class Meta(UserCreationForm):
        model = User
        fields = ('username' , 'email')
        
    def clean_username(self):
        username = self.cleaned_data['username']
        user_model = CustomUser
        try:
            user_model.objects.get(username__iexact=username)
        except user_model.DoesNotExist:
            return username
        raise forms.ValidationError(_("This username already exists."))
    
    def save(self, commit=True):
        form = super(CustomUserCreationForm,self)
        user = form.save(commit=False)
        self.is_valid()
            
        if commit:
            user.save()
        return user
