import React, {useState, useEffect} from 'react';
import styles from './senhaAtual.module.css';

function SenhaAtual({ refreshSenhasAnteriores }) {
    const [senha, setSenha] = useState('');
    const [localDeAtendimento, setLocalDeAtendimento] = useState('');

    return (
        <section className={styles.quadradoFundo}>
            <div className={styles.logo}>
                <h2>Senha atual chamada</h2>
            </div>
            <div className={styles.informacoes}>
                <div className={styles.senha}>
                    <h3>Senha</h3>
                    <p>{senha}</p>
                </div>
                <div className={styles.localDeAtendimento}>
                    <h3>Local de Atendimento</h3>
                    <p>{localDeAtendimento}</p>
                </div>
            </div>

        </section>
    );
}

export default SenhaAtual;
