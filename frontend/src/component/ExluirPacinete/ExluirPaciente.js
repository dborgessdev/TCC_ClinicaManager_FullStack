import style from './ExluirPacinete.module.css';
import Botao from '../Botao/Botao';
import { useState } from 'react';

function ExluirPaciente({ isOpen, onClose, paciente }) {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // Função para confirmar a exclusão
    const confirmExclusao = () => {
        setShowConfirmation(true);
    };

    // Função chamada ao clicar no botão de confirmar exclusão
    const onConfirmExclusao = async () => {
        console.log('Paciente excluído com sucesso!');
    };

    return (
        <>
            {isOpen && !showConfirmation && (
                <div className={style.modalOverlay}>
                    <div className={style.conteiner}>
                        <div className={style.conteiner2}>
                            <Botao children={"Excluir Paciente"} onClick={confirmExclusao} color={'brancoButton'} />
                            <Botao children={"Cancelar"} onClick={onClose} color={'brancoButton'} />
                        </div>
                    </div>
                </div>
            )}

            {showConfirmation && (
                <div className={style.modalOverlay}>
                    <div className={style.conteiner}>
                        <div className={style.conteiner2}>
                            <p>Você tem certeza que deseja excluir o paciente?</p>
                            <Botao children={"Confirmar"} onClick={onConfirmExclusao} color={'brancoButton'} />
                            <Botao children={"Cancelar"} onClick={() => setShowConfirmation(false)} color={'brancoButton'} />
                        </div>
                    </div>
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

export default ExluirPaciente;
