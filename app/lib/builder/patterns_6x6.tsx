import { Tile } from '@/types/Tile.model';
import { TileResolver } from '@/lib/builder/tileResolverHelper';
import { VirtualMove } from '@/types/VirtualMove.model';
import { PatternList } from '@/types/PatternList.model';

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
    // [ X | X | O | O | X | · ]
    maxSymbolReached(rowToCheck: Tile[], dimension: 'h' | 'v'): VirtualMove | null  {
        const methodUsed = 'maxSymbolReached';
        const methodComplexity = 'E'; // Easy
        const tilesLimit = rowToCheck.length / 2;
        const emptyTiles = rowToCheck.filter(tile => tile.value === 0);
        const tilesCountWithFirstValue = rowToCheck.filter(tile => tile.value === 1).length;
        const tilesCountWithSecondValue = rowToCheck.filter(tile => tile.value === 2).length;
        // Si il y a un symbole manquant et que l'on a deux symboles identique
        if (emptyTiles.length > 0 && tilesCountWithFirstValue === tilesLimit) {
            return {
                methodUsed,
                methodComplexity,
                dimension,
                tileId: emptyTiles[0].id,
                value: 2
            };
        }
        if (emptyTiles.length > 0 && tilesCountWithSecondValue === tilesLimit) {
            return {
                methodUsed,
                methodComplexity,
                dimension,
                tileId: emptyTiles[0].id,
                value: 1
            };
        }

        return null;
    },
    // [ X |   |   |   | X | · ]
    largeHoleBetween(rowToCheck: Tile[], dimension: 'h' | 'v'): VirtualMove | null  {
        const methodUsed = '3cellsHoleBetween';
        const methodComplexity = 'D'; // Difficult
        if (rowToCheck[0].value !== 0 && rowToCheck[5].value === 0 && rowToCheck[4].value === rowToCheck[0].value) {
            return {
                methodUsed,
                methodComplexity,
                dimension,
                tileId: rowToCheck[5].id,
                value: TileResolver.getOpositeTileValue(rowToCheck[0])
            };
        }
        if (rowToCheck[1].value !== 0 && rowToCheck[0].value === 0 && rowToCheck[5].value === rowToCheck[1].value) {
            return {
                methodUsed,
                methodComplexity,
                dimension,
                tileId: rowToCheck[0].id,
                value: TileResolver.getOpositeTileValue(rowToCheck[1])
            };
        }

        return null;
    },
    // [ X | · |   |   |   | X ]
    maxHoleBetween(rowToCheck: Tile[], dimension: 'h' | 'v'): VirtualMove | null  {
        const methodUsed = '4cellsHoleBetween';
        const methodComplexity = 'D'; // Difficult
        if (rowToCheck[0].value !== 0 && rowToCheck[1].value === 0 && rowToCheck[0].value === rowToCheck[5].value) {
            return {
                methodUsed,
                methodComplexity,
                dimension,
                tileId: rowToCheck[1].id,
                value: TileResolver.getOpositeTileValue(rowToCheck[0])
            };
        }
        if (rowToCheck[0].value !== 0 && rowToCheck[4].value === 0 && rowToCheck[0].value === rowToCheck[5].value) {
            return {
                methodUsed,
                methodComplexity,
                dimension,
                tileId: rowToCheck[4].id,
                value: TileResolver.getOpositeTileValue(rowToCheck[0])
            };
        }

        return null;
    },
    // [ X |   |   |   | · =  ]
    equalWithLargeHoleBetween(rowToCheck: Tile[], dimension: 'h' | 'v'): VirtualMove | null  {
        const methodUsed = 'equalWithLargeHoleBetween';
        const methodComplexity = 'D'; // Difficult
        if (
            rowToCheck[0].value !== 0
            && rowToCheck[4].value === 0
            && ((dimension === 'h' && rowToCheck[4].horizontalConstraint === 'equal')
            || (dimension === 'v' && rowToCheck[4].verticalConstraint === 'equal'))
        ) {
            return {
                methodUsed,
                methodComplexity,
                dimension,
                tileId: rowToCheck[4].id,
                value: TileResolver.getOpositeTileValue(rowToCheck[0])
            };
        }
        if (
            rowToCheck[5].value !== 0
            && rowToCheck[1].value === 0
            && ((dimension === 'h' && rowToCheck[0].horizontalConstraint === 'equal')
            || (dimension === 'v' && rowToCheck[0].verticalConstraint === 'equal'))
        ) {
            return {
                methodUsed,
                methodComplexity,
                dimension,
                tileId: rowToCheck[1].id,
                value: TileResolver.getOpositeTileValue(rowToCheck[5])
            };
        }
        return null;
    },
    // [ X | X | O |   |   | · ]
    halfFilled(rowToCheck: Tile[], dimension: 'h' | 'v'): VirtualMove | null  {
        const methodUsed = 'halfFilled';
        const methodComplexity = 'D'; // Difficult
        if (rowToCheck[0].value !== 0 && rowToCheck[2].value !== 0 && rowToCheck[5].value === 0 && rowToCheck[0].value === rowToCheck[1].value && rowToCheck[0].value !== rowToCheck[2].value) {
            return {
                methodUsed,
                methodComplexity,
                dimension,
                tileId: rowToCheck[5].id,
                value: TileResolver.getOpositeTileValue(rowToCheck[0])
            };
        }
        if (rowToCheck[5].value !== 0 && rowToCheck[3].value !== 0 && rowToCheck[0].value === 0 && rowToCheck[5].value === rowToCheck[4].value && rowToCheck[5].value !== rowToCheck[3].value) {
            return {
                methodUsed,
                methodComplexity,
                dimension,
                tileId: rowToCheck[0].id,
                value: TileResolver.getOpositeTileValue(rowToCheck[5])
            };
        }

        return null;
    },
    // [ X |   | · |   x   | X ]
    maxSymbolReachedWithOneReversed(rowToCheck: Tile[], dimension: 'h' | 'v'): VirtualMove | null  {
        const methodUsed = 'maxSymbolReachedWithOneReversed';
        const methodComplexity = 'D'; // Difficult
        const tilesLimit = 2;
        const emptyTiles = rowToCheck.filter(tile => tile.value === 0);
        const tilesContainingEmptyReversed = rowToCheck.filter(tile => ((tile.horizontalConstraint === 'reversed' && dimension === 'h') || (tile.verticalConstraint === 'reversed' && dimension === 'v' )) && tile.value === 0);
        if (emptyTiles.length > 1 && tilesContainingEmptyReversed.length !== 1) return null;

        const tilesWithFirstValue = rowToCheck.filter(tile => tile.value === 1);
        const tilesWithSecondValue = rowToCheck.filter(tile => tile.value === 2);
        let tilesWithEmptyReversed = [];
        for (let index = 0; index < rowToCheck.length - 1; index++) {
            if ((rowToCheck[index].horizontalConstraint === 'reversed' && dimension === 'h') || (rowToCheck[index].verticalConstraint === 'reversed' && dimension === 'v')) {
                tilesWithEmptyReversed.push(rowToCheck[index].id);
                tilesWithEmptyReversed.push(rowToCheck[index + 1].id);
            }
        }

        if (tilesWithFirstValue.length === tilesLimit) {
            let filteredTiles = rowToCheck.filter(tile => !tilesWithEmptyReversed.includes(tile.id));
            filteredTiles = filteredTiles.filter(tile => !tilesWithFirstValue.map(tile => tile.id).includes(tile.id));
            const filteredTiles2 = filteredTiles.filter(tile => !tilesWithSecondValue.map(tile => tile.id).includes(tile.id));
            if (filteredTiles2.length > 0 && filteredTiles2[0].value === 0) {
                return {
                    methodUsed,
                    methodComplexity,
                    dimension,
                    tileId: filteredTiles2[0].id,
                    value: TileResolver.getOpositeTileValue(tilesWithFirstValue[0])
                };
            }
        }
        if (tilesWithSecondValue.length === tilesLimit) {
            let filteredTiles = rowToCheck.filter(tile => !tilesWithEmptyReversed.includes(tile.id));
            filteredTiles = filteredTiles.filter(tile => !tilesWithSecondValue.map(tile => tile.id).includes(tile.id));
            const filteredTiles2 = filteredTiles.filter(tile => !tilesWithFirstValue.map(tile => tile.id).includes(tile.id));
            if (filteredTiles2.length > 0 && filteredTiles2[0].value === 0) {
                return {
                    methodUsed,
                    methodComplexity,
                    dimension,
                    tileId: filteredTiles2[0].id,
                    value: TileResolver.getOpositeTileValue(tilesWithSecondValue[0])
                };
            }
        }

        return null;
    },
    // [ X | · |   x   |   x   ]
    maxSymbolReachedWithTwoReversed(rowToCheck: Tile[], dimension: 'h' | 'v'): VirtualMove | null  {
        const methodUsed = 'maxSymbolReachedWithTwoReversed';
        const methodComplexity = 'D'; // Difficult
        const tilesLimit = 1;
        const emptyTiles = rowToCheck.filter(tile => tile.value === 0);
        const tilesContainingEmptyReversed = rowToCheck.filter(tile => ((tile.horizontalConstraint === 'reversed' && dimension === 'h') || (tile.verticalConstraint === 'reversed' && dimension === 'v')) && tile.value === 0);
        if (emptyTiles.length > 1 && tilesContainingEmptyReversed.length !== 2) return null;

        const tilesWithFirstValue = rowToCheck.filter(tile => tile.value === 1);
        const tilesWithSecondValue = rowToCheck.filter(tile => tile.value === 2);
        let tilesWithEmptyReversed = [];
        for (let index = 0; index < rowToCheck.length - 1; index++) {
            if ((dimension === 'h' && rowToCheck[index].horizontalConstraint === 'reversed' && rowToCheck[index + 1].horizontalConstraint === null) ||
            (dimension === 'v' && rowToCheck[index].verticalConstraint === 'reversed' && rowToCheck[index + 1].verticalConstraint === null)) {
           
                tilesWithEmptyReversed.push(rowToCheck[index].id);
                tilesWithEmptyReversed.push(rowToCheck[index + 1].id);
            }
        }
        if (tilesWithEmptyReversed.length !== 4) return null;
        if (tilesWithFirstValue.length === tilesLimit) {
            let filteredTiles = rowToCheck.filter(tile => !tilesWithEmptyReversed.includes(tile.id));
            filteredTiles = filteredTiles.filter(tile => !tilesWithFirstValue.map(tile => tile.id).includes(tile.id));
            const filteredTiles2 = filteredTiles.filter(tile => !tilesWithSecondValue.map(tile => tile.id).includes(tile.id));
            if (filteredTiles2.length > 0 && filteredTiles2[0].value === 0) {
                return {
                    methodUsed,
                    methodComplexity,
                    dimension,
                    tileId: filteredTiles2[0].id,
                    value: TileResolver.getOpositeTileValue(tilesWithFirstValue[0])
                };
            }
        }
        if (tilesWithSecondValue.length === tilesLimit) {
            let filteredTiles = rowToCheck.filter(tile => !tilesWithEmptyReversed.includes(tile.id));
            filteredTiles = filteredTiles.filter(tile => !tilesWithSecondValue.map(tile => tile.id).includes(tile.id));
            const filteredTiles2 = filteredTiles.filter(tile => !tilesWithFirstValue.map(tile => tile.id).includes(tile.id));
            if (filteredTiles2.length > 0 && filteredTiles2[0].value === 0) {
                return {
                    methodUsed,
                    methodComplexity,
                    dimension,
                    tileId: filteredTiles2[0].id,
                    value: TileResolver.getOpositeTileValue(tilesWithSecondValue[0])
                };
            }
        }

        return null;
    },
    // [ X |   x   x   x   | · ]
    maxSymbolReachedWithThreeReversedStickedTogether(rowToCheck: Tile[], dimension: 'h' | 'v'): VirtualMove | null  {
        const methodUsed = 'maxSymbolReachedWithThreeReversedStickedTogether';
        const methodComplexity = 'D'; // Difficult
        const tilesLimit = 1;
        const emptyTiles = rowToCheck.filter(tile => tile.value === 0);
        const tilesContainingEmptyReversed = rowToCheck.filter(tile => ((tile.horizontalConstraint === 'reversed' && dimension === 'h') || (tile.verticalConstraint === 'reversed' && dimension === 'v')) && tile.value === 0);
        if (emptyTiles.length > 1 && tilesContainingEmptyReversed.length !== 3) return null;

        const tilesWithFirstValue = rowToCheck.filter(tile => tile.value === 1);
        const tilesWithSecondValue = rowToCheck.filter(tile => tile.value === 2);
        let tilesWithEmptyReversed = [];
        for (let index = 0; index < rowToCheck.length - 3; index++) {
            if ((dimension === 'h' && rowToCheck[index].horizontalConstraint === 'reversed' && rowToCheck[index + 1].horizontalConstraint === 'reversed' && rowToCheck[index + 2].horizontalConstraint === 'reversed') ||
            (dimension === 'v' && rowToCheck[index].verticalConstraint === 'reversed' && rowToCheck[index + 1].verticalConstraint === 'reversed' && rowToCheck[index + 2].verticalConstraint === 'reversed')) {
           
                tilesWithEmptyReversed.push(rowToCheck[index].id);
                tilesWithEmptyReversed.push(rowToCheck[index + 1].id);
                tilesWithEmptyReversed.push(rowToCheck[index + 2].id);
                tilesWithEmptyReversed.push(rowToCheck[index + 3].id);
            }
        }
        if (tilesWithEmptyReversed.length !== 4) return null;
        if (tilesWithFirstValue.length === tilesLimit) {
            let filteredTiles = rowToCheck.filter(tile => !tilesWithEmptyReversed.includes(tile.id));
            filteredTiles = filteredTiles.filter(tile => !tilesWithFirstValue.map(tile => tile.id).includes(tile.id));
            const filteredTiles2 = filteredTiles.filter(tile => !tilesWithSecondValue.map(tile => tile.id).includes(tile.id));
            if (filteredTiles2.length > 0 && filteredTiles2[0].value === 0) {
                return {
                    methodUsed,
                    methodComplexity,
                    dimension,
                    tileId: filteredTiles2[0].id,
                    value: TileResolver.getOpositeTileValue(tilesWithFirstValue[0])
                };
            }
        }
        if (tilesWithSecondValue.length === tilesLimit) {
            let filteredTiles = rowToCheck.filter(tile => !tilesWithEmptyReversed.includes(tile.id));
            filteredTiles = filteredTiles.filter(tile => !tilesWithSecondValue.map(tile => tile.id).includes(tile.id));
            const filteredTiles2 = filteredTiles.filter(tile => !tilesWithFirstValue.map(tile => tile.id).includes(tile.id));
            if (filteredTiles2.length > 0 && filteredTiles2[0].value === 0) {
                return {
                    methodUsed,
                    methodComplexity,
                    dimension,
                    tileId: filteredTiles2[0].id,
                    value: TileResolver.getOpositeTileValue(tilesWithSecondValue[0])
                };
            }
        }

        return null;
    },
    // [ X |   x  ·  x   |  x  ]
    maxSymbolReachedWithThreeReversedAndHole(rowToCheck: Tile[], dimension: 'h' | 'v'): VirtualMove | null  {
        const methodUsed = 'maxSymbolReachedWithThreeReversedAndHole';
        const methodComplexity = 'D'; // Difficult
        const tilesLimit = 1;
        const emptyTiles = rowToCheck.filter(tile => tile.value === 0);
        const tilesContainingEmptyReversed = rowToCheck.filter(tile => ((tile.horizontalConstraint === 'reversed' && dimension === 'h') || (tile.verticalConstraint === 'reversed' && dimension === 'v')) && tile.value === 0);
        if (emptyTiles.length > 1 && tilesContainingEmptyReversed.length !== 3) return null;

        const tilesWithFirstValue = rowToCheck.filter(tile => tile.value === 1);
        const tilesWithSecondValue = rowToCheck.filter(tile => tile.value === 2);
        let tilesWithEmptyReversed = [];
        let tileFound = null;
        for (let index = 0; index < rowToCheck.length - 2; index++) {
            if ((dimension === 'h' && rowToCheck[index].horizontalConstraint === 'reversed' && rowToCheck[index + 1].horizontalConstraint === 'reversed') ||
            (dimension === 'v' && rowToCheck[index].verticalConstraint === 'reversed' && rowToCheck[index + 1].verticalConstraint === 'reversed')) {
           
                tilesWithEmptyReversed.push(rowToCheck[index].id);
                tilesWithEmptyReversed.push(rowToCheck[index + 1].id);
                tilesWithEmptyReversed.push(rowToCheck[index + 2].id);
                tileFound = rowToCheck[index + 1];
            }
        }
        for (let index = 0; index < rowToCheck.length - 1; index++) {
            if ((dimension === 'h' && rowToCheck[index].horizontalConstraint === 'reversed' && rowToCheck[index + 1].horizontalConstraint === null) ||
            (dimension === 'v' && rowToCheck[index].verticalConstraint === 'reversed' && rowToCheck[index + 1].verticalConstraint === null)) {
                tilesWithEmptyReversed.push(rowToCheck[index].id);
                tilesWithEmptyReversed.push(rowToCheck[index + 1].id);
            }
        }
        const tilesWithEmptyReversedClean =  new Set(tilesWithEmptyReversed);
        if (tilesWithEmptyReversedClean.size !== 5 || tileFound === null) return null;
        if (tilesWithFirstValue.length === tilesLimit) {
            return {
                methodUsed,
                methodComplexity,
                dimension,
                tileId: tileFound.id,
                value: tilesWithFirstValue[0].value
            };
        }
        if (tilesWithSecondValue.length === tilesLimit) {
            return {
                methodUsed,
                methodComplexity,
                dimension,
                tileId: tileFound.id,
                value: tilesWithSecondValue[0].value
            };
        }

        return null;
    },
    // [ X |   x   | · =   |   ]
    equalAndReversed(rowToCheck: Tile[], dimension: 'h' | 'v'): VirtualMove | null  {
        const methodUsed = 'equalAndReversed';
        const methodComplexity = 'D'; // Difficult
        const tilesLimit = 1;
        const emptyTiles = rowToCheck.filter(tile => tile.value === 0);
        const tilesContainingEmptyReversed = rowToCheck.filter(tile => ((tile.horizontalConstraint === 'reversed' && dimension === 'h') || (tile.verticalConstraint === 'reversed' && dimension === 'v')) && tile.value === 0);
        const tilesContainingEmptyEqual = rowToCheck.filter(tile => ((tile.horizontalConstraint === 'equal' && dimension === 'h') || (tile.verticalConstraint === 'equal' && dimension === 'v')) && tile.value === 0);
        if (emptyTiles.length > 4 && tilesContainingEmptyReversed.length !== 1 && tilesContainingEmptyEqual.length !== 1) return null;

        const tilesWithFirstValue = rowToCheck.filter(tile => tile.value === 1);
        const tilesWithSecondValue = rowToCheck.filter(tile => tile.value === 2);
        let tilesWithEmptyReversed = [];
        let tilesWithEmptyEqual = [];
        let tileFound = null;
        for (let index = 0; index < rowToCheck.length - 1; index++) {
            if ((dimension === 'h' && rowToCheck[index].horizontalConstraint === 'reversed' && rowToCheck[index + 1].horizontalConstraint === null) ||
            (dimension === 'v' && rowToCheck[index].verticalConstraint === 'reversed' && rowToCheck[index + 1].verticalConstraint === null)) {
                tilesWithEmptyReversed.push(rowToCheck[index].id);
                tilesWithEmptyReversed.push(rowToCheck[index + 1].id);
            }
        }
        for (let index = 0; index < rowToCheck.length - 1; index++) {
            if ((dimension === 'h' && rowToCheck[index].horizontalConstraint === 'equal' && rowToCheck[index + 1].horizontalConstraint === null) ||
            (dimension === 'v' && rowToCheck[index].verticalConstraint === 'equal' && rowToCheck[index + 1].verticalConstraint === null)) {
                tilesWithEmptyEqual.push(rowToCheck[index].id);
                tilesWithEmptyEqual.push(rowToCheck[index + 1].id);
                tileFound = rowToCheck[index];
            }
        }
        const tilesWithEmptyReversedClean =  new Set(tilesWithEmptyReversed);
        const tilesWithEmptyEqualClean =  new Set(tilesWithEmptyEqual);
        if (tilesWithEmptyReversedClean.size !== 2 || tilesWithEmptyEqualClean.size !== 2 || tileFound === null) return null;
        if (tilesWithFirstValue.length === tilesLimit) {
            return {
                methodUsed,
                methodComplexity,
                dimension,
                tileId: tileFound.id,
                value: TileResolver.getOpositeTileValue(tilesWithFirstValue[0])
            };
        }
        if (tilesWithSecondValue.length === tilesLimit) {
            return {
                methodUsed,
                methodComplexity,
                dimension,
                tileId: tileFound.id,
                value: TileResolver.getOpositeTileValue(tilesWithSecondValue[0])
            };
        }

        return null;
    },
}
