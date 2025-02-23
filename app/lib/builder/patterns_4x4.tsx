import { Tile } from "@/types/Tile.model"
import { TileResolver } from '@/lib/builder/tileResolverHelper';
import { VirtualMove } from "@/types/VirtualMove.model";
import { PatternList } from "@/types/PatternList.model";

export const patterns_4x4: PatternList = {
    // [ · | X | X | · ]
    twoAsides(row: Tile[], dimension: 'h' | 'v'): VirtualMove | null {
        const methodUsed = 'twoAsides';
        const methodComplexity = 'E'; // Easy

        function findSolution(rowToCheck: Tile[]): VirtualMove | null {
            for (let index = 0; index < rowToCheck.length - 2; index++) {
                if (rowToCheck[index].value === 0 &&
                    rowToCheck[index + 1].value !== 0 &&
                    rowToCheck[index + 1].value === rowToCheck[index + 2].value) {
                    return {
                        methodUsed,
                        methodComplexity,
                        dimension,
                        tileId: rowToCheck[index].id,
                        value: TileResolver.getOpositeTileValue(rowToCheck[index + 1])
                    };
                }
            }
            return null;
        }

        return findSolution(row) ?? findSolution([...row].reverse());
    },
    // [ · = X |  |  ]    -    [ X = · |  |  ]
    equalSimple(rowToCheck: Tile[], dimension: 'h' | 'v'): VirtualMove | null {
        const methodUsed = 'equalSimple';
        const methodComplexity = 'E'; // Easy

        for (let index = 0; index < rowToCheck.length - 1; index++) {
            const rowIsHorizontal = rowToCheck[index].id + 1 === rowToCheck[index + 1].id || rowToCheck[index].id - 1 === rowToCheck[index + 1].id;
            if (rowIsHorizontal && rowToCheck[index].value !== 0 && rowToCheck[index + 1].value === 0 &&
                rowToCheck[index].horizontalConstraint === 'equal') {
                return {
                    methodUsed,
                    methodComplexity,
                    dimension,
                    tileId: rowToCheck[index + 1].id,
                    value: rowToCheck[index].value
                };
            }
            if (rowIsHorizontal && rowToCheck[index].value === 0 && rowToCheck[index + 1].value !== 0 &&
                rowToCheck[index].horizontalConstraint === 'equal') {
                return {
                    methodUsed,
                    methodComplexity,
                    dimension,
                    tileId: rowToCheck[index].id,
                    value: rowToCheck[index + 1].value
                };
            }

            if (!rowIsHorizontal && rowToCheck[index].value !== 0 && rowToCheck[index + 1].value === 0 &&
                rowToCheck[index].verticalConstraint === 'equal') {
                return {
                    methodUsed,
                    methodComplexity,
                    dimension,
                    tileId: rowToCheck[index + 1].id,
                    value: rowToCheck[index].value
                };
            }
            if (!rowIsHorizontal && rowToCheck[index].value === 0 && rowToCheck[index + 1].value !== 0 &&
                rowToCheck[index].verticalConstraint === 'equal') {
                return {
                    methodUsed,
                    methodComplexity,
                    dimension,
                    tileId: rowToCheck[index].id,
                    value: rowToCheck[index + 1].value
                };
            }
        }
        return null;
    },
    // [ · x X |  |  ]    -    [ X x · |  |  ]
    reversedSimple(rowToCheck: Tile[], dimension: 'h' | 'v'): VirtualMove | null {
        const methodUsed = 'reverseSimple';
        const methodComplexity = 'E'; // Easy

        for (let index = 0; index < rowToCheck.length - 1; index++) {
            const rowIsHorizontal = rowToCheck[index].id + 1 === rowToCheck[index + 1].id || rowToCheck[index].id - 1 === rowToCheck[index + 1].id;
            if (rowIsHorizontal && rowToCheck[index].value !== 0 && rowToCheck[index + 1].value === 0 &&
                rowToCheck[index].horizontalConstraint === 'reversed') {
                return {
                    methodUsed,
                    methodComplexity,
                    dimension,
                    tileId: rowToCheck[index + 1].id,
                    value: TileResolver.getOpositeTileValue(rowToCheck[index])
                };
            }
            if (rowIsHorizontal && rowToCheck[index].value === 0 && rowToCheck[index + 1].value !== 0 &&
                rowToCheck[index].horizontalConstraint === 'reversed') {
                return {
                    methodUsed,
                    methodComplexity,
                    dimension,
                    tileId: rowToCheck[index].id,
                    value: TileResolver.getOpositeTileValue(rowToCheck[index + 1])
                };
            }

            if (!rowIsHorizontal && rowToCheck[index].value !== 0 && rowToCheck[index + 1].value === 0 &&
                rowToCheck[index].verticalConstraint === 'reversed') {
                return {
                    methodUsed,
                    methodComplexity,
                    dimension,
                    tileId: rowToCheck[index + 1].id,
                    value: TileResolver.getOpositeTileValue(rowToCheck[index])
                };
            }
            if (!rowIsHorizontal && rowToCheck[index].value === 0 && rowToCheck[index + 1].value !== 0 &&
                rowToCheck[index].verticalConstraint === 'reversed') {
                return {
                    methodUsed,
                    methodComplexity,
                    dimension,
                    tileId: rowToCheck[index].id,
                    value: TileResolver.getOpositeTileValue(rowToCheck[index + 1])
                };
            }
        }

        return null;
    },
    // [ X | · | X |  ]
    holeBetween(rowToCheck: Tile[], dimension: 'h' | 'v'): VirtualMove | null {
        const methodUsed = 'holeBetween';
        const methodComplexity = 'E'; // Easy

        for (let index = 0; index < rowToCheck.length - 2; index++) {
            if (rowToCheck[index].value !== 0 &&
                rowToCheck[index].value === rowToCheck[index + 2].value &&
                rowToCheck[index + 1].value === 0) {
                return {
                    methodUsed,
                    methodComplexity,
                    dimension,
                    tileId: rowToCheck[index + 1].id,
                    value: TileResolver.getOpositeTileValue(rowToCheck[index])
                };
            }
        }
        return null;
    },
    // [ X | · =  |  |  ]    -    [  |  = ·| X ]
    equalClose(rowToCheck: Tile[], dimension: 'h' | 'v'): VirtualMove | null {
        const methodUsed = 'equalClose';
        const methodComplexity = 'E'; // Easy

        for (let index = 0; index < rowToCheck.length - 1; index++) {
            const rowIsHorizontal = rowToCheck[index].id + 1 === rowToCheck[index + 1].id || rowToCheck[index].id - 1 === rowToCheck[index + 1].id;
            if (rowIsHorizontal && rowToCheck[index].value !== 0 && rowToCheck[index + 1].value === 0 &&
                rowToCheck[index + 1].horizontalConstraint === 'equal') {
                return {
                    methodUsed,
                    methodComplexity,
                    dimension,
                    tileId: rowToCheck[index + 1].id,
                    value: TileResolver.getOpositeTileValue(rowToCheck[index])
                };
            }
            if (rowIsHorizontal && index < rowToCheck.length - 2 && rowToCheck[index + 2].value !== 0 && rowToCheck[index + 1].value === 0 &&
                rowToCheck[index].horizontalConstraint === 'equal') {
                return {
                    methodUsed,
                    methodComplexity,
                    dimension,
                    tileId: rowToCheck[index + 1].id,
                    value: TileResolver.getOpositeTileValue(rowToCheck[index + 2])
                };
            }

            if (!rowIsHorizontal && rowToCheck[index].value !== 0 && rowToCheck[index + 1].value === 0 &&
                rowToCheck[index + 1].verticalConstraint === 'equal') {
                return {
                    methodUsed,
                    methodComplexity,
                    dimension,
                    tileId: rowToCheck[index + 1].id,
                    value: TileResolver.getOpositeTileValue(rowToCheck[index])
                };
            }
            if (!rowIsHorizontal && index < rowToCheck.length - 2 && rowToCheck[index + 2].value !== 0 && rowToCheck[index + 1].value === 0 &&
                rowToCheck[index].verticalConstraint === 'equal') {
                return {
                    methodUsed,
                    methodComplexity,
                    dimension,
                    tileId: rowToCheck[index + 1].id,
                    value: TileResolver.getOpositeTileValue(rowToCheck[index + 2])
                };
            }
        }

        return null;
    },
    // [ X | · |  =  ]    -    [  =  | · | X ]
    equalFar(rowToCheck: Tile[], dimension: 'h' | 'v'): VirtualMove | null {
        const methodUsed = 'equalFar';
        const methodComplexity = 'D'; // Difficult

        for (let index = 0; index < rowToCheck.length - 3; index++) {
            const rowIsHorizontal = rowToCheck[index].id + 1 === rowToCheck[index + 1].id || rowToCheck[index].id - 1 === rowToCheck[index + 1].id;
            if (rowIsHorizontal && rowToCheck[index].value !== 0 && rowToCheck[index + 1].value === 0 &&
                rowToCheck[index + 2].horizontalConstraint === 'equal') {
                return {
                    methodUsed,
                    methodComplexity,
                    dimension,
                    tileId: rowToCheck[index + 1].id,
                    value: rowToCheck[index].value
                };
            }
            if (rowIsHorizontal && rowToCheck[index + 3].value !== 0 && rowToCheck[index + 2].value === 0 &&
                rowToCheck[index].horizontalConstraint === 'equal') {
                return {
                    methodUsed,
                    methodComplexity,
                    dimension,
                    tileId: rowToCheck[index + 2].id,
                    value: rowToCheck[index + 3].value
                };
            }

            if (!rowIsHorizontal && rowToCheck[index].value !== 0 && rowToCheck[index + 1].value === 0 &&
                rowToCheck[index + 2].verticalConstraint === 'equal') {
                return {
                    methodUsed,
                    methodComplexity,
                    dimension,
                    tileId: rowToCheck[index + 1].id,
                    value: rowToCheck[index].value
                };
            }
            if (!rowIsHorizontal && rowToCheck[index + 2].value === 0 && rowToCheck[index + 3].value !== 0 &&
                rowToCheck[index].verticalConstraint === 'equal') {
                return {
                    methodUsed,
                    methodComplexity,
                    dimension,
                    tileId: rowToCheck[index + 2].id,
                    value: rowToCheck[index + 3].value
                };
            }
        }
        
        return null;
    },
    // [ X | · x  |  |  ]    -    [  |  x ·| X ]
    reversedClose(rowToCheck: Tile[], dimension: 'h' | 'v'): VirtualMove | null {
        const methodUsed = 'reverseClose';
        const methodComplexity = 'D'; // Difficult

        for (let index = 0; index < rowToCheck.length - 3; index++) {
            const rowIsHorizontal = rowToCheck[index].id + 1 === rowToCheck[index + 1].id || rowToCheck[index].id - 1 === rowToCheck[index + 1].id;
            if (rowIsHorizontal && rowToCheck[index].value !== 0 && rowToCheck[index + 3].value === 0 &&
                rowToCheck[index + 1].horizontalConstraint === 'reversed') {
                return {
                    methodUsed,
                    methodComplexity,
                    dimension,
                    tileId: rowToCheck[index + 3].id,
                    value: TileResolver.getOpositeTileValue(rowToCheck[index])
                };
            }
            if (rowIsHorizontal && rowToCheck[index + 3].value !== 0 && rowToCheck[index].value === 0 &&
                rowToCheck[index + 1].horizontalConstraint === 'reversed') {
                return {
                    methodUsed,
                    methodComplexity,
                    dimension,
                    tileId: rowToCheck[index].id,
                    value: TileResolver.getOpositeTileValue(rowToCheck[index + 3])
                };
            }

            if (!rowIsHorizontal && rowToCheck[index].value !== 0 && rowToCheck[index + 3].value === 0 &&
                rowToCheck[index + 1].verticalConstraint === 'reversed') {
                return {
                    methodUsed,
                    methodComplexity,
                    dimension,
                    tileId: rowToCheck[index + 3].id,
                    value: TileResolver.getOpositeTileValue(rowToCheck[index])
                };
            }
            if (!rowIsHorizontal && rowToCheck[index + 3].value !== 0 && rowToCheck[index].value === 0 &&
                rowToCheck[index + 1].verticalConstraint === 'reversed') {
                return {
                    methodUsed,
                    methodComplexity,
                    dimension,
                    tileId: rowToCheck[index].id,
                    value: TileResolver.getOpositeTileValue(rowToCheck[index + 3])
                };
            }
        }

        return null;
    },
    // [ X | · |  x  ]    -    [  x  | · | X ]
    reversedFar(rowToCheck: Tile[], dimension: 'h' | 'v'): VirtualMove | null {
        const methodUsed = 'reverseFar';
        const methodComplexity = 'D'; // Difficult

        for (let index = 0; index < rowToCheck.length - 3; index++) {
            const rowIsHorizontal = rowToCheck[index].id + 1 === rowToCheck[index + 1].id || rowToCheck[index].id - 1 === rowToCheck[index + 1].id;
            if (rowIsHorizontal && rowToCheck[index].value !== 0 && rowToCheck[index + 1].value === 0 &&
                rowToCheck[index + 2].horizontalConstraint === 'reversed') {
                return {
                    methodUsed,
                    methodComplexity,
                    dimension,
                    tileId: rowToCheck[index + 1].id,
                    value: TileResolver.getOpositeTileValue(rowToCheck[index])
                };
            }
            if (rowIsHorizontal && rowToCheck[index + 3].value !== 0 && rowToCheck[index + 2].value === 0 &&
                rowToCheck[index].horizontalConstraint === 'reversed') {
                return {
                    methodUsed,
                    methodComplexity,
                    dimension,
                    tileId: rowToCheck[index + 2].id,
                    value: TileResolver.getOpositeTileValue(rowToCheck[index + 3])
                };
            }

            if (!rowIsHorizontal && rowToCheck[index].value !== 0 && rowToCheck[index + 1].value === 0 &&
                rowToCheck[index + 2].verticalConstraint === 'reversed') {
                return {
                    methodUsed,
                    methodComplexity,
                    dimension,
                    tileId: rowToCheck[index + 1].id,
                    value: TileResolver.getOpositeTileValue(rowToCheck[index])
                };
            }
            if (!rowIsHorizontal && rowToCheck[index + 3].value !== 0 && rowToCheck[index + 2].value === 0 &&
                rowToCheck[index].verticalConstraint === 'reversed') {
                return {
                    methodUsed,
                    methodComplexity,
                    dimension,
                    tileId: rowToCheck[index + 2].id,
                    value: TileResolver.getOpositeTileValue(rowToCheck[index + 3])
                };
            }
        }

        return null;
    },
    maxSymbolReached(rowToCheck: Tile[], dimension: 'h' | 'v'): VirtualMove | null  {
        const methodUsed = 'maxSymbolReached';
        const methodComplexity = 'E'; // Easy
        const emptyTiles = rowToCheck.filter(tile => tile.value === 0);
        const tilesCountWithFirstValue = rowToCheck.filter(tile => tile.value === 1).length;
        const tilesCountWithSecondValue = rowToCheck.filter(tile => tile.value === 2).length;
        // Si il y a un symbole manquant et que l'on a deux symboles identique
        if (emptyTiles.length > 0 && tilesCountWithFirstValue === 2) {
            return {
                methodUsed,
                methodComplexity,
                dimension,
                tileId: emptyTiles[0].id,
                value: 2
            };
        }
        if (emptyTiles.length > 0 && tilesCountWithSecondValue === 2) {
            return {
                methodUsed,
                methodComplexity,
                dimension,
                tileId: emptyTiles[0].id,
                value: 1
            };
        }

        return null;
    }
}