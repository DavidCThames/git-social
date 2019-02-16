from django.shortcuts import render
from .forms import CustomUserCreationForm

from .models import User


def register(request):
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.is_active = False
            user.save()
            current_site = get_current_site(request)
            mail_subject = 'Activate your Study Skills Account'
            message = render_to_string('users/validate_email.html', {
                'user': user,
                'domain': current_site.domain,
                'uid':urlsafe_base64_encode(force_bytes(user.pk)).decode(),
                'token':account_activation_token.make_token(user),
            })
            to_email = form.cleaned_data.get('email')
            send_mail(mail_subject, message,'hello.studyskills@gmail.edu', [to_email])
            
            return HttpResponse("waiting for verification")
        else: # needed for form ValidationErrors
            messages.error(request, 'A field is invalid, fix the errors below')
            
            return render(request, 'users/register.html', {'form' : form})
    else:
        form  = CustomUserCreationForm()
        return render(request, 'users/register.html', {'form' : form})


