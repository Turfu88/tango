import Icon from "@/components/Icon";
import Constraint from '@/components/Constraint';
import { Tile as TileType } from "@/types/Tile.model";
import { getSymbols } from "@/lib/theme";

export default function Tile({tile, checkered, otherClass, grid, handleAction}: {tile: TileType, checkered: boolean, otherClass: string, grid: number, handleAction?: (id: number) => void}) {
    const theme = getSymbols();
    const tileValue = theme[tile.value];

    function handleUserClick() {
        if (tile.isDisabled || handleAction === undefined) {
            return;
        }
        handleAction(tile.id);
    }

    return (
        <div
            className={`tile${checkered ? ' bg-grey' : ''}${tile.isDisabled ? ' tile-disabled' : ''}${tile.isError ? ' tile-error' : ''}${tile.isResolved ? ' tile-resolved' : ''} ${otherClass}`}
            onClick={handleUserClick}
        >
            {tile.value !== 0 &&
                <Icon name={tileValue} size={'lg'} />
            }
            {tile.verticalConstraint !== null &&
                <Constraint value={tile.verticalConstraint} type={'vertical'} grid={grid} />
            }
            {tile.horizontalConstraint !== null &&
                <Constraint value={tile.horizontalConstraint} type={'horizontal'} grid={grid} />
            }            
        </div>
    );
}
