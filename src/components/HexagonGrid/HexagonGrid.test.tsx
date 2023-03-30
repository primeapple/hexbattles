import { render } from 'solid-testing-library';
import { HexagonGrid } from './HexagonGrid';
import { Terrain } from '../../types';
import { GameStateProvider } from '../../contexts/GameState';

describe('HexagonGrid', () => {
    const cells = [
        [{ terrain: Terrain.Water }, { terrain: Terrain.Water }, { terrain: Terrain.Sand }],
        [{ terrain: Terrain.Water }, { terrain: Terrain.Water }]
    ];

    it.each([
        [10, '54', '30'],
        [50, '258', '150'],
        [100, '522', '300']
    ])('should calculate the correct width and height for the svg', (radius, width, height) => {
        const { container, unmount } = render(() => (
            <GameStateProvider cells={cells}>
                <HexagonGrid radius={radius} />
            </GameStateProvider>
        ));
        const hexagonGrid = container.firstChild;
        expect(hexagonGrid).toHaveAttribute('width', width);
        expect(hexagonGrid).toHaveAttribute('height', height);
        unmount();
    });
});
