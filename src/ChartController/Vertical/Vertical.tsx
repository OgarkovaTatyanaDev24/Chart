import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { chartSelector } from "../../store/slices/chartSlices";
import { IBorders } from "../ChartController";

export interface ILegendY {
  position: number;
  label: number;
}

export function Vertical({
  borders,
  spaceTop,
  chartHeight,
}: {
  borders:IBorders,
  spaceTop: number,
  chartHeight: number
}) {

    const [labelsY, setLabelsY] = useState<Array<ILegendY>>([]);
    const chart = useSelector(chartSelector);

    useEffect(() => {
      const y_labels = [];
      for (let i = 0; i < borders.range / borders.stepY + 1; i++) {
        y_labels.push({
          position: borders.stepY * i * (chartHeight / borders.range),
          label: borders.stepY * i,
        });
      }
      setLabelsY(y_labels);
    }, [chart, borders]);
    
  return <>
          {labelsY.map((element) => (
          <text x={0} y={spaceTop + chartHeight - element.position}>
            {element.label}
          </text>
        ))}
        </>;
}
