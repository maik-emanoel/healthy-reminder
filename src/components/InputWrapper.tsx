interface InputWrapperProps {
    id: string,
    label: string
}

export function InputWrapper(prop: InputWrapperProps) {
    return (
        <div>
            <div>
                <label htmlFor={prop.id}>{prop.label}</label>
                <span>10x</span>
            </div>
            <input type="range" id={prop.id} />
        </div>
    )
}