import { Tile } from '@/models/Tile.model';
import { VirtualMove } from '@/models/VirtualMove.model';

export type PatternFunction = (row: Tile[], dimension: 'h' | 'v') => VirtualMove | null;

export type PatternList = Record<string, PatternFunction>;
