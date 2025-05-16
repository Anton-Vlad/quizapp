import { AccessibilityIcon } from '../../components/quiz/icons/accessibilityIcon';
import { AppThemeToggle } from '../app-theme-toggle';

export function QuizHeader() {

    return (<>
        <div className="flex items-center">
            <div className="flex items-center gap-4 mr-auto">
                <AccessibilityIcon />
                <span className="font-preset-4 font-medium">
                    Accessibility
                </span>
            </div>

            <AppThemeToggle />
        </div>
    </>)
}