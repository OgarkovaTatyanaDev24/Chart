import React, { ChangeEvent, useEffect, useState } from "react";
import styles from "./datacontroller.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setUrl, urlSelector } from "../store/slices/urlSlices";
import { useStoreDispatch } from "../store";
import { getData } from "../store/slices/chartSlices";

export function DataController() {
  const [inputText, setInputText] = useState("");
  const dispatch = useDispatch();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const storeDispatch = useStoreDispatch();
  const url = useSelector(urlSelector);
  useEffect(() => {
    storeDispatch(getData(url));
    const interval = setInterval(() => {
      storeDispatch(getData(url));
    }, 5000);
    return () => clearInterval(interval);
  }, [storeDispatch, url]);

  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        onChange={handleChange}
        value={inputText}
      />
      <button
        className={styles.btn}
        onClick={() => dispatch(setUrl(inputText))}
      >
        Обновить данные
      </button>
    </div>
  );
}
