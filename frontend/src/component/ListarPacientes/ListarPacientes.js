import style from './ListarPacientes.module.css';
import Botao from '../Botao/Botao';
import { useState, useEffect } from 'react';
import { listarPacintes } from '../../service/API_function';
import PacientesFilaUnitario from '../PacientesFilaUnitario/PacientesFilaUnitario';
import Imput from '../Imput/Imput';

function AdicionarFila({ isOpen, onClose, botao, modeal }) {
    const [listaPacientes, setListaPacientes] = useState([]);
    const [termoPesquisa, setTermoPesquisa] = useState('');

    useEffect(() => { // Atualiza a lista de pacientes
        const fetchPacientes = async () => {
            console.log('Paciente excluído com sucesso!');
        };

        fetchPacientes();
    }, [isOpen]);

    const handleInputChange = (e) => {
        setTermoPesquisa(e.target.value);
    };

    const pacientesFiltrados = listaPacientes.filter((paciente) => {
        const termoLower = termoPesquisa.toLowerCase();
        return (
            paciente.nome.toLowerCase().includes(termoLower) || 
            paciente.cpf.includes(termoPesquisa)
        );
    });

    return (
        <>
            {isOpen && (
                <div className={style.modalOverlay}>
                    <div className={style.conteiner}>
                        <div className={style.conteiner2}>
                            <div className={style.cima}>
                                <h3>Gerenciar pacientes</h3>
                            </div>
                            <div className={style.meio}>
                                <div className={style.meioImfo}>
                                    <div className={style.legenda}>
                                        <p>CPF</p>
                                        <p>Nome</p>
                                        <p>Data de Nascimento</p>
                                        <p>Ação</p>
                                    </div>
                                    <div className={style.corpo}>
                                        {pacientesFiltrados.map((paciente, index) => (
                                            <PacientesFilaUnitario
                                                key={index}
                                                cpf={paciente.cpf}
                                                nome={paciente.nome}
                                                dataNasc={paciente.dataNasc}
                                                pacientekey={paciente.id}
                                                botao={botao}
                                                modeal={modeal}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className={style.baixo}>
                                <Imput
                                    value={termoPesquisa}
                                    type={"text"}
                                    placeholder={"Pesquisar por nome ou CPF"}
                                    onChange={handleInputChange}
                                    color={'CadaastroInput'}
                                />
                                <div className={style.conteiner3}>
                                    <Botao children={'Cancelar'} onClick={() => onClose()} color={'brancoButton'} />
                                    <Botao children={'Comfirmar'} onClick={() => console.log('Comfirmar')} color={'brancoButton'} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default AdicionarFila;
