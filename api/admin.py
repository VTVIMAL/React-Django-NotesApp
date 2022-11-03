from django.contrib import admin


from .models import Note
# Register your models here.

admin.site.register(Note) # if we do not register our models we cannot see the created db model in our admin panel