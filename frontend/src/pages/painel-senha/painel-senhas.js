import SenhaAtual from "../../component/senhaAtual/senhaAtual";
import SenhasRecentes from "../../component/senhasRecentes/senhasRecentes";
import styles from './painel-senhas.module.css';
import Relogio from "../../component/relogio/relogio";


function PainelSenhas() {
  
  return (
    <main className={styles.painelSenhas}>
      <section className={styles.quadardo}>
        <div className={styles.quadradoSenha}>
          <div className={styles.relogio}>
            <Relogio />
          </div>
          <div className={styles.senhaAtual}>
            <SenhaAtual  />
          </div>
        </div>
        <SenhasRecentes />
      </section>
    </main>
  );
}

export default PainelSenhas;
