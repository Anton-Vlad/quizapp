import { usePage } from '@inertiajs/react';
import { QuizIcon } from '../../components/quiz/icons/quiz-icon';
import { AppThemeToggle } from '../app-theme-toggle';
import { SharedData } from '@/types';

export function QuizHeader() {
    const { quiz } = usePage<SharedData>().props;

    return (<>
        <div className="flex items-center">
            {quiz ? (
                <div className="flex items-center gap-4 mr-auto">
                    <QuizIcon icon={quiz.icon} color={quiz.color} />
                    <span className="font-preset-4 font-medium">
                        {quiz.title}
                    </span>
                </div>
            ) : (<div className="flex items-center gap-4 mr-auto"></div>)}

            <AppThemeToggle />
        </div>
    </>)
}