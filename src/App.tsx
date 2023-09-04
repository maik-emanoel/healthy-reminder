import { useState } from "react";
import { IMaskInput } from "react-imask";

import { ChevronRight } from "lucide-react";
import { InputWrapper } from "./components/InputWrapper";
import person from "./assets/person.svg";
import sticker from "./assets/sticker.png";

export function App() {
  const [dailyGoal, setDailyGoal] = useState<number>(50);
  const [quantity, setQuantity] = useState<number>(5);
  const [partialPercentage, setPartialPercentage] = useState(0);

  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);

  function turnIntoSeconds() {
    const hoursToSeconds = hours * 3600;
    const minutesToSeconds = minutes * 60;

    console.log(
      `Hora para segundos: ${hoursToSeconds}, Minutos para segundos: ${minutesToSeconds}`
    );
    return { hoursToSeconds, minutesToSeconds };
  }

  function timer() {
    const { hoursToSeconds, minutesToSeconds } = turnIntoSeconds();
    let totalSeconds = hoursToSeconds + minutesToSeconds;

    const decreaseTime = setInterval(() => {
      totalSeconds--;
      console.log(totalSeconds);

      if (totalSeconds === 0) {
        clearInterval(decreaseTime);
        const calcPercentage = (quantity / dailyGoal) * 100;
        const roundedPercentage = Math.round(calcPercentage)
        setPartialPercentage(
          (prevPercentage) => prevPercentage + roundedPercentage
        );

        if (partialPercentage >= 100) {
          setPartialPercentage(100);
        }
      }
    }, 100);
  }

  return (
    <div className="w-full h-screen bg-gray-500 text-gray-100">
      <main className="max-w-[690px] w-[90%] mx-auto pt-44">
        <header className="flex items-center gap-2 mb-[76px]">
          <div className="w-16 h-16 rounded-full bg-gray-200 grid place-items-center">
            <img src={sticker} alt="Avatar" />
          </div>
          <div className="flex flex-col gap-1 text-2xl leading-7">
            <span className="font-light">Boa tarde,</span>
            <span className="font-semibold">Biro 👋</span>
          </div>
        </header>

        <div className="flex justify-between">
          <div className="bg-blue text-[#1F2128] px-10 py-8 rounded-[20px] text-center w-52 h-[340px] flex flex-col">
            <span className="text-xs font-bold tracking-[0.36px] mb-10">
              {partialPercentage}%
            </span>
            <div className="flex-1">
              <img
                src={person}
                alt="Pessoa dando uma cambalhota"
                className="mx-auto"
              />
            </div>

            <strong className="text-xl">Alongar</strong>
            <p className="font-medium tracking-[0.48px]">
              Meta: <span>{dailyGoal}</span>x
            </p>
          </div>

          <div className="max-w-[320px] w-full flex flex-col justify-between">
            <InputWrapper
              id="inputDailyGoal"
              label="Meta diária"
              goal={dailyGoal}
              max={100}
              step={5}
              setFunction={setDailyGoal}
              value={dailyGoal}
            />
            <InputWrapper
              id="inputTimer"
              label="Quantidade por timer"
              goal={quantity}
              max={20}
              step={5}
              setFunction={setQuantity}
              value={quantity}
            />

            <div className="text-white flex items-center gap-3 mx-auto">
              <div className="timeInputWrapper">
                <IMaskInput
                  mask="00"
                  validate={(value) => {
                    return Number(value) <= 23;
                  }}
                  onAccept={(e) => {
                    setHours(Number(e));
                  }}
                  className="timeInput"
                  placeholder="00"
                />
                <span className="text-gray-200">h</span>
              </div>
              <span className="text-[32px]">:</span>
              <div className="timeInputWrapper">
                <IMaskInput
                  mask="00"
                  validate={(value) => {
                    return Number(value) <= 59;
                  }}
                  onAccept={(e) => {
                    setMinutes(Number(e));
                  }}
                  className="timeInput"
                  placeholder="00"
                />
                <span className="text-gray-200">m</span>
              </div>
            </div>
            <button
              onClick={() => {
                timer();
              }}
              className="bg-blue h-14 rounded-md text-gray-500 flex items-center justify-center gap-2"
            >
              <span className="font-medium tracking-[0.48px]">Começar</span>
              <ChevronRight />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
