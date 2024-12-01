from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from ..forms import PacientForm
import logging
import json


logger = logging.getLogger(__name__)

@csrf_exempt
def cadastrar_paciente(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)  # Decodifica os dados JSON
            form = PacientForm(data)  # Preenche o formulário com os dados

            if form.is_valid():
                form.save()  # Salva o objeto Pacient no banco
                return JsonResponse({"message": "Paciente cadastrado com sucesso"}, status=201)
            else:
                return JsonResponse({"errors": form.errors}, status=400)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Erro ao decodificar JSON"}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Método não permitido"}, status=405)

def cadastrar_medico(request):
    if request.method == "POST":
        form = DoctorForm(request.POST)
        if form.is_valid():
            medico = form.save()
            return JsonResponse({"status": "success", "message": "Médico cadastrado com sucesso!", "medico": {"id": medico.id, "name": medico.name}})
        else:
            return JsonResponse({"status": "error", "errors": form.errors}, status=400)
    return JsonResponse({"status": "error", "message": "Método não permitido"}, status=405)

def cadastrar_enfermeiro(request):
    if request.method == "POST":
        form = NurseForm(request.POST)
        if form.is_valid():
            enfermeiro = form.save()
            return JsonResponse({"status": "success", "message": "Enfermeiro cadastrado com sucesso!", "enfermeiro": {"id": enfermeiro.id, "name": enfermeiro.name}})
        else:
            return JsonResponse({"status": "error", "errors": form.errors}, status=400)
    return JsonResponse({"status": "error", "message": "Método não permitido"}, status=405)

def cadastrar_atendimento(request):
    if request.method == "POST":
        form = QueueForm(request.POST)
        if form.is_valid():
            atendimento = form.save()
            return JsonResponse({"status": "success", "message": "Atendimento cadastrado com sucesso!", "atendimento": {"id": atendimento.id, "status": atendimento.get_status_display()}})
        else:
            return JsonResponse({"status": "error", "errors": form.errors}, status=400)
    return JsonResponse({"status": "error", "message": "Método não permitido"}, status=405)
