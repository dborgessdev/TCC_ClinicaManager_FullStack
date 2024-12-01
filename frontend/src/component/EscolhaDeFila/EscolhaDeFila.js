import React, { useState } from 'react';
import Botao from '../Botao/Botao';
import style from './EscolhaDeFila.module.css';
import { cadastrarFila } from '../../service/API_function';

function EscolhaDeFila({ isOpen, onClose, paciente }) {
    const [fila, setFila] = useState('triagem'); // Fila inicial
    const [prioridade, setPrioridade] = useState('normal'); // Prioridade inicial (normal)
    const [showConfirmation, setShowConfirmation] = useState(false); // Estado para controle da tela de confirmação
    const [loading, setLoading] = useState(false); // Estado para controlar a exibição de carregamento
    const [errorMessage, setErrorMessage] = useState(''); // Mensagem de erro, se houver

    const handleFilaChange = (e) => {
        setFila(e.target.value);
    };

    const handlePrioridadeChange = (e) => {
        setPrioridade(e.target.value);
    };

    // Função para exibir a tela de confirmação
    const confirmMove = () => {
        setShowConfirmation(true);
    };

    // Função para mover o paciente para a fila
    const handleSubmit = async () => {
        console.log('Paciente excluído com sucesso!');
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
                            <label htmlFor="fila">Fila:</label>
                            <select id="fila" value={fila} onChange={handleFilaChange}>
                                <option value="triagem">Triagem</option>
                                <option value="pediatra">Pediatria</option>
                                <option value="medico">Medico</option>
                            </select>
                        </div>
                        <div className={style.selectContainer}>
                            <label htmlFor="prioridade">Prioridade:</label>
                            <select id="prioridade" value={prioridade} onChange={handlePrioridadeChange}>
                                <option value="urgente">Urgente</option>
                                <option value="preferencial">Preferencial</option>
                                <option value="normal">Normal</option>
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
                            <p>Você tem certeza que deseja mover o paciente para a fila de {fila} com a prioridade {prioridade}?</p>
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
