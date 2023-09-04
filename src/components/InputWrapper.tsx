interface InputWrapperProps {
  id: string;
  label: string;
  goal: number;
  max: number;
  step: number;
  setFunction: React.Dispatch<React.SetStateAction<number>>;
  value: number;
}

export function InputWrapper(prop: InputWrapperProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center font-medium">
        <label
          htmlFor={prop.id}
          className="leading-4 tracking-[0.48px] text-blue"
        >
          {prop.label}
        </label>
        <span className="text-xs tracking-[0.36px] text-[#4E4964]">{prop.goal}x</span>
      </div>
      <input
        type="range"
        id={prop.id}
        max={prop.max}
        min={5}
        step={prop.step}
        onChange={(e) => prop.setFunction(Number(e.target.value))}
        value={prop.value}
      />
    </div>
  );
}
