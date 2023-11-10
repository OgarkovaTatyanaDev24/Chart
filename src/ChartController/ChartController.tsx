import { useEffect, useState } from 'react';
import styles from './chartcontroller.module.css';
import { useSelector } from 'react-redux';
import { chartSelector } from '../store/slices/chartSlices';

interface ILegend {
  position: number;
  label: string;
}


export function ChartController() {
  const [points, setPoints] = useState('')
  const [labelsX, setLabelsX] = useState<Array<ILegend>>([])

  const chart = useSelector(chartSelector)
  const boxWidth = 656
  const boxHeight = 400

  useEffect(
    () => {
      if (chart.coord.length)
      {
        const y_max = chart.coord.filter((el => !isNaN(el.value))).reduce((acc, curr) => acc.value > curr.value ? acc : curr).value;
        const y_min = chart.coord.filter((el => !isNaN(el.value))).reduce((acc, curr) => acc.value < curr.value ? acc : curr).value;
        const step = boxWidth/(chart.coord.length-1)
        const chartCoord = chart.coord.map(
          (el, index) => {
            return [index*step+20, boxHeight-(el.value-y_min)*boxHeight/(y_max-y_min)+10]
          }
        );
        const x_labels = chart.coord.map(
          (el, index) => ({label: el.x, position: index*step})
        );
        setLabelsX(x_labels)
        const lineCoords = chartCoord.join(' ')

          // chart.coord.map()
        setPoints(lineCoords)
      }
    },
    [chart]
  )

  return (
    <div className={styles.chart}>
      <svg viewBox={`0 0 ${boxWidth+10} ${boxHeight+20}`} className={styles.chartSvg}>
        
        <rect x="20" y="10" width={boxWidth} height={boxHeight} fill='#fff6f6'/>
        <polyline
          fill="none"
          stroke="#3c1717"
          stroke-width="2"
          points={points}
        />
        {labelsX.map((element) => {
          return (<text x={element.position} y={boxHeight+20}>{element.label}</text>)
        })}
      </svg>
    </div>
  );
}
