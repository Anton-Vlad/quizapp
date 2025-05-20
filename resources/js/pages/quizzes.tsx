import QuizListItem from '@/components/quiz/quiz-list-item';
import QuizLayoutTemplate from '@/layouts/quiz-layout';
import { Quiz, type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Quizzes() {
    const { auth, anonUserId, userId, quizzes } = usePage<SharedData>().props;

    const mainTitle = (<>
        Welcome to the<br/> <b>Frontend Quizz!</b>
    </>);
    const mainDescription = "Pick a subject to get started.";

    return (
        <QuizLayoutTemplate title={mainTitle} titleClass="text-6xl font-light" description={mainDescription}>
            <Head title="Quizzes"></Head>

            {quizzes?.length ? (
                <ul>
                    {quizzes.map((quiz: Quiz) => (
                        <QuizListItem  key={quiz.id} quiz={quiz} />
                    ))}
                </ul>
            ) : (
                <p>No quizzes availbale.</p>
            )}
            
        </QuizLayoutTemplate>
    );
}

