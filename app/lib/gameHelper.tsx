import games_list from '@/ressources/games_list.json';

export function getCurrentgame(): string {
    const gameFromUrl = new URLSearchParams(window.location.search).get('game');
    if (gameFromUrl && gameExists(`game_${gameFromUrl}`)) {
        return `game_${gameFromUrl}`;
    }
    const gameFromStorage = localStorage.getItem('game');
    if (!gameFromStorage) {
        return 'game_4_1';
    }
    return gameFromStorage;
}

export function setCurrentGame(game: string): void {
    let urlParams = new URLSearchParams(window.location.search);
    urlParams.set('game', game.replace('game_', ''));
    urlParams.toString(); 
    window.history.replaceState({}, '', `?${urlParams.toString()}`);
    localStorage.setItem('game', game);
}

export function getCurrentGrid(): string {
    const currentGame = getCurrentgame();
    const grid = currentGame.split('_')[1];
    return `${grid}x${grid}`;
}

export function getGamesAlreadyPlayed(): string[] {
    const gamesFromStorage = localStorage.getItem('gamesPlayed');
    if (!gamesFromStorage) {
        localStorage.setItem('gamesPlayed', JSON.stringify([]));
        return [];
    }
    return JSON.parse(gamesFromStorage);
}

export function addGameAlreadyPlayed(): void {
    const currentGame = getCurrentgame();
    const gamesFromStorage = getGamesAlreadyPlayed();
    gamesFromStorage.push(currentGame);
    localStorage.setItem('gamesPlayed', JSON.stringify(gamesFromStorage));
}

export function gameExists(game: string): boolean {
    const allGamesList = Object.values(games_list);
    return allGamesList.some(array => array.includes(game));
}
