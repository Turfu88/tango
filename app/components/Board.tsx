import Tile from '@/components/Tile';
import { Board as BoardType } from '@/types/Board.model';
import { BoardBuilder as BoardBuilderType } from '@/types/BoardBuilder.model';
import { Tile as TileType } from '@/types/Tile.model';
import { BoardUtils } from "@/lib/boardHelper";


export default function Board({ board, handleAction }: { board: BoardType | BoardBuilderType, handleAction: (id: number) => void }) {
    const checkeredTiles = BoardUtils.getCheckeredTilesFromBoard(board.grid);
    const gridTemplateColumns: React.CSSProperties = {
        gridTemplateColumns: 'repeat(' + board.grid + ', 1fr)',
    };

    return (
        <div className="board" style={gridTemplateColumns}>
            {board.tiles.map((tile: TileType, index: number) => (
                <Tile
                    key={tile.id}
                    tile={tile}
                    handleAction={handleAction}
                    checkered={checkeredTiles[index]}
                    otherClass={index === board.grid - 1 ? 'corner-top' : index === board.tiles.length - board.grid ? 'corner-bottom' : ''}
                    grid={board.grid}
                />
            ))}
        </div>
    );
}
