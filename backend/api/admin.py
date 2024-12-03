from django.contrib import admin
from .models import Pacient, Consultation, Doctor, Queue, Reception, Nurse


# Registrar os modelos no Django Admin
admin.site.register(Pacient)

admin.site.register(Doctor)

@admin.register(Queue)
class QueueAdmin(admin.ModelAdmin):
    list_display = ('id', 'pacient', 'doctor', 'nurse', 'status', 'senha', 'comorbidities', 'date_created')
    readonly_fields = ('senha',)

admin.site.register(Nurse)

admin.site.register(Consultation)

@admin.register(Reception)
class ReceptionAdmin(admin.ModelAdmin):
    list_display = ['id', 'nurse']

