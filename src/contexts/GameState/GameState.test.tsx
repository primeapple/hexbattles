import { Point, Terrain, TerrainEffectKeys, TerrainEffectValues } from '../../types';
import { isNeighbour, simulateRound, simulateFight, diceRoll } from './GameState';

describe('isNeighbour', () => {
    test('should return true if the points are on same y axis and x axis difference is 1', () => {
        const p1: Point = { x: 0, y: 0 };
        const p2: Point = { x: 1, y: 0 };
        expect(isNeighbour(p1, p2)).toBe(true);
        expect(isNeighbour(p2, p1)).toBe(true);
    });

    describe('y axis difference is 1 and the bottom row is indented', () => {
        test('should return true if the points are diagonal from top left to bottom right', () => {
            const p1: Point = { x: 0, y: 0 };
            const p2: Point = { x: 0, y: 1 };
            expect(isNeighbour(p1, p2)).toBe(true);
            expect(isNeighbour(p2, p1)).toBe(true);
        });

        test('should return true if the points are diagonal from top right to bottom left', () => {
            const p1: Point = { x: 1, y: 0 };
            const p2: Point = { x: 0, y: 1 };
            expect(isNeighbour(p1, p2)).toBe(true);
            expect(isNeighbour(p2, p1)).toBe(true);
        });
    });

    describe('y axis difference is 1 and the top row is indented', () => {
        test('should return true if the points are diagonal from top left to bottom right', () => {
            const p1: Point = { x: 0, y: 1 };
            const p2: Point = { x: 1, y: 2 };
            expect(isNeighbour(p1, p2)).toBe(true);
            expect(isNeighbour(p2, p1)).toBe(true);
        });

        test('should return true if the points are diagonal from top right to bottom left', () => {
            const p1: Point = { x: 0, y: 1 };
            const p2: Point = { x: 0, y: 2 };
            expect(isNeighbour(p1, p2)).toBe(true);
            expect(isNeighbour(p2, p1)).toBe(true);
        });
    });
});

describe('simulateRound', () => {
    test.each([
        [Terrain.Sand as TerrainEffectKeys, 1],
        [Terrain.Grass as TerrainEffectKeys, 0],
        [Terrain.Mountain as TerrainEffectKeys, -1],
    ])('should return correct attacker modifier', (terrain: TerrainEffectKeys, modifier) => {
        expect(simulateRound(terrain)).toHaveProperty('attackerModifier', modifier);
    });
});
