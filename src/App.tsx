import { useEffect } from 'react';
import styles from './app.module.css';
import { ChartController } from "./ChartController";
import { DataController } from "./DataController";
import { getData } from './store/slices/chartSlices';
import { useStoreDispatch } from './store';
import { useSelector } from 'react-redux';
import { urlSelector } from './store/slices/urlSlices';


function App() {
  const dispatch = useStoreDispatch()
  const url = useSelector(urlSelector)
  useEffect(
    () => {
      dispatch(getData(url))
      const interval = setInterval(() => {  
        dispatch(getData(url))
      }, 5000000)
       return () => clearInterval(interval);
    },
    [url]
  )
  return ( 
    <div className={styles.container}>
      <DataController />
      <ChartController />
    </div>
  )
}

export default App;

