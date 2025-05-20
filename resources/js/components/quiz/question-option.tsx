
type QuestionOptionProps = {
    body: string;
    icon: string;
    selected: boolean;
    onSelect: () => void;
};

export default function QuestionOpion({ body, icon, selected, onSelect }: QuestionOptionProps) {

    return (
        <li className={"question-list-item custom-drop-shadow mb-4 rounded-3xl flex items-center gap-4 p-6 cursor-pointer " + 
            (selected ? "selected-option" : "")}
            onClick={onSelect}
        >
            <span className="option-icon rounded-md p-2 font-preset-4 font-medium">
                    {icon}
            </span>
            <span className="font-preset-4 font-medium">
                    {body}
            </span>
        </li>
    )
}