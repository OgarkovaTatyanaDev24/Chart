import styles from "./charthover.module.css";

export interface IHoverState {
  show: boolean;
  value?: number;
  positionX?: number;
  positionY?: number;
}

export function ChartHover({
  state,
  spaceLeft,
  spaceTop,
  chartHeight,
}: {
  state: IHoverState;
  spaceLeft: number;
  spaceTop: number;
  chartHeight: number;
}) {
  return (
    (state.positionX !== undefined && state.positionY !== undefined && (
      <g
        style={{
          top: spaceTop,
          position: "absolute",
        }}
        height={chartHeight}
        width={50}
        className={styles.chartHover}
      >
        <circle
          cx={state.positionX + spaceLeft}
          cy={state.positionY}
          r={5}
          className={styles.circle}
        />
        <rect
          x={state.positionX + spaceLeft}
          y={spaceTop}
          width={2}
          height={chartHeight}
          className={styles.lineHover}
        />
        <rect
          x={state.positionX + spaceLeft + 5}
          y={state.positionY - 10}
          width={50}
          height={20}
          className={styles.graphLabel}
        />
        <text
          x={state.positionX + spaceLeft + 25}
          y={state.positionY}
          className={styles.labelHover}
          text-anchor="middle"
          alignment-baseline="central"
        >
          {state.value}
        </text>
      </g>
    )) || <></>
  );
}
