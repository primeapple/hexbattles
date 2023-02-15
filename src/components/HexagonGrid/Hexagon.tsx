import classNames from 'classnames';
import { type Component, Show, Match } from 'solid-js';
import { Terrain, type Point, type Unit } from '../../types';

interface HexagonProps {
    centerPoint: Point
    radius: number
    terrain: Terrain
    isSelected: boolean
    onclick: () => void
    unit?: Unit
}

const terrainColorMap = {
    [Terrain.Grass]: 'fill-grass',
    [Terrain.Water]: 'fill-water',
    [Terrain.Mountain]: 'fill-mountain',
    [Terrain.Sand]: 'fill-sand'
};

const calculateHexagonPoints = (center: Point, radius: number) => {
    const points: Point[] = [];
    for (let i = 0; i < 6; i++) {
        const angle = (i * 60) / 180 * Math.PI;
        points.push({
            x: Math.round(center.x + (radius * Math.sin(angle))),
            y: Math.round(center.y + (radius * Math.cos(angle)))
        });
    }

    return points;
};

const buildPolygonString = (points: Point[]) => points.map(point => `${point.x},${point.y}`).join(' ');

export const Hexagon: Component<HexagonProps> = props => {
    const pointsString = () => {
        const points = calculateHexagonPoints(props.centerPoint, props.radius);
        return buildPolygonString(points);
    };

    const terrainColor = () => terrainColorMap[props.terrain];
    const symbol = () => props.isSelected ? 'src/assets/sword.svg' : 'src/assets/shield.svg';
    const symbolUnfilled = () => props.isSelected ? 'src/assets/sword_unfilled.svg' : 'src/assets/shield_unfilled.svg';
    return (
        <g class={classNames({ 'cursor-pointer': true })} onclick={props.onclick}>
            <Show when={props.isSelected}>
                <defs>
                    <clipPath id="selected-hexagon-clip-path">
                        <polygon points={pointsString()} />
                    </clipPath>
                </defs>
            </Show>
            <polygon
                points={pointsString()}
                class={classNames(terrainColor(), 'stroke-black', props.isSelected ? 'stroke-[6]' : 'stroke-0', {'clipped-hexagon': props.isSelected})}
            />
            <Show when={props.unit}>
                <image
                    x={props.centerPoint.x - (props.radius / 2)}
                    y={props.centerPoint.y - (props.radius / 2)}
                    width={props.radius}
                    height={props.radius}
                    class="filter-grey"
                    href={symbol()}
                />
                <image
                    x={props.centerPoint.x - (props.radius / 2)}
                    y={props.centerPoint.y - (props.radius / 2)}
                    width={props.radius}
                    height={props.radius}
                    href={symbolUnfilled()}
                />
                <text
                    x={props.centerPoint.x - (props.radius / 10)}
                    y={props.centerPoint.y + (props.radius / 1.3)}
                    class="font-semibold">
                    {props.unit?.strength}
                </text>
            </Show>
        </g>
    );
};
