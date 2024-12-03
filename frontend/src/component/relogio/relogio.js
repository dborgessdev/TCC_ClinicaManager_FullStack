import React, {useEffect, useState} from 'react';
import styles from './relogio.module.css';
import moment from "moment";

function Relogio() {

    const [date, setDate] = useState(moment().format("YYYY-MM-DD HH:mm:ss"));

    useEffect(() => {
      const timerID = setInterval(() => tick(), 1000);
      return () => clearInterval(timerID);
    }, []);
  
    function tick() {
      setDate(moment().format("YYYY-MM-DD HH:mm:ss"));
    }

    return (
        <div className={styles.qualdardo}>
            <p>{date}</p>
        </div>
    );
}

export default Relogio;
