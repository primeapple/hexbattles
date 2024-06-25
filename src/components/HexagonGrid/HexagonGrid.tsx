import { type Component, For } from 'solid-js';
import { useGameState } from '../../contexts/GameState';
import { type Cell, Terrain } from '../../types';
import { Hexagon } from './Hexagon';

type HexagonGridProps = {
    radius: number;
};

const calculateInradius = (radius: number) => Math.round(radius * (Math.sqrt(3) / 2));

const calculateSideLength = (radius: number) => Math.round((2 * calculateInradius(radius)) / Math.sqrt(3));

const calculateCenterPoint = (xIndex: number, yIndex: number, radius: number) => {
    const inRadius = calculateInradius(radius);
    const halfSideLength = calculateSideLength(radius) / 2;
    const rowIndent = yIndex % 2 === 0 ? 0 : inRadius;
    return {
        x: rowIndent + inRadius + xIndex * (inRadius * 2),
        y: radius + yIndex * (radius + halfSideLength),
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
    return indentedRowCount * sideLength + unindentedRowCount * radius * 2;
};

export const HexagonGrid: Component<HexagonGridProps> = (props) => {
    const [state, { getSelectedCell, setSelectedCellPoint, unsetSelectedCellPoint, selectIsAttackable, doAttack }] =
        useGameState();
    const width = () => calculateSvgWidth(state.cells[0].length, props.radius);
    const height = () => calculateSvgHeight(state.cells.length, props.radius);

    const isSelectedCell = (x: number, y: number) =>
        state.selectedCellPoint?.x === x && state.selectedCellPoint?.y === y;

    const isHexagonDisabled = (cell: Cell) => {
        const selectedCell = getSelectedCell();
        return (
            cell.unit?.strength === 1 ||
            cell.unit?.player === selectedCell?.unit?.player ||
            cell.terrain === Terrain.Water
        );
    };

    const handleOnclick = (x: number, y: number) => {
        const selectedCell = getSelectedCell();

        if (!selectedCell) {
            setSelectedCellPoint({ x, y });
            return;
        }

        if (!selectIsAttackable({ x, y })) {
            return;
        }

        if (isSelectedCell(x, y)) {
            unsetSelectedCellPoint();
            return;
        }

        doAttack({ x, y });
    };

    return (
        <svg width={width()} height={height()}>
            <title>Hexagon Grid</title>
            <For each={state.cells}>
                {(row, yIndex) => (
                    <For each={row}>
                        {(cell, xIndex) => (
                            <Hexagon
                                centerPoint={calculateCenterPoint(xIndex(), yIndex(), props.radius)}
                                radius={props.radius}
                                terrain={cell.terrain}
                                unit={cell.unit}
                                isSelected={isSelectedCell(xIndex(), yIndex())}
                                isAttackable={selectIsAttackable({ x: xIndex(), y: yIndex() })}
                                isDisabled={isHexagonDisabled(cell)}
                                onclick={() => handleOnclick(xIndex(), yIndex())}
                            />
                        )}
                    </For>
                )}
            </For>
        </svg>
    );
};
