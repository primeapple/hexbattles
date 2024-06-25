import type { Component } from 'solid-js';
import { FightResults } from './components/FightResults/FightResults';
import { HexagonGrid } from './components/HexagonGrid/HexagonGrid';
import { GameStateProvider } from './contexts/GameState';
import { Player, Terrain } from './types';
import type { Cell } from './types';

const sampleCells: Cell[][] = [
    [
        { terrain: Terrain.Water },
        { terrain: Terrain.Water },
        { terrain: Terrain.Sand },
        { terrain: Terrain.Grass, unit: { player: Player.Human, strength: 8 } },
        { terrain: Terrain.Grass },
        { terrain: Terrain.Sand },
        { terrain: Terrain.Mountain },
    ],
    [
        { terrain: Terrain.Water },
        { terrain: Terrain.Water },
        { terrain: Terrain.Grass, unit: { player: Player.Bot, strength: 4 } },
        { terrain: Terrain.Sand },
        { terrain: Terrain.Sand },
        { terrain: Terrain.Mountain },
    ],
    [
        { terrain: Terrain.Grass },
        { terrain: Terrain.Grass },
        { terrain: Terrain.Grass },
        { terrain: Terrain.Grass },
        { terrain: Terrain.Grass },
        { terrain: Terrain.Grass },
        { terrain: Terrain.Water },
    ],
    [
        { terrain: Terrain.Sand },
        { terrain: Terrain.Sand },
        { terrain: Terrain.Grass },
        { terrain: Terrain.Grass },
        { terrain: Terrain.Water },
        { terrain: Terrain.Water },
    ],
    [
        { terrain: Terrain.Sand },
        { terrain: Terrain.Sand },
        { terrain: Terrain.Grass },
        { terrain: Terrain.Grass },
        { terrain: Terrain.Grass },
        { terrain: Terrain.Grass },
        { terrain: Terrain.Water },
    ],
];

const App: Component = () => (
    <div class="flex flex-col gap-y-12 justify-center">
        <header class="text-center">My Hexbattles Game</header>
        <div class="flex flex-col gap-y-12">
            <GameStateProvider cells={sampleCells}>
                <div class="flex justify-center">
                    <HexagonGrid radius={50} />
                </div>
                <div class="flex justify-center">
                    <FightResults />
                </div>
            </GameStateProvider>
        </div>
    </div>
);

export default App;
