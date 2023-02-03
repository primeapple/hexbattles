import {type Component, For} from 'solid-js';
import type {Cell} from '../../types';
import {Hexagon} from './Hexagon';

type HexagonGridProps = {
	cells: Cell[][];
	radius: number;
};

const calculateInradius = (radius: number) => Math.round(radius * (Math.sqrt(3) / 2));

const calculateSideLength = (radius: number) => Math.round(2 * calculateInradius(radius) / Math.sqrt(3));

const calculateCenterPoint = (xIndex: number, yIndex: number, radius: number) => {
	const inRadius = calculateInradius(radius);
	const halfSideLength = calculateSideLength(radius) / 2;
	const rowIndent = yIndex % 2 === 0 ? 0 : inRadius;
	return {
		x: rowIndent + inRadius + (xIndex * (inRadius * 2)),
		y: radius + (yIndex * (radius + halfSideLength)),
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

export const HexagonGrid: Component<HexagonGridProps> = ({cells, radius}) => {
	const width = calculateSvgWidth(cells[0].length, radius);
	const height = calculateSvgHeight(cells.length, radius);
	return (
		<svg width={width} height={height}>
			<For each={cells}>{(row, yIndex) =>
				<For each={row}>{(cell, xIndex) =>
					<Hexagon centerPoint={calculateCenterPoint(xIndex(), yIndex(), radius)} radius={radius} terrain={cell.terrain} unit={cell.unit} isSelected={false}/>
				}</For>
			}</For>
		</svg>
	);
};
