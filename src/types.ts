export type Point = {
    x: number;
    y: number;
};

export enum Terrain {
    Water = 'water',
    Grass = 'grass',
    Sand = 'sand',
    Mountain = 'mountain',
}

export const TerrainEffectsOnAttacker = {
    [Terrain.Grass]: 0,
    [Terrain.Sand]: 1,
    [Terrain.Mountain]: -1,
} as const;
export type TerrainEffectKeys = keyof typeof TerrainEffectsOnAttacker;
export type TerrainEffectValues = (typeof TerrainEffectsOnAttacker)[TerrainEffectKeys];

export type Player = string;

export type Strength = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type Unit = {
    player: Player;
    strength: Strength;
};

export type Cell = {
    terrain: Terrain;
    unit?: Unit;
};

export type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6;

export enum FightOutcome {
    ATTACKER_WIN = 'attacker',
    DEFENDER_WIN = 'defender',
    TIE = 'tie',
}

export type RoundResult = {
    attackerRoll: DiceRoll;
    defenderRoll: DiceRoll;
    attackerModifier: TerrainEffectValues;
    outcome: FightOutcome;
};

export type Losses = Strength | 0;
export type FightResult = {
    attacker: {
        player: Player;
        losses: Losses;
    };
    defender: {
        player: Player;
        losses: Losses;
    };
    roundResults: RoundResult[];
    outcome: FightOutcome;
};
