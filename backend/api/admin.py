from django.contrib import admin
from .models import *
# Register your models here.

admin.site.register(Pacient)
admin.site.register(Consultation)
admin.site.register(Doctor)
admin.site.register(Queue)
admin.site.register(Reception)
admin.site.register(Nurse)
