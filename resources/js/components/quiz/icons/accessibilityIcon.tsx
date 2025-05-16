import iconAccesability from '../../../../images/icon-accessibility.svg';

export function AccessibilityIcon() {
    return (<>
        <div className="rounded-md flex p-2" style={{background: 'var(--purple-100)'}}>
            <img src={iconAccesability} alt="accessibility icon" width="40" height="40" />
        </div>
    </>);
}