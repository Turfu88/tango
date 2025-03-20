import Button from '@/components/Button';
import CurrentPuzzle from '@/components/CurrentPuzzle';
import Board from '@/components/Board';
import { Board as BoardType } from '@/types/Board.model';
import game_4_1 from '@/ressources/games/game_4_1.json';
import { useReducer, useEffect } from 'react';
import { gameActionsReducer } from '@/reducers/gameActionsReducer';
import useGameOverModal from '@/hooks/useGameOverModal';
import useGameRulesModal from '@/hooks/useGameRulesModal';
import useThemeModal from '@/hooks/useThemeModal';
import useGameChoiceModal from '@/hooks/useGameChoiceModal';
import { getCurrentgame, setCurrentGame, getNextGame } from '@/lib/gameHelper';
const gameData: BoardType = game_4_1 as BoardType;


// Quand on aura plus de parties jouables :
// Dans le carousel, afficher la page contenant la partie en cours (voire même la partie actuelle)

// Télécharger un jeu avec fetch
// Ajouter un bouton permettant d'obtenir un indice et mettant en surbrillance une cellule d'une colonne ou rangée


export function GameArea() {
    const initialGame = getCurrentgame();
    const [game, dispatch] = useReducer(gameActionsReducer, gameData);

    const { GameOverModal } = useGameOverModal(game);
    const { GameRulesModal, openGameRulesModal } = useGameRulesModal();
    const { GameChoiceModal, openGameChoiceModal, selectedGame } = useGameChoiceModal();
    const { ThemeModal, openThemeModal } = useThemeModal();
    const nextGame = getNextGame();

    const changeGame = async (gamePath: string) => {
        try {
            setCurrentGame(gamePath);
            const module = await import(`@/ressources/games/${gamePath}.json`);
            if (!module) {
                throw new Error(`Le module ${gamePath} ne contient pas d'export par défaut.`);
            }
            const board: BoardType = module.default as BoardType;
            dispatch({ action: "change_game", board });
        } catch (err) {
            console.error("Erreur de chargement du jeu :", err);
        }
    };

    function handleUndoMove(): void {
        dispatch({ action: 'undo_change_tile' });
    }

    function handleResetGame(): void {
        dispatch({ action: 'reset_game' });
    }

    function handleUserAction(id: number): void {
        dispatch({ action: 'change_tile', tileId: id });
    }

    function handleSearchErrors(): void {
        dispatch({ action: 'search_errors' });
    }

    function handleSetNextGame(): void {    
        if (nextGame !== null) {
            window.location.replace('/?game=' + nextGame);
        }
    }

    useEffect(() => {
        changeGame(selectedGame ?? initialGame);
    }, [selectedGame, initialGame]);

    return (
        <div className="game-area">
            <div className="top-board">
                <div className="w-24">
                    <Button icon={'grid'} variant="btn-icon" handleAction={openGameChoiceModal} />
                </div>
                <CurrentPuzzle id={game.id} />
                <div className="flex gap-2">
                    <Button icon={'palette'} variant="btn-icon" handleAction={openThemeModal} />
                    <Button icon={'info-circle'} variant="btn-icon" handleAction={openGameRulesModal} />
                </div>
            </div>
            <hr className='my-2' />
            <div className="top-board mb-10">
                <Button icon={'back-square'} variant="outlined" handleAction={handleUndoMove}>
                    Retour
                </Button>
                <Button icon={'search'} variant="outlined" handleAction={handleSearchErrors}>
                    Erreur ?
                </Button>
                <Button icon={'delete'} variant="outlined" handleAction={handleResetGame}>
                    Effacer
                </Button>
            </div>
            <Board board={game} handleAction={handleUserAction} />
            {game.gameOver === true && nextGame !== null &&
                <div className="modal-action-confirm">
                    <Button variant="outlined" handleAction={handleSetNextGame}>
                        Puzzle suivant
                    </Button>
                </div>
            }
            <GameRulesModal />
            <ThemeModal />
            <GameChoiceModal />
            <GameOverModal />
        </div>
    );
}
