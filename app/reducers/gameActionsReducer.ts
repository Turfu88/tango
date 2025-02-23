import { Board } from '@/types/Board.model';
import { BoardUtils } from '@/lib/boardHelper';

type GameAction = 
{ action: 'change_game'; board: Board; }
| { action: 'change_tile'; tileId: number; }
| { action: 'undo_change_tile' }
| { action: 'reset_game' }
| { action: 'search_errors' };

export function gameActionsReducer(board: Board, action: GameAction): Board {
    if (BoardUtils.userCanUseAction(board, action.action)) {
        switch (action.action) {
            case 'change_tile': {
                const history = BoardUtils.addMoveToHistory(board, action.tileId);
                let tiles = BoardUtils.incrementTileValue(board, action.tileId);
                tiles = BoardUtils.stillHasErrors({...board, tiles});

                const gameOver = BoardUtils.isGameOver(board);

                return {
                    ...board, tiles, history, gameOver
                };
            }
            case 'undo_change_tile': {
                const tileId = BoardUtils.getLastMoveFromHistory(board);
                const history = BoardUtils.removeLastMoveFromHistory(board);
                const tiles = BoardUtils.decrementTileValue(board, tileId);
    
                return {
                    ...board, tiles, history
                };
            }
            case 'reset_game': {
                const history = BoardUtils.clearHistory(board);
                const tiles = BoardUtils.resetTiles(board);
                const gameOver = false;
                return {
                    ...board, tiles, history, gameOver
                };
            }
            case 'search_errors': {
                const tiles = BoardUtils.searchErrors(board);

                return {
                    ...board, tiles
                };
            }
            case 'change_game': {
                return action.board;
            }
        }
    }

    return {
        ...board
    };   
}
