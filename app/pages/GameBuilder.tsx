import { Button } from '@/components/ui/button';
import games_list from '@/ressources/games_list.json';
import { BoardUtils } from '@/lib/boardHelper';

export function GameBuilder() {
    const gamesPerPage = 10000;
    const games_4x4 = BoardUtils.getSplitGames(games_list.grid_4x4, gamesPerPage);
    const games_6x6 = BoardUtils.getSplitGames(games_list.grid_6x6, gamesPerPage);
    const games_8x8 = BoardUtils.getSplitGames(games_list.grid_8x8, gamesPerPage);

    return (

        <div className="flex flex-col justify-center h-screen">
            <div className="bg-white rounded-lg border px-4 py-4 mx-6">
                <p className='text-center mb-4 font-bold text-2xl'>Game builder</p>
                <div className='flex justify-between'>
                    <div>
                        <a href="/game-builder/editor?grid=4">
                            <Button>Editeur 4x4</Button>
                        </a>
                        {games_4x4.map((games, index) => (
                            <div key={index} className="p-1">
                                {games.map((game, index) => (
                                    <div key={index} className="pb-2 flex justify-between items-center w-full">
                                        <p className="w-8">#{game.split('_')[2]}</p>
                                        <Button className="primary">Jouer</Button>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                    <div>
                        <a href="/game-builder/editor?grid=6">
                            <Button>Editeur 6x6</Button>
                        </a>
                        {games_6x6.map((games, index) => (
                            <div key={index} className="p-1">
                                {games.map((game, index) => (
                                    <div key={index} className="pb-2 flex justify-between items-center w-full">
                                        <p className="w-8">#{game.split('_')[2]}</p>
                                        <Button className="primary">Jouer</Button>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                    <div>
                        <a href="/game-builder/editor?grid=8">
                            <Button>Editeur 8x8</Button>
                        </a>
                        {games_8x8.map((games, index) => (
                            <div key={index} className="p-1">
                                {games.map((game, index) => (
                                    <div key={index} className="pb-2 flex justify-between items-center w-full">
                                        <p className="w-8">#{game.split('_')[2]}</p>
                                        <Button className="primary">Jouer</Button>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                    <div>
                        <a href="/game-builder/sandbox">
                            <Button>Sandbox</Button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
