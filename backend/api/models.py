from django.db import models
from django.utils import timezone
from django.core.exceptions import ValidationError


class Base(models.Model):
    """Modelo base com campos comuns para outros modelos."""
    created_at = models.DateTimeField("Criado em", auto_now_add=True)
    updated_at = models.DateTimeField("Atualizado em", auto_now=True)
    disponivel = models.BooleanField("Disponível", default=True)

    class Meta:
        abstract = True


class Pacient(models.Model):
    """Modelo representando os pacientes."""
    name = models.CharField("Nome", max_length=255)
    cpf = models.CharField("CPF", max_length=14, unique=True)
    birth_date = models.DateField("Data de Nascimento")
    email = models.EmailField("E-mail", null=True, blank=True)
    photo = models.FileField(upload_to="images/", null=True, blank=True)
    phone_number = models.CharField("Número para Contato", max_length=20, null=True, blank=True)
    observations = models.TextField("Observações", null=True, blank=True)

    def __str__(self):
        return self.name


class Doctor(Base):
    """Modelo representando os médicos."""
    name = models.CharField("Nome", max_length=255)
    crm = models.CharField("CRM", max_length=20, unique=True)
    specialty = models.CharField("Especialidade", max_length=255)

    def __str__(self):
        return self.name


class Nurse(Base):
    """Modelo representando os enfermeiros."""
    name = models.CharField("Nome", max_length=100)
    coren = models.CharField("COREN", max_length=20, unique=True)
    registration_number = models.CharField("Registro", max_length=100, null=True, blank=True)
    sector = models.CharField("Setor", max_length=100, null=True, blank=True)

    def __str__(self):
        return self.name


class Queue(models.Model):

    # Prefixos
    PREFIX_MAP = {
        'pre_triagem': 'PTRI',
        'triagem': 'TRI',
        'pre_atendimento': 'PATEN',
        'em_atendimento': 'ATEN',
        'pos_atendimento': 'PSATE',
        'finalizado': 'ALT',
    }

    # Opções de status para o campo 'status'
    STATUS_CHOICES = [
        ('pre_triagem', 'Pré-triagem'),
        ('triagem', 'Triagem'),
        ('pre_atendimento', 'Pré-atendimento'),
        ('em_atendimento', 'Em Atendimento'),
        ('pos_atendimento', 'Pós-atendimento'),
        ('finalizado', 'Finalizado'),
    ]

    # Opções de comorbidades
    COMORBIDITIES_CHOICES = [
        ('visuais', 'Necessidades Visuais'),
        ('fisicas', 'Necessidades Físicas'),
        ('mental', 'Necessidades Mentais'),
        ('oncologico', 'Paciente Oncológico'),
        ('outros', 'Outros'),
    ]

    # Campos existentes
    pacient = models.ForeignKey('Pacient', on_delete=models.CASCADE)
    doctor = models.ForeignKey('Doctor', on_delete=models.SET_NULL, null=True, blank=True)
    nurse = models.ForeignKey('Nurse', on_delete=models.SET_NULL, null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pre_triagem')
    senha = models.CharField(max_length=20, blank=True, editable=False)
    comorbidities = models.CharField(max_length=20, choices=COMORBIDITIES_CHOICES, null=True, blank=True)
    date_created = models.DateTimeField(default=timezone.now)
    time_called = models.TimeField(null=True, blank=True)
    observations = models.TextField(blank=True, null=True)

    def save(self, *args, **kwargs):
        # Permitir a atualização do paciente caso ele já esteja na fila
        if not self.pk and Queue.objects.filter(pacient=self.pacient).exclude(status='finalizado').exists():
            raise ValidationError(f"Paciente {self.pacient.name} já está em uma fila ativa!")

        # Geração da senha
        prefix = self.PREFIX_MAP.get(self.status, 'PTRI')
        if not self.senha:
            last_queue = Queue.objects.filter(senha__startswith=prefix).order_by('-id').first()
            next_number = int(last_queue.senha.split('-')[-1]) + 1 if last_queue else 1
            self.senha = f"{prefix}-{next_number:03}"
        else:
            number = self.senha.split('-')[-1]
            self.senha = f"{prefix}-{number}"

        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.senha} - {self.pacient.name} - {self.status}"

    # Método para garantir que o status é válido (não é obrigatório, mas pode ajudar a evitar problemas)
    def clean(self):
        if self.status not in dict(self.STATUS_CHOICES):
            raise ValidationError(f"Status '{self.status}' não é um status válido.")



class Consultation(Base):
    pacient = models.ForeignKey(Pacient, on_delete=models.CASCADE)
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    date = models.DateTimeField("Data da Consulta", default=timezone.now)
    observations = models.TextField("Observações", null=True, blank=True)

    def __str__(self):
        return f"Consulta de {self.pacient.name} com {self.doctor.name} em {self.date}"
    

class Reception(models.Model):
    # Relacionamento com a fila de pacientes
    queue = models.OneToOneField('Queue', on_delete=models.CASCADE, related_name='reception', default=None)

    # Informações sobre a triagem
    nurse = models.ForeignKey('Nurse', on_delete=models.SET_NULL, null=True, blank=True)
    priority = models.CharField(
        max_length=50,
        choices=[('low', 'Baixa'), ('medium', 'Média'), ('high', 'Alta')],
        default='low'  # Valor padrão definido para 'priority'
    )
    main_complaint = models.TextField(default="Sem queixa")
    disease_onset = models.CharField(max_length=255, default="Desconhecido")
    physical_condition = models.CharField(max_length=255, default="Sem informação")
    medications = models.TextField(blank=True, null=True)
    allergies = models.CharField(max_length=255, blank=True, null=True)
    addictions = models.TextField(blank=True, null=True)
    blood_pressure = models.CharField(max_length=20, blank=True, null=True)
    temperature = models.FloatField(blank=True, null=True)
    oxygen_saturation = models.FloatField(blank=True, null=True)
    heart_rate = models.IntegerField(blank=True, null=True)
    pain_scale = models.IntegerField(blank=True, null=True)
    glasgow_scale = models.IntegerField(blank=True, null=True)
    triagem_finalizada = models.BooleanField(default=False)
    
    # Data e hora da triagem
    data_triagem = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"Recepção {self.id} - Paciente: {self.queue.pacient.name} - {self.priority}"