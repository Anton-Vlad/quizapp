import QuizListItem from '@/components/quiz/quiz-list-item';
import QuizLayoutTemplate from '@/layouts/quiz-layout';
import { Quiz, type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Quizzes() {
    const { auth, anonUserId, userId, quizzes } = usePage<SharedData>().props;

    return (
        <QuizLayoutTemplate title={<>Welcome to the<br/> <b>Frontend Quiz!</b></>}>
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

