import React from 'react';
import styles from './datacontroller.module.css';

export function DataController() {
  return (
    <div className={styles.container}>
      <input className={styles.input}/>
      <button className={styles.btn}>Обновить данные</button>
    </div>
  );
}
