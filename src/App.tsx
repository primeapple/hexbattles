import type {Component} from 'solid-js';
import {HexagonGrid} from './components/HexagonGrid/HexagonGrid';
import {Terrain} from './types';
import type {Cell} from './types';

const sampleCells: Cell[][] = [
	[{terrain: Terrain.Water}, {terrain: Terrain.Water}, {terrain: Terrain.Sand}, {terrain: Terrain.Grass}, {terrain: Terrain.Grass}, {terrain: Terrain.Sand}, {terrain: Terrain.Mountain}],
	[{terrain: Terrain.Water}, {terrain: Terrain.Water}, {terrain: Terrain.Grass}, {terrain: Terrain.Sand}, {terrain: Terrain.Sand}, {terrain: Terrain.Mountain}],
	[{terrain: Terrain.Grass}, {terrain: Terrain.Grass}, {terrain: Terrain.Grass}, {terrain: Terrain.Grass}, {terrain: Terrain.Grass}, {terrain: Terrain.Grass}, {terrain: Terrain.Water}],
	[{terrain: Terrain.Sand}, {terrain: Terrain.Sand}, {terrain: Terrain.Grass}, {terrain: Terrain.Grass}, {terrain: Terrain.Water}, {terrain: Terrain.Water}],
	[{terrain: Terrain.Sand}, {terrain: Terrain.Sand}, {terrain: Terrain.Grass}, {terrain: Terrain.Grass}, {terrain: Terrain.Grass}, {terrain: Terrain.Grass}, {terrain: Terrain.Water}],
];

const App: Component = () => (
	<div>
        My Hexbattles Game
		<svg width='1000' height='500'>
			<HexagonGrid cells={sampleCells} radius={50} />
		</svg>
	</div>
);

export default App;
