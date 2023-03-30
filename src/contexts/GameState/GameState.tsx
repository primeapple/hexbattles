import { JSX, createContext, useContext } from 'solid-js';
import { createStore } from 'solid-js/store';
import { Cell, Point, Terrain } from '../../types';

export const isNeighbour = (p1: Point, p2: Point) => {
    // neighbour in row 
    if (p1.y === p2.y && Math.abs(p1.x - p2.x) === 1) return true;

    // neighbour in column
    if (p1.x === p2.x && Math.abs(p1.y - p2.y) === 1) return true;

    // p1 in row below p2
    if (p1.y - p2.y === 1) {
        // row of p1 is indented
        if (p1.y % 2 === 1) {
            // p2 is exactly top right of p1
            return p2.x - p1.x === 1;
        }
        // row of p1 is not indented
        else {
            // p2 is exactly top left of p1
            return p1.x - p2.x === 1;
        }
    }

    // p1 in row over p2
    if (p2.y - p1.y === 1) {
        // row of p1 is indented
        if (p1.y % 2 === 1) {
            // p2 is exactly bottom right of p1
            return p2.x - p1.x === 1;
        }
        // row of p1 is not indented
        else {
            // p2 is exactly bottom left of p1
            return p1.x - p2.x === 1;
        }
    }

    return false;
};
    

type GameStateStore = {
    cells: Cell[][],
    selectedCellPoint?: Point,
}

type GameStateContextType = [GameStateStore, {
    setSelectedCellPoint(point: Point): void;
    unsetSelectedCellPoint(): void;
    selectIsAttackable(point: Point): boolean;
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
        unsetSelectedCellPoint() { return; },
        selectIsAttackable() { return false; }
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
            },
            selectIsAttackable(point: Point) {
                if (!state.selectedCellPoint) return false;
                const cell = state.cells[point.y][point.x];
                if (cell.terrain === Terrain.Water) return false;
                const selectedCell = state.cells[state.selectedCellPoint.y][state.selectedCellPoint.x];
                if (selectedCell.unit === cell.unit) return false;
                return isNeighbour(state.selectedCellPoint, point);
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
