import { Tile } from "@/types/Tile.model"
import { TileResolver } from '@/lib/builder/tileResolverHelper';
import { VirtualMove } from "@/types/VirtualMove.model";
import { PatternList } from "@/types/PatternList.model";

export const patterns_6x6: PatternList = {
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
}
