import { useEffect, useRef } from "react";

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
  const inputRangeRef = useRef<HTMLInputElement | null>(null)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleInputColor(e: any) {
    const progress = (Number(e.target.value) / Number(e.target.max)) * 100 

    if(inputRangeRef.current) {
      inputRangeRef.current.style.background = `linear-gradient(to right, #7FC4ED ${progress}%, #322F40 ${progress}%)`
    }
  }

  useEffect(() => {
    if (inputRangeRef.current) {
      handleInputColor({ target: inputRangeRef.current });
    }
  }, []); 

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between items-center font-medium">
        <label
          htmlFor={prop.id}
          className="leading-4 tracking-[0.48px] text-blue mb-1"
        >
          {prop.label}
        </label>
        <span className="text-xs tracking-[0.36px] text-[#4E4964]">
          {prop.goal}x
        </span>
      </div>
      <input
        type="range"
        id={prop.id}
        max={prop.max}
        step={prop.step}
        onChange={(e) => {
          prop.setFunction(Number(e.target.value));
          handleInputColor(e)
        }}
        value={prop.value}
        ref={inputRangeRef}
      />
    </div>
  );
}


