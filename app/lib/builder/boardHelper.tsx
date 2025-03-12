import { BoardBuilder as BoardBuilderType } from "@/types/BoardBuilder.model";
import { Board as BoardType } from "@/types/Board.model";
import board_4x4 from '@/ressources/empty-game_4x4.json';
import board_6x6 from '@/ressources/empty-game_6x6.json';
import board_8x8 from '@/ressources/empty-game_8x8.json';
import games_list from '@/ressources/games_list.json';
import { GameBuilderAction } from "@/reducers/builder/gameBuilderReducer";
import { Tile } from "@/types/Tile.model";
import { VirtualMove } from "@/types/VirtualMove.model";
import { errorHelper } from '@/lib/errorHelper';
import { Tile as TileType } from '@/types/Tile.model';

const gameData_4x4: BoardBuilderType = board_4x4 as BoardBuilderType;
const gameData_6x6: BoardBuilderType = board_6x6 as BoardBuilderType;
const gameData_8x8: BoardBuilderType = board_8x8 as BoardBuilderType;

export const BoardUtils = {
    init(): BoardBuilderType {
        // get query param grid
        const queryGrid = window.location.search;
        const urlParams = new URLSearchParams(queryGrid);
        const gridSize = urlParams.get('grid');
        let gameData = gameData_4x4;
        if (gridSize === "8") {
            gameData = gameData_8x8;
        }
        if (gridSize === "6") {
            gameData = gameData_6x6;
        }
        return gameData
    },
    adminCanUseAction(boardBuilder: BoardBuilderType, action: GameBuilderAction, tileId?: number): boolean {
        if (action.action === 'apply_restriction' && boardBuilder.selectedRestriction === null) {
            return false;
        }
        if (action.action === 'apply_restriction' && tileId && this.tileIsInvalid(boardBuilder, tileId)) {
            return false;
        }

        return true;
    },

    tileIsInvalid(boardBuilder: BoardBuilderType, tileId: number): boolean {
        if (
            boardBuilder.selectedRestriction === 'reversed-horizontal'
            && boardBuilder.tiles[tileId].canHaveHorizontalConstraintReversed === false) {
            return true;
        }
        if (
            boardBuilder.selectedRestriction === 'equal-horizontal'
            && boardBuilder.tiles[tileId].canHaveHorizontalConstraintEqual === false) {
            return true;
        }
        if (
            boardBuilder.selectedRestriction === 'reversed-vertical'
            && boardBuilder.tiles[tileId].canHaveVerticalConstraintReversed === false) {
            return true;
        }
        if (
            boardBuilder.selectedRestriction === 'equal-vertical'
            && boardBuilder.tiles[tileId].canHaveVerticalConstraintEqual === false) {
            return true;
        }
        // A améliorer en faisant la même chose pour les restrictions de type sun ou moon

        return false;
    },
    applyRestrictionOnTile(tiles: Tile[], tileId: number, restriction: string | null) {
        return tiles.map((tile) => {
            if (tile.id === tileId) {
                return {
                    ...tile,
                    value: restriction === 'sun' ? (tile.value === 1 ? 0 : 1) 
                        : restriction === 'moon' ? (tile.value === 2 ? 0 : 2) 
                        : tile.value,
                    verticalConstraint: restriction === 'equal-vertical' ? (tile.verticalConstraint === 'equal' ? null : 'equal') 
                        : restriction === 'reversed-vertical' ? (tile.verticalConstraint === 'reversed' ? null : 'reversed') 
                        : tile.verticalConstraint,
                    horizontalConstraint: restriction === 'equal-horizontal' ? (tile.horizontalConstraint === 'equal' ? null : 'equal') 
                        : restriction === 'reversed-horizontal' ? (tile.horizontalConstraint === 'reversed' ? null : 'reversed') 
                        : tile.horizontalConstraint
                };
            }
            return tile;
        });
    },
    searchErrors(virtualTiles: Tile[], grid: number) {
        const tiles = virtualTiles.map((tile: TileType) => {
            tile.isError = false;
            return tile;
        })
        const splitTilesGrid = this.getSplitTilesGrid(tiles, grid);
        const wrongTiles = errorHelper.getErrorsFrom3SymbolsRule(splitTilesGrid);
        const wrongTiles2 = errorHelper.getErrorsFromPairedSymbolsRule(splitTilesGrid, grid);
        const wrongTiles3 = errorHelper.getErrorsFromEqualityRule(splitTilesGrid);
        const allwrongTiles = [...wrongTiles, ...wrongTiles2, ...wrongTiles3];

        return tiles.map((tile: TileType) => {
            if (allwrongTiles.includes(tile.id)) {
                tile.isError = true;
            }
            return tile;
        });
    },
    getSplitTilesGrid(tiles: Tile[], grid: number): TileType[][] {
        let rows = [];

        for (let i = 0; i < tiles.length; i += grid) {
            rows.push(tiles.slice(i, i + grid));
        }

        const columns: TileType[][] = Array.from({ length: grid }, () => [] as TileType[]);

        for (let i = 0; i < tiles.length; i++) {
            const columnIndex = i % grid;
            columns[columnIndex].push(tiles[i]);
        }

        return [...rows, ...columns];
    },
    puzzleHasBeenResolved(tiles: Tile[], virtualHistory: VirtualMove[], grid: number, virtualTiles: Tile[],): boolean {
        const hasErrors = virtualTiles.some((tile) => tile.isError);
        const tilesWithConstraints = tiles.filter((tile) => tile.value !== 0).length;
        const virtualTilesSolved = virtualHistory.length;
        return grid * grid === tilesWithConstraints + virtualTilesSolved && !hasErrors;
    },
    createBoardFrom(board: BoardBuilderType): BoardType {
        const tiles = board.tiles.map((tile) => {
            delete tile.canHaveHorizontalConstraintEqual
            delete tile.canHaveHorizontalConstraintReversed
            delete tile.canHaveVerticalConstraintEqual
            delete tile.canHaveVerticalConstraintReversed
            if (tile.value !== 0) tile.isDisabled = true;
            return tile;
        });

        return {
            id: this.generateNewIdFromLastGame(),
            grid: board.grid,
            gameOver: false,
            history: [],
            solution: board.virtualTiles.map((tile) => tile.value),
            tiles: tiles
        };
    },
    generateNewIdFromLastGame() {
        const queryGrid = window.location.search;
        const urlParams = new URLSearchParams(queryGrid);
        const gridSize = urlParams.get('grid');
        let gameData = games_list.grid_4x4;
        if (gridSize === "8") {
            gameData = games_list.grid_8x8;
        }
        if (gridSize === "6") {
            gameData = games_list.grid_6x6;
        }
        
        const lastGame = gameData[gameData.length - 1];
        return (parseInt(lastGame.split('_')[2]) + 1);
    },
    async sendBoardToBackForExport(board: BoardType): Promise<void> {
        await fetch('/game-builder/export', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(board),
        })
    }
};
