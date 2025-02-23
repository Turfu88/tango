const defaultTheme = {
    name: 'default',
    color: 'green',
    symbols: ['', 'sun', 'moon']
};

const themes = [
    {
        name: 'default',
        nameFront: 'Par défaut',
        color: 'green',
        symbols: ['', 'sun', 'moon']
    },
    {
        name: 'china',
        nameFront: 'China',
        color: 'green',
        symbols: ['', 'panda', 'bamboo']
    },
    {
        name: 'floral',
        nameFront: 'Floral',
        color: 'pink',
        symbols: ['', 'flower', 'truck']
    }
];

export function getCurrentTheme() {
    const themeFromStorage = localStorage.getItem('theme');
    const selectedTheme = themes.find(theme => theme.name === themeFromStorage);
    if (!selectedTheme) {
        return defaultTheme;
    }
    return selectedTheme;
}

export function getSymbols() {
    const themeFromStorage = localStorage.getItem('theme');
    const selectedTheme = themes.find(theme => theme.name === themeFromStorage);
    if (!selectedTheme) {
        return defaultTheme.symbols;
    }
    return selectedTheme.symbols;
}

export function getThemes() {
    return themes;
}

export function setTheme(theme: string) {
    localStorage.setItem('theme', theme);
}
