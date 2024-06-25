import { render } from 'solid-testing-library';
import { Terrain } from '../../types';
import { Hexagon } from './Hexagon';

describe('Hexagon', () => {
    it.each([
        [Terrain.Grass, 'fill-grass'],
        [Terrain.Water, 'fill-water'],
        [Terrain.Mountain, 'fill-mountain'],
        [Terrain.Sand, 'fill-sand'],
    ])('should have the correct color', (terrain: Terrain, fillClass: string) => {
        const { container, unmount } = render(() => (
            <svg>
                <Hexagon
                    centerPoint={{ x: 50, y: 50 }}
                    radius={20}
                    terrain={terrain}
                    isSelected={false}
                    isAttackable={false}
                />
            </svg>
        ));
        const hexagon = container.querySelector('polygon');
        expect(hexagon).toHaveClass(fillClass);
        unmount();
    });

    it.each([
        [50, 50, 20, '50,70 67,60 67,40 50,30 33,40 33,60'],
        [50, 50, 10, '50,60 59,55 59,45 50,40 41,45 41,55'],
        [100, 200, 20, '100,220 117,210 117,190 100,180 83,190 83,210'],
        [100, 200, 100, '100,300 187,250 187,150 100,100 13,150 13,250'],
    ])('should have the correct polygon points', (x: number, y: number, radius: number, points: string) => {
        const { container, unmount } = render(() => (
            <svg>
                <Hexagon
                    centerPoint={{ x, y }}
                    radius={radius}
                    terrain={Terrain.Grass}
                    isSelected={false}
                    isAttackable={false}
                />
            </svg>
        ));
        const hexagon = container.querySelector('polygon');
        expect(hexagon).toHaveAttribute('points', points);
        unmount();
    });

    it('should should be darker if `isAttackable` is true', () => {
        const { container, unmount } = render(() => (
            <svg>
                <Hexagon
                    centerPoint={{ x: 50, y: 50 }}
                    radius={20}
                    terrain={Terrain.Grass}
                    isSelected={false}
                    isAttackable={true}
                />
            </svg>
        ));
        const hexagon = container.querySelector('polygon');
        expect(hexagon).toHaveClass('brightness-50');
    });
});
