import { Appearance, useAppearance } from '@/hooks/use-appearance';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

import SunDarkSVG from '../../images/icon-sun-dark.svg';
import SunLightSVG from '../../images/icon-sun-light.svg';
import MoonDarkSVG from '@images/icon-moon-dark.svg';
import MoonLightSVG from '@images/icon-moon-light.svg';

export function AppThemeToggle() {
    const { appearance, updateAppearance } = useAppearance();

    const isDarkMode = appearance === 'dark';
    const sunIcon:string = appearance === 'dark' ? SunLightSVG : SunDarkSVG;
    const moonIcon:string = appearance === 'dark' ? MoonLightSVG : MoonDarkSVG;

    function onToggleTheme(): void {
        const newAppearance: Appearance = isDarkMode ? 'light' : 'dark';
        updateAppearance(newAppearance);
    }

    return (<>
        <div className="cursor-pointer flex gap-3 items-center theme-switcher">
            <Label htmlFor="theme-switch" className="text-2xl cursor-pointer">
                <img src={sunIcon} alt="Light Theme" width={24} height={24} />
            </Label>
            <Switch
                id="theme-switch"
                checked={isDarkMode}
                onCheckedChange={onToggleTheme}
                className="cursor-pointer"
            />
            <Label htmlFor="theme-switch" className="text-2xl cursor-pointer">
                <img src={moonIcon} alt="Dark Theme" width={24} height={24} />
            </Label>
        </div>
    </>)
}