import { JSX, createContext, useContext } from 'solid-js';
import { createStore, produce } from 'solid-js/store';
import { Cell, Point, Strength, Terrain } from '../../types';

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

const diceRoll = () => Math.floor(Math.random() * 6) + 1;
    

type GameStateStore = {
    cells: Cell[][],
    selectedCellPoint?: Point,
}

type GameStateContextType = [GameStateStore, {
    getSelectedCell(): Cell | null;
    setSelectedCellPoint(point: Point): void;
    unsetSelectedCellPoint(): void;
    selectIsAttackable(point: Point): boolean;
    doAttack(point: Point): void;
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
        getSelectedCell() { return null; },
        setSelectedCellPoint() { return; },
        unsetSelectedCellPoint() { return; },
        selectIsAttackable() { return false; },
        doAttack() { return; }
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
            getSelectedCell() {
                if (!state.selectedCellPoint) return null;
                return state.cells[state.selectedCellPoint.y][state.selectedCellPoint.x];
            },
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
            },
            doAttack(attackedPoint: Point) {
                const selectedCellPoint = state.selectedCellPoint;
                if (!selectedCellPoint) return;

                const selectedCell = state.cells[selectedCellPoint.y][selectedCellPoint.x];
                if (!selectedCell.unit) return;

                const attackedCell = state.cells[attackedPoint.y][attackedPoint.x];
                if (!attackedCell.unit) {
                    const newAttackedStrength = selectedCell.unit.strength - 1 as Strength;
                    setState(
                        produce((state) => {
                            state.cells[selectedCellPoint.y][selectedCellPoint.x].unit!.strength = 1;
                            state.cells[attackedPoint.y][attackedPoint.x].unit = { player: selectedCell.unit!.player, strength: newAttackedStrength };
                        })
                    );
                    //  this should be done via `this.unsetSelectedCellPoint()`, how?
                    setState('selectedCellPoint', undefined);
                    return;
                }
                // TODO: attacking cells with enemy units within
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
