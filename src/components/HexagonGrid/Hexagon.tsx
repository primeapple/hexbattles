import classNames from 'classnames';
import {type Component, Show} from 'solid-js';
import {Terrain, type Point, type Unit} from '../../types';

type HexagonProps = {
	centerPoint: Point;
	radius: number;
	terrain: Terrain;
	isSelected: boolean;
	unit?: Unit;
};

const terrainColorMap = {
	[Terrain.Grass]: 'fill-grass',
	[Terrain.Water]: 'fill-water',
	[Terrain.Mountain]: 'fill-mountain',
	[Terrain.Sand]: 'fill-sand',
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

export const Hexagon: Component<HexagonProps> = ({centerPoint, radius, terrain, unit, isSelected}) => {
	const points = calculateHexagonPoints(centerPoint, radius);
	const pointsString = buildPolygonString(points);
	const terrainColor = terrainColorMap[terrain];
	const symbol = () => isSelected ? 'src/assets/sword.svg' : 'src/assets/shield.svg';
	const symbolUnfilled = () => isSelected ? 'src/assets/sword_unfilled.svg' : 'src/assets/shield_unfilled.svg';
	return (
		<>
			<polygon
				points={pointsString}
				class={classNames(terrainColor, 'stroke-black', 'stroke-1')}
			/>
			<Show when={unit}>
				<image
					x={centerPoint.x - (radius / 2)}
					y={centerPoint.y - (radius / 2)}
					width={radius}
					height={radius}
					class={'filter-grey'}
					href={symbol()}
				/>
				<image
					x={centerPoint.x - (radius / 2)}
					y={centerPoint.y - (radius / 2)}
					width={radius}
					height={radius}
					href={symbolUnfilled()}
				/>
				<text
					x={centerPoint.x - (radius / 10)}
					y={centerPoint.y + (radius / 1.3)}
					class={'font-semibold'}>
					{unit?.strength}
				</text>
			</Show>
		</>
	);
};
