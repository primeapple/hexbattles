import type {Component} from 'solid-js';
import {type Point} from '../../types';

type HexagonProps = {
	centerPoint: Point;
	radius: number;
};

const calculateHexagonPoints = (center: Point, radius: number) => {
	const points: Point[] = [];
	for (let i = 0; i < 6; i++) {
		const angle = (i * 60) / 180 * Math.PI;
		points.push({
			x: center.x + (radius * Math.sin(angle)),
			y: center.y + (radius * Math.cos(angle)),
		});
	}

	return points;
};

const buildPolygonString = (points: Point[]) => points.map(point => `${point.x},${point.y}`).join(' ');

export const Hexagon: Component<HexagonProps> = ({centerPoint, radius}) => {
	console.log(centerPoint, radius);
	const points = calculateHexagonPoints(centerPoint, radius);
	const pointsString = buildPolygonString(points);
	return (
		<polygon points={pointsString} style='fill:lime;stroke:purple;stroke-width:1' />
	);
};
