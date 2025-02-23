import { Tile } from '@/models/Tile.model';
import { VirtualMove } from '@/models/VirtualMove.model';

export interface BoardBuilder {
    grid: number;
    selectedRestriction: string | null;
    virtualHistory: VirtualMove[];
    isSolvable: boolean;
    isUnique: boolean | null;
    tiles: Tile[];
    virtualTiles: Tile[];
}
