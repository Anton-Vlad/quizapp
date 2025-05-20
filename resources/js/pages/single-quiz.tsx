import QuestionOption from '@/components/quiz/question-option';
import QuizLayoutTemplate from '@/layouts/quiz-layout';
import { Quiz, Question, type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function SingleQuiz() {
    const { auth, anonUserId, userId, quiz, question, quiz_progress } = usePage<SharedData>().props;

    const mainTitle = (question ? <>
        {question.body}
    </> : <></>);

    const mainDescription = `Progress: ${quiz_progress[0]} of ${quiz_progress[1]}`;

    const options = ['A', 'B', 'C', 'D', 'E', 'F'];
    const [selectedOption, setSelectedOption] = useState("");

    const handleOnSelect = (option: string) => {
        console.log('User selected:', option);

        setSelectedOption(option)
    }

    return (
        <QuizLayoutTemplate title={mainTitle} titleClass="font-preset-3 font-medium" description={mainDescription}>
            <Head title="Quizzes"></Head>

            {question?.options ? (
                <ul>
                    {question.options.map((option: string, index) => (
                        <QuestionOption key={index + '-' + question.id} 
                            body={option} 
                            selected={selectedOption === option}
                            icon={options[index]} 
                            onSelect={() => handleOnSelect(option)} 
                        />
                    ))}
                </ul>
            ) : (
                <p>No quizzes availbale.</p>
            )}

            <button className="block p-6 mt-8 custom-drop-shadow main-accent-bg rounded-3xl font-preset-4 font-medium text-align w-full bg-pink-300 text-white cursor-pointer">
                Submit answer
            </button>

        </QuizLayoutTemplate>
    );
}

