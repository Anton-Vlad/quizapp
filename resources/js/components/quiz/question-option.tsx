import CorrectSVG from '../../../images/icon-correct.svg';
import IncorrectSVG from '../../../images/icon-incorrect.svg';

type QuestionOptionProps = {
    body: string;
    icon: string;
    selected: boolean;
    isCorrect: boolean;
    isWrong: boolean;
    isDisabled: boolean;
    onSelect: () => void;
};

export default function QuestionOption({ body, icon, selected, isCorrect, isWrong, isDisabled, onSelect }: QuestionOptionProps) {

    return (
        <li className={"question-list-item custom-drop-shadow mb-4 rounded-3xl " + 
            (selected ? " selected-option" : "") + 
            (isWrong ? " wrong-option" : "") + 
            (isCorrect ? " correct-option" : "") + 
            (isDisabled ? " disabled" : "")
        }
        >
            <button className="w-full flex items-center justify gap-4 p-6 cursor-pointer rounded-3xl focus:outline-none focus:ring-3 focus:ring-blue-300 focus:ring-offset-2" 
                onClick={onSelect}
            >
                <span className="option-icon rounded-md p-2 font-preset-4 font-medium">
                        {icon}
                </span>
                <span className="font-preset-4 font-medium text-left">
                        {body}
                </span>

                {isCorrect ? <>
                    <img src={CorrectSVG} alt="corrent-svg" className="ms-auto me-0" />
                </> : ""}
                {isWrong ? <>
                    <img src={IncorrectSVG} alt="incorrent-svg" className="ms-auto me-0" />
                </> : ""}
            </button>
        </li>
    )
}