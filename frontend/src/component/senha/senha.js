import styles from './senha.module.css';

function Senha({senha, localDeAtendimento, par}) {
    return (
        <div className={`${styles.senhaUnicas} ${par ? styles.par : styles.impar}`}>
            <div className={styles.Bloco}>
                <h4>Senha</h4>
                <p>{senha}</p>
            </div>
            <div className={styles.Bloco}>
                <h4>Local de Atendimento</h4>
                <p>{localDeAtendimento}</p>
            </div>
        </div>
    );
}

export default Senha;
