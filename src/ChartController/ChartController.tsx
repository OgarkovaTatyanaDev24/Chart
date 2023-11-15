import { useEffect, useState } from "react";
import styles from "./chartcontroller.module.css";
import { useSelector } from "react-redux";
import { chartSelector } from "../store/slices/chartSlices";
import { ChartHover, IHoverState } from "./ChartHover/ChartHover";
import { Horizontal } from "./Horizontal";
import { Vertical } from "./Vertical";

export interface IBorders {
  minVal: number;
  maxVal: number;
  range: number;
  stepX: number;
  stepY: number;
}

export function ChartController() {
  const [points, setPoints] = useState("");
  const [borders, setBorders] = useState<IBorders>({
    minVal: 0,
    maxVal: 0,
    range: 0,
    stepX: 0,
    stepY: 0,
  });

  const [hoverState, setHoverState] = useState<IHoverState>({ show: false });

  const chart = useSelector(chartSelector);
  const [boxWidth, boxHeight] = [656, 400];
  const [spaceTop, spaceBottom, spaceLeft, spaceRight] = [20, 20, 60, 50];
  const [chartWidth, chartHeight] = [
    boxWidth - spaceLeft - spaceRight,
    boxHeight - spaceTop - spaceBottom,
  ];

  useEffect(() => {
    if (chart.coord.length) {
      const yMax = chart.coord
        .filter((el) => !isNaN(el.value))
        .reduce((acc, curr) => (acc.value > curr.value ? acc : curr)).value;
      const yMin = chart.coord
        .filter((el) => !isNaN(el.value))
        .reduce((acc, curr) => (acc.value < curr.value ? acc : curr)).value;

      const stepX = chartWidth / (chart.coord.length - 1);
      const numDigits = Math.ceil(Math.log10(yMax - yMin));
      const stepY =
        Math.floor((yMax - yMin) / 10 ** (numDigits - 1)) *
        10 ** (numDigits - 2);
      const maxVal = Math.ceil(yMax / stepY) * stepY;
      const minVal = Math.floor(yMin / stepY) * stepY;
      const range = maxVal - minVal;
      setBorders({
        minVal: minVal,
        maxVal: maxVal,
        range: range,
        stepX: stepX,
        stepY: stepY,
      });

      const chartCoord = chart.coord.map((el, index) => {
        return [
          index * stepX + spaceLeft,
          chartHeight - ((el.value - minVal) * chartHeight) / range + spaceTop,
        ];
      });
      const lineCoords = chartCoord.join(" ");
      setPoints(lineCoords);
    }
  }, [chart, chartHeight, chartWidth, spaceLeft, spaceTop]);

  return (
    <div className={styles.chart}>
      <svg
        viewBox={`0 0 ${boxWidth} ${boxHeight}`}
        className={styles.chartSvg}
        onMouseLeave={() => setHoverState({ show: false })}
      >
        <rect
          x={spaceLeft}
          y={0}
          width={chartWidth}
          height={chartHeight + spaceTop}
          className={styles.colorBackground}
        />
        <Horizontal
          borders={borders}
          setHoverState={setHoverState}
          chartHeight={chartHeight}
          spaceLeft={spaceLeft}
          spaceTop={spaceTop}
        />
        <Vertical
          spaceTop={spaceTop}
          chartHeight={chartHeight}
          borders={borders}
        />
        <polyline className={styles.line} points={points} />
        {hoverState.show &&
          (hoverState.positionX || hoverState.positionX === 0) &&
          (hoverState.positionY || hoverState.positionY === 0) && (
            <ChartHover
              state={hoverState}
              chartHeight={chartHeight}
              spaceTop={spaceTop}
              spaceLeft={spaceLeft}
            />
          )}
      </svg>
    </div>
  );
}
