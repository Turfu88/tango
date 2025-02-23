import { Theme as ThemeType } from '@/types/Theme.model';
import Icon from '@/components/Icon';

export default function ThemeSample({theme, themeSelected, handleChooseTheme}: {theme: ThemeType, themeSelected: string, handleChooseTheme: (themeName: string) => void}) {

    return (
        <div className={`p-2 rounded-lg ${themeSelected === theme.name && 'border-2 border-black'}`} onClick={() => handleChooseTheme(theme.name)}>
            <p className='text-center mb-4 font-bold text-2xl'>{theme.nameFront}</p>
            <div className="flex gap-4 justify-center">
                <Icon name={theme.symbols[1]} size={'lg'} />
                <Icon name={theme.symbols[2]} size={'lg'} />
            </div>
        </div>
    );
}