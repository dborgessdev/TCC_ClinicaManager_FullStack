from django.shortcuts import render, redirect, get_object_or_404
from django.http import JsonResponse
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response

from ..serializers import QueueSerializer


from ..forms import TriagemForm
from ..models import Reception, Queue
from ..serializers import ReceptionSerializer

class ReceptionViewSet(viewsets.ModelViewSet):
    queryset = Reception.objects.all()
    serializer_class = ReceptionSerializer

@api_view(['GET'])
def pre_triagem_view(request):
    """Retorna a lista de pacientes aguardando pré-triagem em formato JSON."""
    if request.method == "GET":
        # Busca todos os objetos Queue com status 'pre_triagem'
        queues = Queue.objects.filter(status='pre_triagem').order_by('-date_created')

        # Serializa os dados utilizando o QueueSerializer
        serializer = QueueSerializer(queues, many=True)

        # Retorna a lista de objetos em formato JSON
        return Response(serializer.data)
    else:
        # Para outros métodos, retorna erro
        return JsonResponse({"error": "Método não permitido."}, status=405)

def iniciar_triagem_view(request):
    senha = request.GET.get('senha')  # Pega a senha passada na URL
    queue = Queue.objects.get(senha=senha)
    queue.status = 'triagem'  # Altera o status para "triagem"
    queue.save()

    # Redireciona para a página de triagem com o ID da fila
    return redirect('ficha_triagem', senha=queue.senha)

def formulario_triagem_view(request, senha):
    queue = get_object_or_404(Queue, senha=senha)
    paciente = queue.pacient  # Obtém o paciente associado à senha

    # Se o formulário for enviado, processa os dados
    if request.method == 'POST':
        form = TriagemForm(request.POST)
        if form.is_valid():
            # 1. Primeiro, altere o status da fila
            queue.status = 'pre_atendimento'  # Atualiza o status da fila
            queue.save()  # Salve a fila após a alteração do status

            # 2. Agora, crie o objeto Reception
            reception = form.save(commit=False)
            reception.queue = queue  # Associa a triagem à fila do paciente

            # 3. Verifique e preencha o campo 'nurse' com o usuário logado, se necessário
            ##    reception.nurse = request.user  # Preenche com o usuário logado, se necessário

            reception.save()  # Salve o Reception

            # 4. Defina a triagem como finalizada
            reception.triagem_finalizada = True
            reception.save()

            # 5. Redirecione para a página de pré-triagem após finalizar a triagem
            return redirect('/api/pre-triagem/')  # A URL da página de pré-triagem
    else:
        form = TriagemForm()

    # Retorna o template com o formulário e os dados do paciente
    return render(request, 'ficha_triagem.html', {'form': form, 'paciente': paciente})
