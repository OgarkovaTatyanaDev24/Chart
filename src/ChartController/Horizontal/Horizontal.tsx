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
    const x_labels = chart.coord.map((el, index) => ({
      label: el.x,
      positionX: index * borders.stepX,
      positionY:
        chartHeight -
        ((el.value - borders.minVal) * chartHeight) / borders.range +
        spaceTop,
      step: borders.stepX,
      value: el.value,
    }));
    setLabelsX(x_labels);
  }, [chart, borders]);

  return (
    <>
      {labelsX.map((element) => (
        <>
          <text
            x={element.positionX + spaceLeft}
            y={chartHeight + 40}
            text-anchor="middle"
          >
            {element.label}
          </text>
          <rect
            className={styles.rect}
            x={element.positionX}
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
        </>
      ))}
    </>
  );
}
