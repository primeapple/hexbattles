import {type Point} from '../../types';

export const calculateHexagonPoints = (center: Point, radius: number) => {
	const points: Point[] = [];
	for (let i = 0; i < 6; i++) {
		const angle = (i * 60) / 180 * Math.PI;
		points.push({
			x: center.x + (radius * Math.cos(angle)),
			y: center.y + (radius * Math.sin(angle)),
		});
	}

	return points;
};

export const buildPolygonString = (points: Point[]) => points.map(point => `${point.x},${point.y}`).join(' ');
