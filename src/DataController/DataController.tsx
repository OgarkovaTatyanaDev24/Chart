import React, { ChangeEvent, useState } from 'react';
import styles from './datacontroller.module.css';
import { useDispatch } from 'react-redux';
import { setUrl } from '../store/slices/urlSlices';

export function DataController() {
  const [inputText, setInputText] = useState('')
  const dispatch = useDispatch();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  return (
    <div className={styles.container}>
      <input 
        className={styles.input}
        onChange={handleChange}
        value={inputText}
      />
      <button 
       className={styles.btn}
       onClick={
        () => dispatch(setUrl(inputText))
        }>Обновить данные</button>
    </div>
  );
}
