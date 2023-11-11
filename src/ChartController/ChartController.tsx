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
  const [boxWidth, boxHeight] = [656, 400]
  const [spaceTop, spaceBottom, spaceLeft, spaceRight] = [20, 20, 20, 20,]
  const [chartWidth, chartHeight] = [boxWidth-spaceLeft-spaceRight, boxHeight-spaceTop-spaceBottom]
  
  useEffect(
    () => {
      if (chart.coord.length)
      {
        const y_max = chart.coord.filter((el => !isNaN(el.value))).reduce((acc, curr) => acc.value > curr.value ? acc : curr).value;
        const y_min = chart.coord.filter((el => !isNaN(el.value))).reduce((acc, curr) => acc.value < curr.value ? acc : curr).value;
        const step = chartWidth/(chart.coord.length-1)
        const chartCoord = chart.coord.map(
          (el, index) => {
            return [index*step+spaceLeft, chartHeight-(el.value-y_min)*chartHeight/(y_max-y_min)+spaceTop]
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
      <svg viewBox={`0 0 ${boxWidth} ${boxHeight}`} className={styles.chartSvg}>
        
        <rect x={spaceLeft} y={spaceTop} width={chartWidth} height={chartHeight} fill='#fff6f6'/>
        <polyline
          fill="none"
          stroke="#3c1717"
          stroke-width="2"
          points={points}
        />
        {labelsX.map((element) =>  (<text x={element.position} y={chartHeight+40}>{element.label}</text>)
        )}
      </svg>
    </div>
  );
}
