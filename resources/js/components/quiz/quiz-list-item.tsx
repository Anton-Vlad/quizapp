import { Quiz } from "@/types";
import { QuizIcon } from "./quiz-icon";
import { Link } from "@inertiajs/react";


interface QuizListItemProps extends React.ComponentProps<'main'> {
    quiz: Quiz;
}

export default function QuizListItem({ quiz }: QuizListItemProps) {

    return (
        <li className="question-list-item mb-4 rounded-lg">
            <Link href={route('quiz', quiz.id)} className="flex items-center gap-4 p-6">
                <QuizIcon icon={quiz.icon} color={quiz.color} />
                <span className="font-preset-4 font-medium">
                        {quiz.title}
                </span>
            </Link>
        </li>
    )
}