import { BoardUtils } from '@/lib/builder/boardHelper';
import { BoardBuilder } from '@/types/BoardBuilder.model';
import { TileResolver } from '@/lib/builder/tileResolverHelper';

export type GameBuilderAction =
    { action: 'select_restriction'; restriction: string; }
    | { action: 'apply_restriction'; tileId: number; }
    | { action: 'add_random_restriction'; };
   // | { action: 'export_game' };

export function gameBuilderReducer(boardBuilder: BoardBuilder, action: GameBuilderAction): BoardBuilder {
    if (BoardUtils.adminCanUseAction(boardBuilder, action)) {
        switch (action.action) {
            case 'select_restriction': {
                let selectedRestriction;
                if (action.restriction === boardBuilder.selectedRestriction) {
                    selectedRestriction = null;
                } else {
                    selectedRestriction = action.restriction;
                }

                // Rendre inéligible les tuiles selon la restriction choisie

                return {
                    ...boardBuilder, selectedRestriction
                };
            }
            case 'apply_restriction': {
                boardBuilder = { ...boardBuilder, virtualHistory: [] };
                const tilesShallow = [...boardBuilder.tiles];
                const virtualTilesShallow = [...boardBuilder.virtualTiles];
                const tiles = BoardUtils.applyRestrictionOnTile(tilesShallow, action.tileId, boardBuilder.selectedRestriction);
                const virtualTilesInitial = virtualTilesShallow.map((virtualTile) => {
                    const matchingTile = tiles.find((tile) => tile.id === virtualTile.id);
                    return matchingTile 
                        ? { ...virtualTile, value: matchingTile.value, isResolved: false, horizontalConstraint: matchingTile.horizontalConstraint, verticalConstraint: matchingTile.verticalConstraint }
                        : { ...virtualTile };
                });
            
                let [virtualTiles, virtualHistory] = TileResolver.resolveTilesValues(virtualTilesInitial, boardBuilder.grid, boardBuilder.virtualHistory);
                virtualTiles = BoardUtils.searchErrors(virtualTiles, boardBuilder.grid);

                const isSolvable = BoardUtils.puzzleHasBeenResolved(tiles, virtualHistory, boardBuilder.grid, virtualTiles);

                return {
                    ...boardBuilder, tiles, virtualTiles, virtualHistory, isSolvable
                };
            }
            case 'add_random_restriction': {

            }
            // case 'export_game': {
            //     // Find errors on new game config
            //     // Get tiles config => boardBuilder.tiles
            //     // get solution from virtualHistory
            //     // send data to server for json export
            //     const newBoard = BoardUtils.createBoardFrom(boardBuilder);
            //     console.log({newBoard})
            //     const newGame = BoardUtils.sendBoardToBackForExport(newBoard);
            //     console.log({newGame});
            // }
        }
    }

    return {
        ...boardBuilder
    };
}
