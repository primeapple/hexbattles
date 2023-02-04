import { type Component, For, createSignal } from 'solid-js';
import type { Cell, Point } from '../../types';
import { Hexagon } from './Hexagon';

type HexagonGridProps = {
    cells: Cell[][]
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
    const [selectedCellPoint, setSelectedCellPoint] = createSignal<Point | null>(null);
    const width = () => calculateSvgWidth(props.cells[0].length, props.radius);
    const height = () => calculateSvgHeight(props.cells.length, props.radius);
    return (
        <svg width={width()} height={height()}>
            <For each={props.cells}>{(row, yIndex) =>
                <For each={row}>{(cell, xIndex) =>
                    <Hexagon
                        centerPoint={calculateCenterPoint(xIndex(), yIndex(), props.radius)}
                        radius={props.radius}
                        terrain={cell.terrain}
                        unit={cell.unit}
                        isSelected={selectedCellPoint()?.x === xIndex() && selectedCellPoint()?.y === yIndex()}
                        onclick={() => setSelectedCellPoint({ x: xIndex(), y: yIndex()})}
                    />
                }</For>
            }</For>
        </svg>
    );
};
