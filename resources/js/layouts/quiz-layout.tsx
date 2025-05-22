import { QuizHeader } from '@/components/quiz/quiz-header';
import { SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { ReactElement, useEffect, useState, type PropsWithChildren } from 'react';


interface QuizLayoutProps {
    name?: string;
    title?: ReactElement;
    description?: string;
    titleClass?: string;
    progressDescription?: string;
    progressPercent?: string;
}

export default function QuizLayout({ children, title, description, titleClass, progressDescription, progressPercent }: PropsWithChildren<QuizLayoutProps>) {
    const { quiz } = usePage<SharedData>().props;

    useEffect(() => {
        if (quiz) {
            const mainColor = `var(--${quiz.color}-fg)`;
            document.documentElement.style.setProperty('--main-accent', mainColor);
        }
    }, [quiz]);

    return (<>

        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-[1160px] pt-14 sm:pt-18 min-h-svh font-rubik-variable">

            <QuizHeader />

            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-[126px] pt-14 sm:pt-18">
                <div className="flex-1 min-w-0">
                    {progressDescription ? (<p className='font-italic font-preset-6 text-muted mb-6'>
                        {progressDescription}
                    </p>) : ""}

                    <h1 className={titleClass + " mb-4"}>
                        {title}
                    </h1>

                    <p className='font-italic font-preset-6 text-muted'>
                        {description}
                    </p>
                    
                    {progressPercent ? (<div className="question-progress-bar">
                        <div className="question-progress-bar__inner" style={{width: progressPercent}}></div>
                    </div>) : ""}
                </div>

                <div className="flex-1 min-w-0">
                    {children}
                </div>
            </div>

        </div>
    </>);
}