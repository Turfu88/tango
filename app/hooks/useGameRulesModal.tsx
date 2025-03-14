import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { SheetDescription, SheetHeader } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import Icon from '@/components/Icon';
import { getSymbols } from "@/lib/theme";

const useGameOverModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const theme = getSymbols();
    const openGameRulesModal = () => setIsOpen(true);
    const closeGameRulesModal = () => setIsOpen(false);

    const GameRulesModal = () => (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent aria-describedby={"game rule modal"}>
                <SheetHeader>
                    <SheetDescription className='hidden'>Règles du jeu</SheetDescription>
                </SheetHeader>
                <DialogTitle className="modal-title">Règles du jeu</DialogTitle>
                <p>Le but du jeu est de remplir chaque cellule avec un <Icon name={theme[1]} size="sm" /> ou un <Icon name={theme[2]} size="sm" />. Cependant :</p>
                <p>- Il ne doit pas y avoir plus de 2 symboles identiques l'un à côté de l'autre.</p>
                <p>- Chaque ligne et chaque colonne doit comporter un nombre égal de <Icon name={theme[1]} size="sm" /> et de <Icon name={theme[2]} size="sm" />.</p>
                <p>- Les cellules séparées par un = doivent être le même symbole.</p>
                <p>- Les cellules séparées par × doivent être de symbole opposés.</p>
                <p>- Chaque puzzle comporte une seule bonne réponse et peut être résolue par déduction.</p>

                <div className="modal-action-confirm">
                    <Button className="" onClick={closeGameRulesModal}>
                        J'ai compris !
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );

    return { GameRulesModal, openGameRulesModal };
};

export default useGameOverModal;
