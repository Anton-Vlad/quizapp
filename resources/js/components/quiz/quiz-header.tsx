import { Link, usePage } from '@inertiajs/react';
import { QuizIcon } from './quiz-icon';
import { AppThemeToggle } from '../app-theme-toggle';
import { SharedData } from '@/types';

export function QuizHeader() {
    const { quiz } = usePage<SharedData>().props;

    return (<>
        <div className="flex items-center h-15">
            {quiz ? (
                <Link href={route('home')} className="flex items-center gap-4 mr-auto">
                    <QuizIcon icon={quiz.icon} color={quiz.color} />
                    <span className="font-preset-4 font-medium">
                        {quiz.title}
                    </span>
                </Link>
            ) : (<div className="flex items-center gap-4 mr-auto"></div>)}

            <AppThemeToggle />
        </div>
    </>)
}