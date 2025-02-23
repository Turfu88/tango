import { Tile } from '@/models/Tile.model';

export interface Board {
    id: number;
    grid: number;
    gameOver: boolean;
    history: number[];
    solution: number[];
    tiles: Tile[];
}
