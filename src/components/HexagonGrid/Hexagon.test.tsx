import {render, screen} from 'solid-testing-library';
import {Hexagon} from './Hexagon';
import {Terrain} from '../../types';

describe('Hexagon', () => {
	it('should have the correct color', () => {
		render(() => <svg><Hexagon centerPoint={{x: 50, y: 50}} radius={20} terrain={Terrain.Grass}/></svg>);
		screen.debug();
	});
});
