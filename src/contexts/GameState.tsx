import { JSX, createContext, useContext } from 'solid-js';
import { createStore } from 'solid-js/store';
import { Cell, Point } from '~/types';

type GameStateStore = {
    cells: Cell[][],
    selectedCellPoint?: Point,
}

type GameStateContextType = [GameStateStore, {
    setSelectedCellPoint(point: Point): void;
    unsetSelectedCellPoint(): void;
}];

type GameStateProviderProps = {
    children: JSX.Element,
    cells: Cell[][],
}

const contextDefaults = [
    {
        cells: [[]] as Cell[][],
    },
    {
        setSelectedCellPoint() { return; },
        unsetSelectedCellPoint() { return; }
    }
] as GameStateContextType;

const GameStateContext = createContext(contextDefaults);

export function GameStateProvider(props: GameStateProviderProps) {
    const [state, setState] = createStore<GameStateStore>({
        cells: props.cells
    });
    const gameState: GameStateContextType = [
        state,
        {
            setSelectedCellPoint(point: Point) {
                setState('selectedCellPoint', point);
            },
            unsetSelectedCellPoint() {
                setState('selectedCellPoint', undefined);
            }
        }
    ];

    return (
        <GameStateContext.Provider value={gameState}>
            {props.children}
        </GameStateContext.Provider>
    );
}

export function useGameState() { return useContext(GameStateContext); }
