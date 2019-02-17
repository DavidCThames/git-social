from django.contrib.sites.shortcuts import get_current_site
from django.contrib.auth import login, authenticate, logout
from django.contrib import messages
from django.http import HttpResponseRedirect, HttpResponse
from django.shortcuts import render
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_text
from .tokens import account_activation_token
from django.core.mail import send_mail
from .forms import CustomUserCreationForm
from django.urls import reverse, reverse_lazy

from .forms import LoginForm
from .models import User


def my_login(request):
    if request.method == "POST":
        username= request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            messages.success(request, 'Successfully logged in ')
            return HttpResponseRedirect(reverse('site:index'))
        else:
            messages.add_message(request, messages.ERROR, 'No account associated with these credentials')
            return HttpResponseRedirect(reverse('users:register'))
    else:
        form = LoginForm()
    return render(request, 'users/login.html', {'form' : form})



def activate(request, uidb64, token):
    try:
        uid = force_text(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except(TypeError, ValueError, OverflowError, CustomUser.DoesNotExist):
        user = None
    if user is not None and account_activation_token.check_token(user, token):
        user.is_active = True
        user.save()
        login(request, user)
        message.success(request,'Thank you for your email confirmation. Now you can login your account.')
        return  HttpResponseRedirect(reverse('users:login'))
    else:
        message.error(request,'Activation link is invalid')
        return  HttpResponseRedirect(reverse('site:index'))


def register(request):
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.is_active = False
            user.save()
            current_site = get_current_site(request)
            mail_subject = 'Activate your Git Social Account'
            message = render_to_string('users/validate_email.html', {
                'user': user,
                'domain': current_site.domain,
                'uid':urlsafe_base64_encode(force_bytes(user.pk)).decode(),
                'token':account_activation_token.make_token(user),
            })
            to_email = form.cleaned_data.get('email')
            send_mail(mail_subject, message,'hello.git-social@gmail.edu', [to_email])
            
            return HttpResponse("waiting for verification")
        else: # needed for form ValidationErrors
            messages.error(request, 'A field is invalid, fix the errors below')
#            return HttpResponse('invalid field')
            return render(request, 'users/register.html', {'form' : form})
    else:
        form  = CustomUserCreationForm()
        return render(request, 'users/register.html', {'form' : form})


def my_logout(request):
    logout(request)
    return HttpResponseRedirect(reverse('site:index'))
