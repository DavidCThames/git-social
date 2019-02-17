from django.contrib.auth.forms import UserCreationForm
from django import forms
from django.utils.translation import  gettext_lazy as _

from .models import User
from github import Github


UserModel = User
g = Github('ebd026d4736c985826055cc7b1d8a5db1c6f26b3')
class UsernameField(forms.CharField):
    def to_python(self, value):
        return unicodedata.normalize('NFKC', super().to_python(value))


class CustomUserCreationForm(UserCreationForm):
    
    class Meta(UserCreationForm):
        model = User
        fields = ('username' , 'email')
        
    def clean_username(self):        
        username = self.cleaned_data['username']
        user_model = User
        error_msg = "This username already exists. haha"
#        raise forms.ValidationError(_("hahe"))
        try: 
            print(g.get_user(username).name)
        except:
            error_msg = "No github account found."
            raise forms.ValidationError(_(error_msg))
        try:
            user_model.objects.get(username__iexact=username)
        except user_model.DoesNotExist:

            return username
        raise forms.ValidationError(_(error_msg))
    
    
    
    def save(self, commit=True):
        form = super(CustomUserCreationForm,self)
        self.clean()
        user = form.save(commit=False)
        self.is_valid()
            
        if commit:
            user.save()
        return user

    
class LoginForm(forms.Form):
    """
    Base class for authenticating users. Extend this to get a form that accepts
    username/password logins.
    """
    username = UsernameField(label=_("Username"), widget=forms.TextInput(attrs={'autofocus': True}))
    password = forms.CharField(
        label=_("Password"),
        strip=False,
        widget=forms.PasswordInput,
    )

    error_messages = {
        'invalid_login': _(
            "Please enter a correct %(username)s and password. Note that both "
            "fields may be case-sensitive."
        ),
        'inactive': _("This account is inactive."),
    }

    def __init__(self, request=None, *args, **kwargs):
        """
        The 'request' parameter is set for custom auth use by subclasses.
        The form data comes in via the standard 'data' kwarg.
        """
        self.request = request
        self.user_cache = None
        super().__init__(*args, **kwargs)

        # Set the max length and label for the "username" field.
        self.username_field = UserModel._meta.get_field(UserModel.USERNAME_FIELD)
        self.fields['username'].max_length = self.username_field.max_length or 254
        if self.fields['username'].label is None:
            self.fields['username'].label = capfirst(self.username_field.verbose_name)

    def clean(self):
        username = self.cleaned_data.get('username')
        password = self.cleaned_data.get('password')

        if username is not None and password:
            self.user_cache = authenticate(self.request, username=username, password=password)
            if self.user_cache is None:
                raise self.get_invalid_login_error()
            else:
                self.confirm_login_allowed(self.user_cache)

        return self.cleaned_data

    def confirm_login_allowed(self, user):
        """
        Controls whether the given User may log in. This is a policy setting,
        independent of end-user authentication. This default behavior is to
        allow login by active users, and reject login by inactive users.
        If the given user cannot log in, this method should raise a
        ``forms.ValidationError``.
        If the given user may log in, this method should return None.
        """
        if not user.is_active:
            raise forms.ValidationError(
                self.error_messages['inactive'],
                code='inactive',
            )

    def get_user(self):
        return self.user_cache

    def get_invalid_login_error(self):
        return forms.ValidationError(
            self.error_messages['invalid_login'],
            code='invalid_login',
            params={'username': self.username_field.verbose_name},
        )
