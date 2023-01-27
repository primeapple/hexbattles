import {type Component, For} from 'solid-js';
import type {Cell} from '../../types';
import {Hexagon} from './Hexagon';

type HexagonGridProps = {
	cells: Cell[][];
	radius: number;
};

const calculateCenterPoint = (xIndex: number, yIndex: number, radius: number) => {
	const inRadius = radius * (Math.sqrt(3) / 2);
	const halfSideLength = inRadius / Math.sqrt(3);
	const rowIndent = yIndex % 2 === 0 ? 0 : inRadius;
	return {
		x: rowIndent + inRadius + (xIndex * (inRadius * 2)),
		y: radius + (yIndex * (radius + halfSideLength)),
	};
};

// eslint-disable-next-line arrow-body-style
export const HexagonGrid: Component<HexagonGridProps> = ({cells, radius}) => {
	return (
		<For each={cells}>{(row, yIndex) =>
			<For each={row}>{(_cell, xIndex) =>
				<Hexagon centerPoint={calculateCenterPoint(xIndex(), yIndex(), radius)} radius={radius} />
			}</For>
		}</For>
	);
};
