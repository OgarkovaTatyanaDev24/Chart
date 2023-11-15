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
      <g>
        <circle
          cx={state.positionX + spaceLeft}
          cy={state.positionY}
          r={5}
          className={styles.circle}
        />
        <rect
          x={state.positionX + spaceLeft}
          y={spaceTop}
          height={chartHeight}
          className={styles.lineHover}
        />
        <rect
          x={state.positionX + spaceLeft + 5}
          y={state.positionY - 10}
          className={styles.graphLabel}
        />
        <text
          x={state.positionX + spaceLeft + 30}
          y={state.positionY}
          className={styles.labelText}
        >
          {state.value}
        </text>
      </g>
    )) || <></>
  );
}
