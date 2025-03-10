import { Button } from '@/components/ui/button';
import Icon from '@/components/Icon';
import Board from '@/components/Board';
import VirtualBoard from '@/components/VirtualBoard';
import { useReducer } from 'react';
import { gameBuilderReducer } from '@/reducers/builder/gameBuilderReducer';
import { BoardUtils } from '@/lib/builder/boardHelper';
import { VirtualMove } from '@/types/VirtualMove.model';


export function GameEditor() {
    const gameData = BoardUtils.init();

    const [gameBuilder, dispatch] = useReducer(gameBuilderReducer, gameData);

    function handleAction(tileId: number): void {
        dispatch({ action: 'apply_restriction', tileId })
    }

    return (
        <div className="bg-white rounded-lg border px-4 py-4 mx-6">
            <div className="flex justify-between items-center mb-4">
                <div className='flex justify-between'>
                    <a href="/game-builder">
                        <Button>Retour</Button>
                    </a>
                </div>
                <p className="text-center font-bold">Game builder editor</p>
                <div className='flex justify-between'>
                    <Button disabled={!gameBuilder.isSolvable} onClick={() => dispatch({ action: 'export_game' })}>
                        Exporter
                    </Button>
                </div>
            </div>
            <div className="border rounded-md p-2 bg-white flex gap-4 mx-auto mb-4" style={{ width: 'fit-content' }}>
                <div className="flex flex-col">
                    <p>Soluble: {gameBuilder.isSolvable ? 'oui' : 'non'}</p>
                    <p>Unique: {gameBuilder.isUnique === null ? 'N/A' : gameBuilder.isUnique ? 'oui' : 'non'}</p>
                    <p>Difficulté: XX</p>
                </div>
                <div className="flex flex-col">
                    <p>Pattern cumulés: {gameBuilder.virtualHistory.length}</p>
                    <p>Patterns simples: XX</p>
                    <p>Patterns complexes: XX</p>
                </div>
            </div>

            <div className="flex gap-4 items-center w-full justify-between">
                <div className="flex flex-col gap-4" style={{ width: '6%' }}>
                    <Button
                        className="border rounded-md p-2 flex justify-center"
                        onClick={() => dispatch({ action: 'add_random_restriction' })}
                    >
                        <Icon name="shuffle" size="sm" />
                    </Button>
                    <hr />
                    <Button
                        className={`border rounded-md p-2 flex justify-center ${gameBuilder.selectedRestriction === 'sun' ? 'border-2 border-black' : ''}`}
                        onClick={() => dispatch({ action: 'select_restriction', restriction: 'sun' })}
                    >
                        <Icon name="sun" size="sm" />
                    </Button>
                    <Button
                        className={`border rounded-md p-2 flex justify-center ${gameBuilder.selectedRestriction === 'moon' ? 'border-2 border-black' : ''}`}
                        onClick={() => dispatch({ action: 'select_restriction', restriction: 'moon' })}
                    >
                        <Icon name="moon" size="sm" />
                    </Button>
                    <Button
                        className={`border rounded-md p-2 flex justify-center ${gameBuilder.selectedRestriction === 'equal-horizontal' ? 'border-2 border-black' : ''}`}
                        onClick={() => dispatch({ action: 'select_restriction', restriction: 'equal-horizontal' })}
                    >
                        <Icon name="equal" size="sm" />
                        <Icon name="arrow-right" size="sm" />
                    </Button>
                    <Button
                        className={`border rounded-md p-2 flex justify-center ${gameBuilder.selectedRestriction === 'equal-vertical' ? 'border-2 border-black' : ''}`}
                        onClick={() => dispatch({ action: 'select_restriction', restriction: 'equal-vertical' })}
                    >
                        <Icon name="equal" size="sm" />
                        <Icon name="arrow-down" size="sm" />
                    </Button>
                    <Button
                        className={`border rounded-md p-2 flex justify-center ${gameBuilder.selectedRestriction === 'reversed-horizontal' ? 'border-2 border-black' : ''}`}
                        onClick={() => dispatch({ action: 'select_restriction', restriction: 'reversed-horizontal' })}
                    >
                        <Icon name="reversed" size="sm" />
                        <Icon name="arrow-right" size="sm" />
                    </Button>
                    <Button
                        className={`border rounded-md p-2 flex justify-center ${gameBuilder.selectedRestriction === 'reversed-vertical' ? 'border-2 border-black' : ''}`}
                        onClick={() => dispatch({ action: 'select_restriction', restriction: 'reversed-vertical' })}
                    >
                        <Icon name="reversed" size="sm" />
                        <Icon name="arrow-down" size="sm" />
                    </Button>
                </div>
                <div style={{ width: '30%' }} className={`virtual_constraints grid-${gameBuilder.grid}`}>
                    <Board board={gameBuilder} handleAction={handleAction} />
                </div>
                <div style={{ width: '30%' }} className={`virtual_constraints grid-${gameBuilder.grid}`}>
                    <VirtualBoard board={gameBuilder} />
                </div>
                <div className="border rounded-md p-2" style={{ width: '25%', minHeight: '580px', maxHeight: '650px' }}>
                    <p className="text-center font-bold">Actions devinées</p>
                    {gameBuilder.virtualHistory.map((virtualMove: VirtualMove, index: number) => (
                        <p key={index}>
                            {virtualMove.tileId} - <span className="uppercase">{virtualMove.dimension}</span> - {virtualMove.methodUsed}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    );
}
