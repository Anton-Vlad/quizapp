import QuestionOption from '@/components/quiz/question-option';
import { QuizIcon } from '@/components/quiz/quiz-icon';
import QuizLayoutTemplate from '@/layouts/quiz-layout';
import { type SharedData } from '@/types';
import { Head, Link, usePage, router } from '@inertiajs/react';

export default function SingleQuiz() {
    const { quiz, quiz_score, quiz_total } = usePage<SharedData>().props;

    const mainTitle = <>
        Quiz completed<br/> <b>You scored...</b>
    </>;

        return (
            <QuizLayoutTemplate title={mainTitle} titleClass="text-6xl font-light">
                <Head title="Quizzes"></Head>

                <div className={"question-list-item custom-drop-shadow p-12 rounded-3xl flex flex-col justify-center content-end" }>
                    {quiz ? 
                    <div className="flex items-center gap-4 justify-center">
                        <QuizIcon icon={quiz.icon} color={quiz.color} />
                        <span className="font-preset-4 font-medium">
                            {quiz.title}
                        </span>
                    </div> : ""}
                    <h3 className="font-preset-1 text-center mb-4 mt-8 font-bold">
                        {quiz_score}
                    </h3>
                    <p className="font-preset-6 text-muted m-0 p-0 text-center">out of {quiz_total}</p>
                </div>

                <button className="block p-6 mt-8 custom-drop-shadow main-accent-bg rounded-3xl font-preset-4 font-medium text-align w-full bg-pink-300 text-white cursor-pointer"
                    onClick={() => {}}
                >
                    <span>Play Again</span>
                </button>
            </QuizLayoutTemplate>
        )

}