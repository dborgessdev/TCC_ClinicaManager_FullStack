#MODO HTML
"""
from django.http import JsonResponse
from django.shortcuts import get_object_or_404, redirect, render
from rest_framework import viewsets
from rest_framework.response import Response
from ..serializers import QueueSerializer
from ..forms import ConsultaForm
from ..models import Consultation, Queue
from ..serializers import ConsultationSerializer

class ConsultationViewSet(viewsets.ModelViewSet):
    queryset = Consultation.objects.all()
    serializer_class = ConsultationSerializer

def pre_consulta_view(request):
    '''Renderiza a página com a lista de pacientes aguardando pré-consulta.'''
    if request.method == "GET":
        # Busca todos os objetos Queue com status 'pre_atendimento'
        queues = Queue.objects.filter(status='pre_atendimento').order_by('-date_created')

        # Renderiza o template e passa os dados como contexto
        return render(request, "pre_atendimento.html", {"queues": queues})
    return JsonResponse({"error": "Método não permitido."}, status=405)

def iniciar_consulta_view(request):
    '''Atualiza o status da fila para 'em_atendimento' e redireciona para a ficha de consulta.'''
    senha = request.GET.get('senha')  # Obtém a senha passada na URL
    queue = get_object_or_404(Queue, senha=senha)
    queue.status = 'em_atendimento'  # Altera o status para "em_atendimento"
    queue.save()
    # Redireciona para a página de consulta com o ID da fila
    return redirect('ficha_consulta', senha=queue.senha)

def formulario_consulta_view(request, senha):
    '''Exibe o formulário de consulta para o paciente associado a uma senha.'''
    queue = get_object_or_404(Queue, senha=senha)
    paciente = queue.pacient  # Obtém o paciente associado à senha

    # Se o formulário for enviado, processa os dados
    if request.method == 'POST':
        form = ConsultaForm(request.POST)
        if form.is_valid():
            consultation = form.save(commit=False)
            consultation.queue = queue
            consultation.save()

            # Atualiza o status da fila para 'pos_atendimento'
            queue.status = 'pos_atendimento'
            queue.save()
            consultation.consulta_finalizada = True
            consultation.save()

            return redirect('/api/pre-consulta/')  # Redireciona para a página de pré-consulta
    else:
        form = ConsultaForm()

    return render(request, 'ficha_consulta.html', {'form': form, 'paciente': paciente}) """


#MODO JSON

from django.http import JsonResponse
from django.shortcuts import get_object_or_404, redirect, render
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view
from ..serializers import QueueSerializer
from ..forms import ConsultaForm
from ..models import Consultation, Queue
from ..serializers import ConsultationSerializer

class ConsultationViewSet(viewsets.ModelViewSet):
    queryset = Consultation.objects.all()
    serializer_class = ConsultationSerializer

@api_view(['GET'])
def pre_consulta_view(request):
    '''Retorna a lista de pacientes aguardando pré-consulta em formato JSON.'''
    if request.method == "GET":
        # Busca todos os objetos Queue com status 'pre_atendimento' (modificado para 'pre_consulta' se necessário)
        queues = Queue.objects.filter(status='pre_atendimento').order_by('-date_created')

        # Serializa os dados utilizando o QueueSerializer
        serializer = QueueSerializer(queues, many=True)

        # Retorna a lista de objetos em formato JSON
        return Response(serializer.data)
    else:
        # Para outros métodos, retorna erro
        return JsonResponse({"error": "Método não permitido."}, status=405)
    
def iniciar_consulta_view(request):
    senha = request.GET.get('senha')  # Pega a senha passada na URL
    queue = Queue.objects.get(senha=senha)
    queue.status = 'em_atendimento'  # Altera o status para "em_atendimento"
    queue.save()
    # Redireciona para a página de consulta com o ID da fila
    return redirect('ficha_consulta', senha=queue.senha)

def formulario_consulta_view(request, senha):
    queue = get_object_or_404(Queue, senha=senha)
    paciente = queue.pacient  # Obtém o paciente associado à senha
    
    # Se o formulário for enviado, processa os dados
    if request.method == 'POST':
        form = ConsultaForm(request.POST)
        if form.is_valid():
            consultation = form.save(commit=False)
            consultation.queue = queue
            consultation.save()

            # Atualiza o status da fila para 'pre-atendimento'
            queue.status = 'pos_atendimento'
            queue.save()
            consultation.consulta_finalizada = True
            consultation.save()

            return redirect('/api/pre-consulta/')  
    else:
        form = ConsultaForm()

    return render(request, 'ficha_consulta.html', {'form': form, 'paciente': paciente})
 