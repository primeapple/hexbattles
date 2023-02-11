import { type Component, For, Show } from 'solid-js';
import { useGameState } from '../../contexts';
import { Hexagon } from './Hexagon';

type HexagonGridProps = {
    radius: number
}

const calculateInradius = (radius: number) => Math.round(radius * (Math.sqrt(3) / 2));

const calculateSideLength = (radius: number) => Math.round(2 * calculateInradius(radius) / Math.sqrt(3));

const calculateCenterPoint = (xIndex: number, yIndex: number, radius: number) => {
    const inRadius = calculateInradius(radius);
    const halfSideLength = calculateSideLength(radius) / 2;
    const rowIndent = yIndex % 2 === 0 ? 0 : inRadius;
    return {
        x: rowIndent + inRadius + (xIndex * (inRadius * 2)),
        y: radius + (yIndex * (radius + halfSideLength))
    };
};

const calculateSvgWidth = (columnCount: number, radius: number) => {
    const inRadius = calculateInradius(radius);
    return 2 * inRadius * columnCount;
};

const calculateSvgHeight = (rowCount: number, radius: number) => {
    const sideLength = calculateSideLength(radius);
    const indentedRowCount = Math.floor(rowCount / 2);
    const unindentedRowCount = rowCount - indentedRowCount;
    return (indentedRowCount * sideLength) + (unindentedRowCount * radius * 2);
};

export const HexagonGrid: Component<HexagonGridProps> = props => {
    const [state, { setSelectedCellPoint, unsetSelectedCellPoint }] = useGameState();
    const width = () => calculateSvgWidth(state.cells[0].length, props.radius);
    const height = () => calculateSvgHeight(state.cells.length, props.radius);
    return (
        <svg width={width()} height={height()}>
            <For each={state.cells}>{(row, yIndex) =>
                <For each={row}>{(cell, xIndex) =>
                    <Show when={state.selectedCellPoint?.x !== xIndex() || state.selectedCellPoint?.y !== yIndex()}> 
                        <Hexagon
                            centerPoint={calculateCenterPoint(xIndex(), yIndex(), props.radius)}
                            radius={props.radius}
                            terrain={cell.terrain}
                            unit={cell.unit}
                            isSelected={false}
                            onclick={() => setSelectedCellPoint({ x: xIndex(), y: yIndex()})}
                        />
                    </Show>
                }</For>
            }</For>
            <Show when={state.selectedCellPoint} keyed>
                {(point) => {
                    const cell = () => state.cells[point.y][point.x];
                    return <Hexagon
                        centerPoint={calculateCenterPoint(point.x, point.y, props.radius)}
                        radius={props.radius}
                        terrain={cell().terrain}
                        unit={cell()?.unit}
                        isSelected={true}
                        onclick={() => unsetSelectedCellPoint()}
                    />;
                }}
            </Show>
        </svg>
    );
};
