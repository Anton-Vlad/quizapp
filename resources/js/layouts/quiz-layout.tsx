import { QuizHeader } from '@/components/quiz/quiz-header';
import { Link } from '@inertiajs/react';
import { ReactElement, useState, type PropsWithChildren } from 'react';


interface QuizLayoutProps {
    name?: string;
    title?: ReactElement,
    description?: string
}

export default function QuizLayout({ children, title, description }: PropsWithChildren<QuizLayoutProps>) {

 
    return (<>

        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-[1160px] pt-20 sm:pt-24 min-h-svh font-rubik-variable mb-6">

            <QuizHeader />

            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-[126px] pt-20 sm:pt-24">
                <div className="flex-1 min-w-0">
                    <h1 className="text-6xl font-light mb-4" style={{marginBottom: '3rem'}}>
                        {title}
                    </h1>

                    <p className='font-italic font-preset-6 text-muted'>
                        {description}
                    </p>
                </div>
                
                <div className="flex-1 min-w-0">
                    {children}
                </div>
            </div>

        </div>
    </>);
}