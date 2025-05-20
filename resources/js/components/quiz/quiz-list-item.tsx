import { Quiz } from "@/types";
import { QuizIcon } from "./quiz-icon";


interface QuizListItemProps extends React.ComponentProps<'main'> {
    quiz: Quiz;
}

export default function QuizListItem({ quiz }: QuizListItemProps) {

    return (<>
        <li className="question-list-item flex items-center gap-4 rounded-lg mb-4 p-6">
            <QuizIcon icon={quiz.icon} color={quiz.color} />
            <span className="font-preset-4 font-medium">
                    {quiz.title}
            </span>
        </li>
    </>)
}