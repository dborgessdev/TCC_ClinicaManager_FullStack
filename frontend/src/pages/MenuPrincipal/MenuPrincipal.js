import style from './MenuPrincipal.module.css';
import Botao from '../../component/Botao/Botao';
import Fila from '../../component/fila/Fila';
import CadastrarPaciente from '../../component/CadastrarPaciente/CadastrarPaciente';
import { useState } from 'react';
import ListarPacientes from '../../component/ListarPacientes/ListarPacientes';
import { getFilaPreTriagem } from '../../service/API_function';
import { useNavigate } from 'react-router-dom';

function MenuPrincipal() {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalOpen2, setModalOpen2] = useState(false);
    const [modalOpen3, setModalOpen3] = useState(false);
    const [modalOpen4, setModalOpen4] = useState(false);
    const navigate = useNavigate();

    const toggleModal = () => {
        setModalOpen(!modalOpen);
    }

    const toggleModal2 = () => {
        setModalOpen2(!modalOpen2);
    }

    const toggleModal3 = () => {
        setModalOpen3(!modalOpen3);
    }

    const toggleModal4 = () => {
        setModalOpen4(!modalOpen4);
    }


    return(
        <div className={style.container}>
            <div className={style.navebar}>
                <div className={style.logo}>
                    GIAC™
                </div>
                <div className={style.user}>
                    <a href='/painel-senha'>Home</a>
                    <a>Novo Admin</a>
                    <a></a>
                </div>
            </div>
            <div className={style.content}>
                <div className={style.botoes}>
                    <Botao children={"Cadastrar paciente"} onClick={() => toggleModal()} color={'azulEscuroButton'} />
                    <Botao children={"Adicionar nas filas"} onClick={() => toggleModal2()} color={'azulClaroButton'} />
                    <Botao children={"Excluir da fila"} onClick={() => toggleModal3()} color={'azulEscuroButton'} />
                    <Botao children={"Excluir Paciente"} onClick={() => toggleModal4()} color={'azulClaroButton'} />
                </div>
                <div className={style.container2}>
                    <div className={style.filas}>
                        <Fila titulo={"Triagem"} funcao={getFilaPreTriagem}/>
                        <Fila titulo={"Atendimento"}/>
                        <Fila titulo={"Medico"} />
                    </div>
                    <div className={style.detalhes}>
                        Para um bom funcionamento organização é essencial
                    </div>
                </div>
            </div>
            <CadastrarPaciente isOpen={modalOpen} onClose={toggleModal} />
            <ListarPacientes isOpen={modalOpen2} onClose={toggleModal2} botao={"Adicionar"} modeal={"1"} />
            <ListarPacientes isOpen={modalOpen3} onClose={toggleModal3} botao={"Excluir"} modeal={"2"} />
            <ListarPacientes isOpen={modalOpen4} onClose={toggleModal4} botao={"Excluir"} modeal={"3"} />
        </div>
    );
}

export default MenuPrincipal;