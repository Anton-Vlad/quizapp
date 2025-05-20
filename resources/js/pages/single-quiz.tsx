import QuizListItem from '@/components/quiz/quiz-list-item';
import QuizLayoutTemplate from '@/layouts/quiz-layout';
import { Quiz, type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function SingleQuiz() {
    const { auth, anonUserId, userId, quiz, question, quiz_progress } = usePage<SharedData>().props;

    const mainTitle = (<>
        {question.body}
    </>);
    const mainDescription = `Progress: ${quiz_progress[0]} of ${quiz_progress[1]}`;

    console.log(quiz)

    return (
        <QuizLayoutTemplate title={mainTitle} description={mainDescription}>
            <Head title="Quizzes"></Head>

            
            
        </QuizLayoutTemplate>
    );
}

