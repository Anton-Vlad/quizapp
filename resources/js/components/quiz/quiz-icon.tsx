
interface QuizIconProps extends React.ComponentProps<'main'> {
    icon: string;
    color: string
}

export function QuizIcon({ icon, color }: QuizIconProps) {

    const background = `var(--${color}-bg)`;
    const borderColor = `var(--${color}-fg)`;


    return (<>
        <div className="rounded-md flex p-2" style={{background: background, border: `2px solid ${borderColor}`}}>
            <img src={icon} alt="accessibility icon" width="40" height="40" />
        </div>
    </>);
}