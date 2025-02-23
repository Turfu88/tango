import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/components/ui/tabs';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import { SheetDescription, SheetHeader } from '@/components/ui/sheet';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import games_list from '@/ressources/games_list.json';
import { BoardUtils } from '@/lib/boardHelper';
import Icon from '@/components/Icon';
import { getGamesAlreadyPlayed, getCurrentGrid } from '@/lib/gameHelper';


const GameChoiceModal = ({ isOpen, onClose, onSelect }: { isOpen: boolean; onClose: () => void; onSelect: (game: string) => void }) => {
    const gamesPerPage = 10;
    const games_4x4 = BoardUtils.getSplitGames(games_list.grid_4x4, gamesPerPage);
    const games_6x6 = BoardUtils.getSplitGames(games_list.grid_6x6, gamesPerPage);
    const games_8x8 = BoardUtils.getSplitGames(games_list.grid_8x8, gamesPerPage);
    const gamesAlreadyPlayed = getGamesAlreadyPlayed();
    const currentGrid = getCurrentGrid()

    const allGames = [
        {
            name: '4x4',
            games: games_4x4,
        },
        {
            name: '6x6',
            games: games_6x6,
        },
        {
            name: '8x8',
            games: games_8x8,
        },
    ];

    const handleGameSelect = (game: string) => {
        onSelect(game);
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <SheetHeader>
                    <SheetDescription className='hidden'>Choix du niveau</SheetDescription>
                </SheetHeader>
                <DialogTitle className="modal-title">Choix du niveau</DialogTitle>

                <Tabs defaultValue={currentGrid} className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                        {allGames.map((game, index) => (
                            <TabsTrigger key={index} value={game.name}>{game.name}</TabsTrigger>
                        ))}
                    </TabsList>
                    {allGames.map((gameByGrid, index) => (
                        <TabsContent key={index} value={gameByGrid.name}>
                            <div className="flex justify-center">
                                <Carousel className="w-full max-w-xs" opts={{ startIndex: 0 }}>
                                    <CarouselContent>
                                        {gameByGrid.games.map((games, index) => (
                                            <CarouselItem key={index}>
                                                <div className="p-1">
                                                    <Card>
                                                        <CardContent className="flex aspect-square items-start p-6 flex-col">
                                                            {games.map((game, index) => (
                                                                <div key={index} className="pb-2 flex justify-between items-center w-full">
                                                                    <p className="w-8">#{game.split('_')[2]}</p>
                                                                    <Icon name={gamesAlreadyPlayed.includes(game) ? 'square-check' : 'square'} size={'md'} />
                                                                    <Button className="primary" onClick={() => handleGameSelect(game)}>Jouer</Button>
                                                                </div>
                                                            ))}
                                                        </CardContent>
                                                    </Card>
                                                </div>
                                            </CarouselItem>
                                        ))}
                                    </CarouselContent>
                                    <CarouselPrevious />
                                    <CarouselNext />
                                </Carousel>
                            </div>
                        </TabsContent>
                    ))}
                </Tabs>
            </DialogContent>
        </Dialog>
    );
};

const useGameChoiceModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedGame, setSelectedGame] = useState<string | null>(null);

    const openGameChoiceModal = () => setIsOpen(true);
    const closeGameChoiceModal = () => setIsOpen(false);

    const handleGameSelect = (game: string) => {
        setSelectedGame(game);
        closeGameChoiceModal();
    };

    return {
        GameChoiceModal: () => <GameChoiceModal isOpen={isOpen} onClose={closeGameChoiceModal} onSelect={handleGameSelect} />,
        openGameChoiceModal,
        selectedGame
    };
};

export default useGameChoiceModal;
