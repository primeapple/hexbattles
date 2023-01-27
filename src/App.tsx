import type {Component} from 'solid-js';
import {HexagonGrid} from './components/HexagonGrid/HexagonGrid';
import {CellType} from './types';
import type {Cell} from './types';

const sampleCells: Cell[][] = [
	[{type: CellType.Grass}, {type: CellType.Grass}, {type: CellType.Grass}, {type: CellType.Grass}, {type: CellType.Grass}, {type: CellType.Grass}, {type: CellType.Grass}],
	[{type: CellType.Grass}, {type: CellType.Grass}, {type: CellType.Grass}, {type: CellType.Grass}, {type: CellType.Grass}, {type: CellType.Grass}],
	[{type: CellType.Grass}, {type: CellType.Grass}, {type: CellType.Grass}, {type: CellType.Grass}, {type: CellType.Grass}, {type: CellType.Grass}, {type: CellType.Grass}],
	[{type: CellType.Grass}, {type: CellType.Grass}, {type: CellType.Grass}, {type: CellType.Grass}, {type: CellType.Grass}, {type: CellType.Grass}],
	[{type: CellType.Grass}, {type: CellType.Grass}, {type: CellType.Grass}, {type: CellType.Grass}, {type: CellType.Grass}, {type: CellType.Grass}, {type: CellType.Grass}],
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
