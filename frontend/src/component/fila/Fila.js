import { useEffect, useState } from 'react';
import style from './fila.module.css';
import SenhaFila from '../senhaFila/senhaFila';

function Fila({ titulo, funcao }) {
    const [filaAtendimentos, setFilaAtendimentos] = useState([]);

    useEffect(() => {
        const fetchFilaAtendimentos = async () => {
            try {
                const response = await funcao();
                setFilaAtendimentos(response);
            } catch (error) {
                console.error('Erro ao obter a fila de atendimentos:', error);
            }
        };
        fetchFilaAtendimentos();
        const interval = setInterval(() => {
            fetchFilaAtendimentos();
        }, 5000);
        return () => clearInterval(interval);
    }, []);
    
    return (
        <div className={style.conteiner}>
            <div className={style.titulo}>
                <h4>{titulo}</h4>
                <p>Quantidade: {filaAtendimentos ? filaAtendimentos.length : 0}</p>
            </div>
            <div className={style.corpo}>
                <tr className={style.legenda}>
                    <td className={style.legenda2}> 
                        <p>Posição</p>
                        <p>Nome</p>
                    </td>
                    <td>Senha</td>
                </tr>
                {filaAtendimentos && filaAtendimentos.map((atendimento, index) => (
                    <SenhaFila
                        key={atendimento.id}
                        posicao={index + 1}
                        nome={atendimento.pacient_name}
                        senha={atendimento.senha}
                    />
                ))}
            </div>
        </div>
    );
}
export default Fila;