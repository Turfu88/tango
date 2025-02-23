import { Tile as TileType } from '@/types/Tile.model';

export const errorHelper = {
    getErrorsFrom3SymbolsRule(splitTilesGrid: TileType[][]): number[] {
        const patterns = [[1, 1, 1], [2, 2, 2]];
        const wrongTiles: number[] = [];
        
        splitTilesGrid.forEach((row: TileType[]) => {
            for (let i = 0; i < row.length - 2; i++) {
                const rowSlice = row.slice(i, i + 3).map((tile) => tile.value);
                if (patterns.some(p => JSON.stringify(p) === JSON.stringify(rowSlice))) {
                    wrongTiles.push(row[i].id);
                    wrongTiles.push(row[i + 1].id);
                    wrongTiles.push(row[i + 2].id);
                }
            }
        })

        return [...new Set(wrongTiles)];
    },
    getErrorsFromPairedSymbolsRule(splitTilesGrid: TileType[][], grid: number): number[] {
        const wrongTiles: number[] = [];
        splitTilesGrid.forEach((row: TileType[]) => {
            row.forEach((tile: TileType, index: number) => {
                if (
                    this.horizontalFollowingTileIsEqual(tile, row, index) ||
                    this.verticalFollowingTileIsEqual(tile, row, index, grid) ||
                    this.horizontalFollowingTileIsReversed(tile, row, index) ||
                    this.verticalFollowingTileIsReversed(tile, row, index, grid)
                ) {
                    wrongTiles.push(tile.id);
                    wrongTiles.push(row[index + 1].id);
                }
            })
        })

        return [...new Set(wrongTiles)];
    },
    getErrorsFromEqualityRule(splitTilesGrid: TileType[][]): number[] {
        const wrongTiles: number[] = [];
        splitTilesGrid.forEach((row: TileType[]) => {
            if (this.rowIsCompleted(row) && this.rowSymbolsCountAreNotEqual(row)) {
                row.forEach((tile: TileType) => {
                    wrongTiles.push(tile.id);  
                })
            }
        })
        return [...new Set(wrongTiles)];
    },
    rowIsCompleted(row: TileType[]): boolean {
        return row.every((tile: TileType) => tile.value !== 0);
    },
    rowSymbolsCountAreNotEqual(row: TileType[]): boolean {
        return row.filter((tile: TileType) => tile.value === 1).length !== row.filter((tile: TileType) => tile.value === 2).length;
    },
    horizontalFollowingTileIsEqual(tile: TileType, row: TileType[], index: number) {
        return tile.horizontalConstraint === 'equal' &&
        tile.value !== 0 &&
        row[index + 1]?.value !== 0 &&
        tile.value !== row[index + 1]?.value &&
        tile.id + 1 === row[index + 1]?.id;
    },
    verticalFollowingTileIsEqual(tile: TileType, row: TileType[], index: number, grid: number) {
        return tile.verticalConstraint === 'equal' &&
        tile.value !== 0 &&
        row[index + 1]?.value !== 0 &&
        tile.value !== row[index + 1]?.value &&
        tile.id + grid === row[index + 1]?.id;
    },
    horizontalFollowingTileIsReversed(tile: TileType, row: TileType[], index: number) {
        return tile.horizontalConstraint === 'reversed' &&
        tile.value !== 0 &&
        row[index + 1]?.value !== 0 &&
        tile.value === row[index + 1]?.value &&
        tile.id + 1 === row[index + 1]?.id;
    },
    verticalFollowingTileIsReversed(tile: TileType, row: TileType[], index: number, grid: number) {
        return tile.verticalConstraint === 'reversed' &&
        tile.value !== 0 &&
        row[index + 1]?.value !== 0 &&
        tile.value === row[index + 1]?.value &&
        tile.id + grid === row[index + 1]?.id;
    }
};
