import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Board } from '@/types/Board.model';
import { Button } from '@/components/ui/button';
import { SheetDescription, SheetHeader } from '@/components/ui/sheet';
import { addGameAlreadyPlayed } from '@/lib/gameHelper';

const useGameOverModal = (board: Board) => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (board?.gameOver) {
            setIsOpen(true);
            addGameAlreadyPlayed();
        }
    }, [board?.gameOver]);

    const closeModal = () => setIsOpen(false);

    const GameOverModal = () => (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <SheetHeader>
                <SheetDescription className='hidden'>Jeu terminé</SheetDescription>
            </SheetHeader>
            <DialogContent>
                <DialogTitle>Game Over</DialogTitle>
                <p>The game has ended. Try again?</p>
                <Button onClick={closeModal}>Close</Button>
            </DialogContent>
        </Dialog>
    );

    return { GameOverModal };
};

export default useGameOverModal;
