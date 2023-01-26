import type { Component } from 'solid-js';
import { Point } from '../../types';
import { buildPolygonString, calculateHexagonPoints } from './utils';

type HexagonProps = {
    centerPoint: Point
    radius: number;
}

export const Hexagon: Component = () => {
    const points = calculateHexagonPoints({ x: 200, y: 200}, 100);
    const pointsString = buildPolygonString(points);
    return (
        <polygon points={pointsString} style="fill:lime;stroke:purple;stroke-width:1" />
    );
};
