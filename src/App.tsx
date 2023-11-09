import { useEffect } from 'react';
import styles from './app.module.css';
import { ChartController } from "./ChartController";
import { DataController } from "./DataController";
import { getData } from './store/slices/chartSlices';
import { useStoreDispatch } from './store';


function App() {
  const dispatch = useStoreDispatch()
  useEffect(
    () => {
      dispatch(getData())
      const interval = setInterval(() => {  
        dispatch(getData())
      }, 5000000)
       return () => clearInterval(interval);
    },
    []
  )
  return ( 
    <div className={styles.container}>
      <DataController />
      <ChartController />
    </div>
  )
}

export default App;

