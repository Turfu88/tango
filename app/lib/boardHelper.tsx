import { Board as BoardType } from "@/types/Board.model";
import { Tile as TileType } from '@/types/Tile.model';
import { errorHelper } from '@/lib/errorHelper';

export const BoardUtils = {
    userCanUseAction(board: BoardType, action: string): boolean {
        if (action === 'reset_game' || action === 'change_game') {
            return true;
        }
        return !board.gameOver;
    },
    isGameOver(board: BoardType): boolean {
        const boardValues = board.tiles.map((tile) => tile.value);
        return JSON.stringify(boardValues) === JSON.stringify(board.solution);
    },
    getCheckeredTilesFromBoard(size: number): boolean[] {
        if (!Number.isInteger(size) || size <= 0) {
            throw new Error("Size must be a positive integer");
        }

        const checkerboard = [];
        for (let row = 0; row < size; row++) {
            for (let col = 0; col < size; col++) {
                checkerboard.push((row + col) % 2 === 0);
            }
        }
        return checkerboard;
    },

    getLastMoveFromHistory(board: BoardType): number {
        return board.history[board.history.length - 1];
    },

    addMoveToHistory(board: BoardType, id: number): number[] {
        board.history.push(id);
        return board.history;
    },

    removeLastMoveFromHistory(board: BoardType): number[] {
        board.history.pop();
        return board.history;
    },

    incrementTileValue(board: BoardType, id: number): TileType[] {
        return board.tiles.map((tile) => {
            if (tile.id === id) {
                tile.value = (tile.value + 1) % 3;
            }
            return tile;
        });
    },

    decrementTileValue(board: BoardType, id: number): TileType[] {
        return board.tiles.map((tile) => {
            if (tile.id === id) {
                tile.value = (tile.value - 1 + 3) % 3;
            }
            return tile;
        });
    },

    clearHistory(board: BoardType): number[] {
        board.history = [];
        return board.history;
    },

    resetTiles(board: BoardType): TileType[] {
        return board.tiles.map((tile) => {
            if (!tile.isDisabled) {
                tile.value = 0;
            }
            return tile;
        });
    },
    stillHasErrors(board: BoardType): TileType[] {
        const stillHasErrors = board.tiles.some((tile) => tile.isError);
        if (stillHasErrors) {
            return this.searchErrors(board);
        }
        return board.tiles;
    },
    searchErrors(board: BoardType): TileType[] {
        board.tiles = board.tiles.map((tile: TileType) => {
            tile.isError = false;
            return tile;
        })
        const splitTilesGrid = this.getSplitTilesGrid(board);
        const wrongTiles = errorHelper.getErrorsFrom3SymbolsRule(splitTilesGrid);
        const wrongTiles2 = errorHelper.getErrorsFromPairedSymbolsRule(splitTilesGrid, board.grid);
        const wrongTiles3 = errorHelper.getErrorsFromEqualityRule(splitTilesGrid);
        const allwrongTiles = [...wrongTiles, ...wrongTiles2, ...wrongTiles3];

        return board.tiles.map((tile: TileType) => {
            if (allwrongTiles.includes(tile.id)) {
                tile.isError = true;
            }
            return tile;
        });
    },
    getSplitTilesGrid(game: BoardType): TileType[][] {
        const { grid, tiles } = game;
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
    getSplitGames(gamesList: string[], page: number): string[][] {
        if (page <= 0) {
            throw new Error("La taille de la page doit être supérieure à 0");
        }
        
        const result: string[][] = [];
        for (let i = 0; i < gamesList.length; i += page) {
            result.push(gamesList.slice(i, i + page));
        }
        
        return result;
    },
};
