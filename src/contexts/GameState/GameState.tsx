import { JSX, createContext, useContext } from 'solid-js';
import { createStore, produce } from 'solid-js/store';
import { Cell, DiceRoll, FightOutcome, FightResult, Point, RoundResult, Strength, Terrain, TerrainEffectKeys, TerrainEffectsOnAttacker, Unit } from '../../types';

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

export const diceRoll : () => DiceRoll = () => Math.floor(Math.random() * 6) + 1 as DiceRoll;

export const simulateRound = (terrain: TerrainEffectKeys): RoundResult => {
    const attackerRoll = diceRoll();
    const defenderRoll = diceRoll();
    const attackerModifier = TerrainEffectsOnAttacker[terrain];
    const attackerRollWithModifier = attackerRoll + attackerModifier;

    const outcome = (attackerRollWithModifier > defenderRoll)
        ? FightOutcome.ATTACKER_WIN
        : (attackerRollWithModifier < defenderRoll)
        ? FightOutcome.DEFENDER_WIN
        : FightOutcome.TIE;

    return {
        attackerRoll,
        defenderRoll,
        attackerModifier,
        outcome,
    };
}

export const simulateFight = (attacker: Unit, defender: Unit, terrain: TerrainEffectKeys): FightResult => {
    let attackerStrength = attacker.strength as number;
    let defenderStrength = defender.strength as number;
    const roundResults: RoundResult[] = [];

    while (attackerStrength > 1 && defenderStrength > 0) {
        const roundResult = simulateRound(terrain);
        switch (roundResult.outcome) {
            case FightOutcome.ATTACKER_WIN:
                defenderStrength--;
                break;
            case FightOutcome.DEFENDER_WIN:
                attackerStrength--;
                break;
            case FightOutcome.TIE:
                break;
        }
        roundResults.push(roundResult);
    }

    return {
        attacker: attacker.player,
        defender: defender.player,
        roundResults,
        outcome: defenderStrength === 0 ? FightOutcome.ATTACKER_WIN : FightOutcome.DEFENDER_WIN,
    }
}

type GameStateStore = {
    cells: Cell[][];
    selectedCellPoint: Point | null;
    lastFight: {
        result: FightResult | null;
        point : Point | null;
    }
};

type GameStateContextType = [
    GameStateStore,
    {
        getSelectedCell(): Cell | null;
        getLastFightResult(): FightResult | null;
        setSelectedCellPoint(point: Point): void;
        unsetSelectedCellPoint(): void;
        selectIsAttackable(point: Point): boolean;
        doAttack(point: Point): void;
    },
];

type GameStateProviderProps = {
    children: JSX.Element;
    cells: Cell[][];
};

const contextDefaults = [
    {
        cells: [[]] as Cell[][],
        selectedCellPoint: null,
        lastFight: {
            result: null,
            point: null,
        }
    },
    {
        getSelectedCell() {
            return null;
        },
        getLastFightResult() {
            return null;
        },
        setSelectedCellPoint() {
            return;
        },
        unsetSelectedCellPoint() {
            return;
        },
        selectIsAttackable() {
            return false;
        },
        doAttack() {
            return;
        },
    },
] as GameStateContextType;

const GameStateContext = createContext(contextDefaults);

export function GameStateProvider(props: GameStateProviderProps) {
    const [state, setState] = createStore<GameStateStore>({
        cells: props.cells,
        selectedCellPoint: null,
        lastFight: {
            result: null,
            point: null,
        }
    });

    const gameState: GameStateContextType = [
        state,
        {
            getSelectedCell() {
                if (!state.selectedCellPoint) return null;
                return state.cells[state.selectedCellPoint.y][state.selectedCellPoint.x];
            },
            getLastFightResult() {
                return state.lastFight.result;
            },
            setSelectedCellPoint(point: Point) {
                setState('selectedCellPoint', point);
            },
            unsetSelectedCellPoint() {
                setState('selectedCellPoint', null);
            },
            selectIsAttackable(point: Point) {
                if (!state.selectedCellPoint) return false;

                const cell = state.cells[point.y][point.x];
                if (cell.terrain === Terrain.Water) return false;

                const selectedCell = state.cells[state.selectedCellPoint.y][state.selectedCellPoint.x];
                if (selectedCell.unit?.player === cell.unit?.player) return false;
                return isNeighbour(state.selectedCellPoint, point);
            },
            doAttack(attackedPoint: Point) {
                const selectedCellPoint = state.selectedCellPoint;
                if (!selectedCellPoint) return;

                const selectedCellUnit = state.cells[selectedCellPoint.y][selectedCellPoint.x].unit;
                if (!selectedCellUnit) return;

                const attackedCell = state.cells[attackedPoint.y][attackedPoint.x];
                if (attackedCell.terrain === Terrain.Water) return;

                if (!attackedCell.unit) {
                    setState(
                        produce((state) => {
                            state.cells[selectedCellPoint.y][selectedCellPoint.x].unit = {
                                player: selectedCellUnit.player,
                                strength: 1,
                            };
                            state.cells[attackedPoint.y][attackedPoint.x].unit = {
                                player: selectedCellUnit.player,
                                strength: selectedCellUnit.strength - 1 as Strength,
                            };
                        }),
                    );
                    setState('selectedCellPoint', null);
                    return;
                }

                const fightResult = simulateFight(selectedCellUnit, attackedCell.unit, attackedCell.terrain);
                setState(
                    produce((state) => {
                        state.cells[selectedCellPoint.y][selectedCellPoint.x].unit = {
                            player: selectedCellUnit.player,
                            strength: 1,
                        };
                        state.cells[attackedPoint.y][attackedPoint.x].unit = {
                            player: selectedCellUnit.player,
                            strength: selectedCellUnit.strength - 1 as Strength,
                        };
                        state.selectedCellPoint = null;
                        state.lastFight = {
                            result: fightResult,
                            point: attackedPoint,
                        };
                    })
                );
            },
        },
    ];

    return <GameStateContext.Provider value={gameState}>{props.children}</GameStateContext.Provider>;
}

export function useGameState() {
    return useContext(GameStateContext);
}
