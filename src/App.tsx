import type {Component} from 'solid-js';
import {Hexagon} from './components/Hexagon';

const App: Component = () => (
	<div>
        My app
		<svg width='500' height='500'>
            // <Hexagon centerPoint={{x: 200, y: 200}} radius={100} />
			<Hexagon />
		</svg>
	</div>
);

export default App;
