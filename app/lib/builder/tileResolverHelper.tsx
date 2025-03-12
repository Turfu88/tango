
import { Tile } from "@/types/Tile.model";
import { patterns_4x4 } from '@/lib/builder/patterns_4x4';
import { VirtualMove } from "@/types/VirtualMove.model";
import { patterns_6x6 } from '@/lib/builder/patterns_6x6';
import { patterns_8x8 } from '@/lib/builder/patterns_8x8';

export const TileResolver = {

    resolveTilesValues(tiles: Tile[], grid: number, history: VirtualMove[]): [Tile[], VirtualMove[]] {
        let patternsToTry = patterns_4x4;
        if (grid === 8) {
            patternsToTry = patterns_8x8;
        }
        if (grid === 6) {
            patternsToTry = patterns_6x6;
        }

        const processGrid = () => {
            let foundSolution = false;
            const splitTilesGrid = this.getSplitTilesGrid(tiles, grid);

            for (const row of splitTilesGrid) {
                const dimension = splitTilesGrid.indexOf(row) < splitTilesGrid.length / 2 ? 'h' : 'v';
                for (const [, pattern] of Object.entries(patternsToTry)) {
                    if (typeof pattern === 'function') {
                        const solution = pattern(row, dimension);
                        if (solution !== null) {
                            history.push(solution);
                            tiles = tiles.map((tile) => {
                                if (tile.id === solution.tileId) {
                                    tile.value = solution.value;
                                    tile.isResolved = true;
                                }
                                return tile;
                            })
                          
                            foundSolution = true;
                            break;
                        }
                    } else {
                        console.error("pattern n'est pas une fonction");
                    }
                }

                if (foundSolution) break;
            }

            if (foundSolution) processGrid();
        };
        processGrid();

        return [tiles, history];
    },
    getSplitTilesGrid(tiles: Tile[], grid: number): Tile[][] {
        let rows = [];

        for (let i = 0; i < tiles.length; i += grid) {
            rows.push(tiles.slice(i, i + grid));
        }

        const columns: Tile[][] = Array.from({ length: grid }, () => [] as Tile[]);

        for (let i = 0; i < tiles.length; i++) {
            const columnIndex = i % grid;
            columns[columnIndex].push(tiles[i]);
        }

        return [...rows, ...columns];
    },
    getOpositeTileValue(tile: Tile): number {
        if (tile.value === 1) return 2;
        if (tile.value === 2) return 1;
        return 0;
    },
};
