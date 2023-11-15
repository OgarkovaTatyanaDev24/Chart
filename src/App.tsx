import styles from "./app.module.css";
import { ChartController } from "./ChartController";
import { DataController } from "./DataController";

function App() {
  return (
    <div className={styles.container}>
      <DataController />
      <ChartController />
    </div>
  );
}

export default App;
