import QuestionOption from '@/components/quiz/question-option';
import QuizLayoutTemplate from '@/layouts/quiz-layout';
import { Quiz, Question, type SharedData } from '@/types';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { useState } from 'react';

import IncorrectSVG from '../../images/icon-incorrect.svg';
import { error } from 'console';

export default function SingleQuiz() {
    const { quiz, question, quiz_progress, corrent_answer, answer_feedback } = usePage<SharedData>().props;

    const mainTitle = (question ? <>
        {question.body}
    </> : <></>);

    const progressDescription = `Question ${quiz_progress?.current_index} of ${quiz_progress?.total}`;

    const options = ['A', 'B', 'C', 'D', 'E', 'F'];
    const [selectedOption, setSelectedOption] = useState("");
    const [validationError, setValidationError] = useState("");
    const [questionSubmitted, setQuestionSubmitted] = useState(false);

    const handleOnSelect = (option: string) => {
        if (!questionSubmitted) {
            setSelectedOption(selectedOption === option ? "" : option)
        }
    }

    const submitQuestion = (): void => {
        setValidationError("");

        router.post(
            route('question.submit', quiz?.id), {
                answer: selectedOption,
            },
            {
                preserveScroll: true,
                preserveState: true,
                replace: true,
                onError: (errors) => {
                    setValidationError(errors.answer)
                },
                onSuccess: () => {
                    setQuestionSubmitted(true);
                }
            }
        );
    }

    const nextQuestion = (): void => {
         router.visit(
            route('question.next', quiz?.id),
            {
                method: 'post',
                preserveScroll: false,
                preserveState: false,
                replace: true,
                onError: (errors) => {
                    console.log(errors)
                },
            }
        );
    }

    return (
        <QuizLayoutTemplate title={mainTitle} titleClass="font-preset-3 font-medium min-h-100"
            progressDescription={progressDescription}
            progressPercent={quiz_progress?.percent}
        >
            <Head title={quiz?.title + " - Quizzes"}></Head>

            {question?.options ? (
                <ul>
                    {question.options.map((option: string, index) => (
                        <QuestionOption key={index + '-' + question.id}
                            body={option}
                            selected={selectedOption === option}
                            icon={options[index]}
                            onSelect={() => handleOnSelect(option)}
                            isCorrect={(corrent_answer === option)}
                            isWrong={(selectedOption === option && !answer_feedback && questionSubmitted)}
                            isDisabled={questionSubmitted}
                        />
                    ))}
                </ul>
            ) : (
                <p>No quizzes availbale.</p>
            )}

            {questionSubmitted ? 
                <button className="block p-6 mt-8 custom-drop-shadow main-accent-bg rounded-3xl font-preset-4 font-medium text-align w-full bg-pink-300 text-white cursor-pointer"
                    onClick={nextQuestion}
                >
                    <span>Next</span>
                </button> : 
                <button className="block p-6 mt-8 custom-drop-shadow main-accent-bg rounded-3xl font-preset-4 font-medium text-align w-full bg-pink-300 text-white cursor-pointer"
                    onClick={submitQuestion}
                >
                    <span>Submit answer</span>
                </button>
            }

            {validationError ? <>
            <p className="flex items-center justify-center gap-2 mt-4 font-preset-5">
                <img src={IncorrectSVG} alt="incrrect icon" />
                {validationError}
            </p>
            </> : ""}

        </QuizLayoutTemplate>
    );
}

