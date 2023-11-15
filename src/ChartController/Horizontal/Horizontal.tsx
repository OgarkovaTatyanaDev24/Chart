import styles from "./horizontal.module.css";
import { IHoverState } from "../ChartHover/ChartHover";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IBorders } from "../ChartController";
import { useSelector } from "react-redux";
import { chartSelector } from "../../store/slices/chartSlices";

export interface ILegendX {
  positionX: number;
  positionY: number;
  value: number;
  label: string;
  step: number;
}

export function Horizontal({
  borders,
  setHoverState,
  chartHeight,
  spaceLeft,
  spaceTop,
}: {
  borders: IBorders;
  setHoverState: Dispatch<SetStateAction<IHoverState>>;
  chartHeight: number;
  spaceLeft: number;
  spaceTop: number;
}) {
  const [labelsX, setLabelsX] = useState<Array<ILegendX>>([]);
  const chart = useSelector(chartSelector);

  useEffect(() => {
    const xLabels = chart.coord.map((el, index) => ({
      label: el.x,
      positionX: index * borders.stepX,
      positionY:
        chartHeight -
        ((el.value - borders.minVal) * chartHeight) / borders.range +
        spaceTop,
      step: borders.stepX,
      value: el.value,
    }));
    setLabelsX(xLabels);
  }, [chart, borders, chartHeight, spaceTop]);

  return (
    <>
      {labelsX.map((element, index) => (
        <g key={"horisontal" + index}>
          <text
            x={element.positionX + spaceLeft}
            y={chartHeight + 40}
            className={styles.text}
          >
            {element.label}
          </text>
          <rect
            className={styles.rect}
            x={element.positionX + spaceLeft - element.step / 2}
            y={spaceTop}
            width={element.step}
            height={chartHeight}
            onMouseOver={() =>
              setHoverState({
                show: true,
                positionX: element.positionX,
                positionY: element.positionY,
                value: element.value,
              })
            }
          />
        </g>
      ))}
    </>
  );
}
