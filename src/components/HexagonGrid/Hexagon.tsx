import classNames from 'classnames';
import type {Component} from 'solid-js';
import {Terrain, type Point} from '../../types';

type HexagonProps = {
	centerPoint: Point;
	radius: number;
	terrain: Terrain;
};

const terrainColorMap = {
	[Terrain.Grass]: 'fill-green-500',
	[Terrain.Water]: 'fill-blue-500',
	[Terrain.Mountain]: 'fill-gray-500',
	[Terrain.Sand]: 'fill-yellow-500',
};

const calculateHexagonPoints = (center: Point, radius: number) => {
	const points: Point[] = [];
	for (let i = 0; i < 6; i++) {
		const angle = (i * 60) / 180 * Math.PI;
		points.push({
			x: Math.round(center.x + (radius * Math.sin(angle))),
			y: Math.round(center.y + (radius * Math.cos(angle))),
		});
	}

	return points;
};

const buildPolygonString = (points: Point[]) => points.map(point => `${point.x},${point.y}`).join(' ');

export const Hexagon: Component<HexagonProps> = ({centerPoint, radius, terrain}) => {
	const points = calculateHexagonPoints(centerPoint, radius);
	const pointsString = buildPolygonString(points);
	const terrainColor = terrainColorMap[terrain];
	return (
		<polygon points={pointsString} class={classNames(terrainColor, 'stroke-black', 'stroke-1')} />
	);
};
