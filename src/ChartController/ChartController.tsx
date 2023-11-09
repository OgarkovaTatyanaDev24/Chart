import React, { useEffect, useState } from 'react';
import styles from './chartcontroller.module.css';
import { useSelector } from 'react-redux';
import { chartSelector } from '../store/slices/chartSlices';


export function ChartController() {
  const [points, setPoints] = useState('')

  const chart = useSelector(chartSelector)
  const boxWidth = 656
  const boxHeight = 400

  useEffect(
    () => {
      if (chart.coord.length)
      {
        const y_max = chart.coord.filter((el => !isNaN(el.value))).reduce((acc, curr) => acc.value > curr.value ? acc : curr).value;
        const y_min = chart.coord.filter((el => !isNaN(el.value))).reduce((acc, curr) => acc.value < curr.value ? acc : curr).value;
        console.log(y_max)
        const step = boxWidth/(chart.coord.length-1)
        const chartCoord = chart.coord.map(
          (el, index) => {
            return [index*step, boxHeight-(el.value-y_min)*boxHeight/(y_max-y_min)]
          }
        );
        console.log(chartCoord)
        const lineCoords = chartCoord.join(' ')
        console.log(lineCoords)
          // chart.coord.map()
        setPoints(lineCoords)
      }
    },
    [chart]
  )

  return (
    <div className={styles.chart}>
      <svg viewBox={`0 0 ${boxWidth} ${boxHeight}`} className={styles.chartSvg}>
        <polyline
          fill="none"
          stroke="#3c1717"
          stroke-width="2"
          points={points}
        />
      </svg>
    </div>
  );
}
