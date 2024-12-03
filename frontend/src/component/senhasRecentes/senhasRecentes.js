import Senha from '../senha/senha';
import styles from './senhasRecentes.module.css';

function SenhasRecentes({ senhasRecentes }) { 

    return (
        <aside className={styles.quadradoRecentes}>
            <h1>Senhas Anteriores</h1>
            <div className={styles.senhasAnteriores}>
                {senhasRecentes &&
                senhasRecentes.map((item, index) => <Senha
                key = {index}
                senha = {item.senha}
                localDeAtendimento = {item.localDeAtendimento}
                par={index % 2 === 0}
                />)}
            </div>
        </aside>
    );
}

export default SenhasRecentes;
