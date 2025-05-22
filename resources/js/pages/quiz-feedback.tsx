import QuestionOption from '@/components/quiz/question-option';
import QuizLayoutTemplate from '@/layouts/quiz-layout';
import { Quiz, Question, type SharedData } from '@/types';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { useState } from 'react';

export default function SingleQuiz() {
    const { quiz } = usePage<SharedData>().props;

    const mainTitle = <>
        Quiz completed<br/> <b>You scored...</b>
    </>;

        return (
            <QuizLayoutTemplate title={mainTitle} titleClass="text-6xl font-light">
                <Head title="Quizzes"></Head>

                Finl score
            </QuizLayoutTemplate>
        )

}