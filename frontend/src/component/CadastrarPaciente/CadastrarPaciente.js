import React, { useState } from 'react';
import style from './CadastrarPaciente.module.css';
import Imput from '../Imput/Imput';
import Botao from '../Botao/Botao';
import { handleCPFChange, handleTelefoneChange } from '../../service/FuncoesGerais';
import { cadastrarPaciente } from '../../service/API_function';

function CadastrarPaciente({ isOpen, onClose }) {
    const [cpf, setCpf] = useState('');
    const [name, setName] = useState('');
    const [birth_date, setBirth_date] = useState('');
    const [phone_number, setPhone_number] = useState('');

    const handleInputChange = (e) => {
        const cpfFormatado = handleCPFChange(e);
        setCpf(cpfFormatado);
    };

    const handleNomeChange = (e) => {
        setName(e.target.value);
    };

    const handleDataChange = (e) => {
        setBirth_date(e.target.value);
    };

    const handleInputTelefoneChange = (e) => {
        handleTelefoneChange(e, setPhone_number);
    };

    const HandleCadastroPaciente = async () => {
        const paciente = {
            name: name,
            birth_date: birth_date,
            cpf: cpf,
            phone_number: phone_number,
        };

        try {
            await cadastrarPaciente(paciente);
            console.log('Paciente cadastrado com sucesso:', paciente);
            onClose();
        } catch (error) {
            console.error('Erro ao cadastrar paciente:', error);
        }
    };

    return (
        <>
            {isOpen && (
                <div className={style.modalOverlay}>
                    <div className={style.conteiner}>
                        <div className={style.conteiner2}>
                            <div className={style.cima}>
                                <h3>Cadastro de Paciente</h3>
                            </div>
                            <div className={style.meio}>
                                <div className={style.meioImfo}>
                                    <p>Nome</p>
                                    <Imput
                                        type={'text'}
                                        placeholder={'Nome'}
                                        color={'CadaastroInput'}
                                        onChange={handleNomeChange}
                                    />
                                    <p>Número de Telefone</p>
                                    <Imput
                                        type={'text'}
                                        placeholder={'Telefone'}
                                        color={'CadaastroInput'}
                                        value={phone_number} // Exibe o número formatado
                                        onChange={handleInputTelefoneChange}
                                    />
                                    <p>Data de Nascimento</p>
                                    <Imput
                                        type={'date'}
                                        placeholder={'Data de Nascimento'}
                                        color={'CadaastroInput'}
                                        value={birth_date}
                                        onChange={handleDataChange}
                                    />
                                    <p>CPF</p>
                                    <Imput
                                        type={'text'}
                                        placeholder={'000.000.000-00'}
                                        color={'CadaastroInput'}
                                        value={cpf}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className={style.baixo}>
                                <div className={style.conteiner3}>
                                    <Botao
                                        children={'Cancelar'}
                                        onClick={() => onClose()}
                                        color={'brancoButton'}
                                    />
                                    <Botao
                                        children={'Cadastrar'}
                                        onClick={() => HandleCadastroPaciente()}
                                        color={'brancoButton'}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default CadastrarPaciente;
