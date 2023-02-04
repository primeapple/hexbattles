export type Point = {
    x: number
    y: number
}

export enum Terrain {
    Water = 'water',
    Grass = 'grass',
    Sand = 'sand',
    Mountain = 'mountain',
}

export type Player = string

export type Strength = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

export type Unit = {
    player: Player
    strength: Strength
}

export type Cell = {
    terrain: Terrain
    unit?: Unit
}
