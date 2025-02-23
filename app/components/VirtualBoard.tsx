import Tile from '@/components/Tile';
import { BoardBuilder as BoardBuilderType } from '@/types/BoardBuilder.model';
import { Tile as TileType } from '@/types/Tile.model';
import { BoardUtils } from "@/lib/boardHelper";


export default function VirtualBoard({ board }: { board: BoardBuilderType }) {
    const checkeredTiles = BoardUtils.getCheckeredTilesFromBoard(board.grid);
    const gridTemplateColumns: React.CSSProperties = {
        gridTemplateColumns: 'repeat(' + board.grid + ', 1fr)',
    };

    return (
        <div className="board" style={gridTemplateColumns}>
            {board.virtualTiles.map((tile: TileType, index: number) => (
                <Tile
                    key={tile.id}
                    tile={tile}
                    checkered={checkeredTiles[index]}
                    otherClass={index === board.grid - 1 ? 'corner-top' : index === board.virtualTiles.length - board.grid ? 'corner-bottom' : ''}
                    grid={board.grid}
                />
            ))}
        </div>
    );
}
