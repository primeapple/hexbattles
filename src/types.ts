export type Point = {
	x: number;
	y: number;
};

export enum CellType {
	Water = 'water',
	Grass = 'grass',
	Sand = 'sand',
	Mountain = 'mountain',
}

export type Player = {
	name: string;
	color: string;
	bot: boolean;
};

export type Strength = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type Cell = {
	type: CellType;
	player?: Player;
	strength?: Strength;
};
