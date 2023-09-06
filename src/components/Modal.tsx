// import { X } from "lucide-react";
import { useState } from "react";
import { touchIsSupported } from "../utils/touchUtil";

interface ModalProps {
  userName: string | null;
  setFunction: React.Dispatch<React.SetStateAction<string | null>>;
}

export function Modal(props: ModalProps) {
  const [inputNameValue, setInputNameValue] = useState<string | null>(null)

  return (
    <div className="absolute inset-0 bg-[#121317]/70 grid place-items-center">
      <div className="bg-gray-400 rounded-3xl shadow-[17px_25px_57px_0px_rgba(17,16,24,0.25)] relative min-w-[300px] pt-16 px-11 pb-10">
        {/* <button className="absolute top-[14px] right-3 w-8 h-8 grid place-items-center rounded-full bg-gray-200">
          <X />
        </button> */}

        <div>
          <div className="flex flex-col gap-2 mb-8">
            <label htmlFor="inputName" className="tracking-[0.48px] text-blue">
              Nome
            </label>
            <input
              type="text"
              placeholder="Digite seu nome"
              id="inputName"
              className="rounded-md py-1 px-3 bg-gray-300 border border-gray-200 leading-8 tracking-[0.96px] outline-none focus:border-blue placeholder:text-gray-100/20"
              onChange={(e) => setInputNameValue(e.target.value)}
            />
          </div>

          <button
            data-istouchsupported={touchIsSupported}
            className="w-full bg-blue h-10 rounded-md text-gray-500 flex items-center justify-center gap-2 cursor-pointer transition-all duration-300
            data-[istouchsupported=false]:hover:brightness-110"
            onClick={() => {
              if (inputNameValue === null) {
                alert("Insira seu nome, por favor!");
                return
              }

              props.setFunction(inputNameValue)
            }}
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
