interface InputWrapperProps {
  id: string;
  label: string;
  goal: number;
  max: number;
  step: number;
  setFunction: React.Dispatch<React.SetStateAction<number>>
  value: number
}

export function InputWrapper(prop: InputWrapperProps) {
  return (
    <div>
      <div>
        <label htmlFor={prop.id}>{prop.label}</label>
        <span>{prop.goal}x</span>
      </div>
      <input
        type="range"
        id={prop.id}
        max={prop.max}
        step={prop.step}
        onChange={(e) => prop.setFunction(Number(e.target.value))}
        value={prop.value}
      />
    </div>
  );
}
