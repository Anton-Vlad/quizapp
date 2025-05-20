import QuizListItem from '@/components/quiz/quiz-list-item';
import QuizLayoutTemplate from '@/layouts/quiz-layout';
import { Quiz, type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function SingleQuiz() {
    const { auth, anonUserId, userId, quiz } = usePage<SharedData>().props;

    const mainTitle = (<>
        Single Quiz page
    </>);
    const mainDescription = "Pick a subject to get started.";

    console.log(quiz)

    return (
        <QuizLayoutTemplate title={mainTitle} description={mainDescription}>
            <Head title="Quizzes"></Head>

            
            
        </QuizLayoutTemplate>
    );
}

