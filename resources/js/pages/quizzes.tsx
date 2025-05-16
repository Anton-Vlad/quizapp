import QuizLayoutTemplate from '@/layouts/quiz-layout';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Quizzes() {
    const { auth } = usePage<SharedData>().props;

    return (
        <QuizLayoutTemplate title={<>Welcome to the<br/> <b>Frontend Quiz!</b></>}>
            <Head title="Quizzes"></Head>

            <div>
                Main Quizez
            </div>
        </QuizLayoutTemplate>
    );
}

