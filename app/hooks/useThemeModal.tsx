import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { getThemes, setTheme, getCurrentTheme } from '@/lib/theme';
import ThemeSample from '@/components/ThemeSample';
import { Theme as ThemeType } from '@/types/Theme.model';
import { SheetDescription, SheetHeader } from '@/components/ui/sheet';

const themes = getThemes();

const ThemeModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const [themeSelected, setThemeSelected] = useState(getCurrentTheme().name);

    function handleChooseTheme(theme: string) {
        setThemeSelected(theme);
    }

    function handleConfirmTheme() {
        setTheme(themeSelected);
        onClose();
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <SheetHeader>
                    <SheetDescription className='hidden'>Choix du thème</SheetDescription>
                </SheetHeader>
                <DialogTitle className="font-bold text-2xl text-center">Choix du thème</DialogTitle>
                {themes.map((theme: ThemeType, index: number) => (
                    <ThemeSample
                        key={index}
                        theme={theme}
                        themeSelected={themeSelected}
                        handleChooseTheme={handleChooseTheme}
                    />
                ))}

                <div className="modal-action-confirm">
                    <Button onClick={handleConfirmTheme}>Valider</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

const useThemeModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const openThemeModal = () => setIsOpen(true);
    const closeThemeModal = () => setIsOpen(false);

    return { ThemeModal: () => <ThemeModal isOpen={isOpen} onClose={closeThemeModal} />, openThemeModal };
};

export default useThemeModal;
