import Logo from '../../assets/img/Vector.png';
import styles from './menuLogin.module.css';
import {useContext, useState} from 'react';

function MenuLogin() {
    const [username, setUsername] = useState('');
    const [senha, setSenha] = useState('');

    return (
        <div className={styles.quadradoLogin}>
            <div className={styles.logoLogin}>
                <img src={Logo} alt="Logo" />
                <h3>Bem vindo</h3>
            </div>
            <div className={styles.inputLogin}>
                <input
                    type='text'
                    placeholder='Nome de usuário'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                ></input>
                <input
                    type='password'
                    placeholder='Senha'
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                ></input>
            </div>
            <div className={styles.botaoLogin}>
                <button onClick={() => console.log(username, senha)}>
                    Login
                </button>
            </div>
        </div>
    );
}

export default MenuLogin;
