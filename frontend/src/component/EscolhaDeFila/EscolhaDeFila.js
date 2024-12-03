import React, { useState } from 'react';
import Botao from '../Botao/Botao';
import style from './EscolhaDeFila.module.css';
import { listaEnfermeiros, addPacienteFila } from '../../service/API_function';
import { useEffect } from 'react';

function EscolhaDeFila({ isOpen, onClose, paciente }) {
    const [comorbidities, setComorbidities] = useState('visuais'); // Prioridade inicial (normal)
    const [showConfirmation, setShowConfirmation] = useState(false); // Estado para controle da tela de confirmação
    const [loading, setLoading] = useState(false); // Estado para controlar a exibição de carregamento
    const [errorMessage, setErrorMessage] = useState(''); // Mensagem de erro, se houver
    const [enfermeirosLista, setEnfermeirosLista] = useState([]);
    const [enfermeiros, setEnfermeiros] = useState('1');

    useEffect(() => {
        if (isOpen) { // Executa apenas quando o modal está aberto
            const fetchEnfermeiros = async () => {
                try {
                    const dados = await listaEnfermeiros();
                    setEnfermeirosLista(dados);
                } catch (error) {
                    console.error('Erro ao buscar pacientes:', error);
                }
            };
    
            fetchEnfermeiros();
        }
    }, [isOpen]);

    const handleComorbiditiesChange = (e) => {
        setComorbidities(e.target.value);
    };

    const handleEnfermeirosChange = (e) => {
        setEnfermeiros(e.target.value); // Atualiza o estado
    };
    
    

    // Função para exibir a tela de confirmação
    const confirmMove = () => {
        setShowConfirmation(true);
    };

    // Função para mover o paciente para a fila
    const handleSubmit = async () => {
        const dados = {
            status: "pre_triagem",
            pacient: String(paciente.pacientekey),
            nurse: enfermeiros,
            comorbidities: comorbidities,
        }

        try {
            await addPacienteFila(dados);
            onClose(); // Fecha o modal
        } catch (error) {
            console.log(dados);
            console.error('Erro ao mover paciente para fila:', error);
            setErrorMessage('Erro ao mover paciente para fila. Tente novamente.'); // Exibe mensagem de erro
        }
    };

    return (
        <>
            {isOpen && !showConfirmation && (
                <div className={style.modalOverlay}>
                    <div className={style.modalContent}>
                        <div className={style.cima}>
                            <h3>Mover Paciente para Fila</h3>
                            <p>Nome: {paciente.nome}</p>
                            <p>CPF: {paciente.cpf}</p>
                        </div>
                        <div className={style.selectContainer}>
                            <label htmlFor="enfermeiros">Enfermeiros:</label>
                            <select
                                id="enfermeiros"
                                value={enfermeiros} // Ajuste para refletir o valor selecionado
                                onChange={handleEnfermeirosChange}
                            >
                                {enfermeirosLista.length > 0 ? (
                                    enfermeirosLista.map((enfermeiro) => (
                                        <option key={enfermeiro.id} value={enfermeiro.id}>
                                            {enfermeiro.name}
                                        </option>
                                    ))
                                ) : (
                                    <option>Carregando...</option> // Exibe uma opção enquanto os dados estão sendo carregados
                                )}
                            </select>
                        </div>
                        <div className={style.selectContainer}>
                            <label htmlFor="comorbidities">Comorbidades:</label>
                            <select id="comorbidities" value={comorbidities} onChange={handleComorbiditiesChange}>
                                <option value="visuais">Necessidades Visuais</option>
                                <option value="fisicas">Necessidades Físicas</option>
                                <option value="mental">Necessidades Mentais</option>
                                <option value="oncologico">Paciente Oncológico</option>
                                <option value="outros">Outros</option>
                            </select>
                        </div>
                        <div className={style.buttonContainer}>
                            <Botao children={'Cancelar'} onClick={onClose} color={'brancoButton'} />
                            <Botao children={'Mover'} onClick={confirmMove} color={'brancoButton'} />
                        </div>
                    </div>
                </div>
            )}

            {showConfirmation && (
                <div className={style.modalOverlay}>
                    <div className={style.modalContent}>
                        <div className={style.cima}>
                            <h3>Confirmar Mover Paciente</h3>
                            <p>Você tem certeza que deseja mover o paciente para a fila de triagem com a Comorbidade {comorbidities}?</p>
                        </div>
                        <div className={style.buttonContainer}>
                            <Botao children={'Confirmar'} onClick={handleSubmit} color={'brancoButton'} />
                            <Botao children={'Cancelar'} onClick={() => setShowConfirmation(false)} color={'brancoButton'} />
                        </div>
                    </div>
                </div>
            )}

            {loading && (
                <div className={style.loadingOverlay}>
                    <p>Movendo paciente...</p>
                </div>
            )}

            {errorMessage && (
                <div className={style.errorOverlay}>
                    <p>{errorMessage}</p>
                </div>
            )}
        </>
    );
}

export default EscolhaDeFila;
