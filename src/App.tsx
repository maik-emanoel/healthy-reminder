import { useEffect, useState } from "react";
import { IMaskInput } from "react-imask";

import { ChevronRight } from "lucide-react";
import { InputWrapper } from "./components/InputWrapper";
import person from "./assets/person.svg";
import sticker from "./assets/sticker.png";
import { touchIsSupported } from "./utils/touchUtil";
import { Modal } from "./components/Modal";
import { loadUserName, saveUserName } from "./utils/userNameUtil";

export function App() {
  const [isDisabled, setIsDisabled] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [remainingTime, setRemainingTime] = useState<number | null>(null)

  const [dailyGoal, setDailyGoal] = useState<number>(50);
  const [quantity, setQuantity] = useState<number>(5);
  const [partialPercentage, setPartialPercentage] = useState(0);

  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);

  const [userName, setUserName] = useState<string | null>(loadUserName());

  function turnIntoSeconds() {
    const hoursToSeconds = hours * 3600;
    const minutesToSeconds = minutes * 60;

    return { hoursToSeconds, minutesToSeconds };
  }

  function timer() {
    const { hoursToSeconds, minutesToSeconds } = turnIntoSeconds();
    let totalSeconds = hoursToSeconds + minutesToSeconds;

    const decreaseTime = setInterval(() => {
      totalSeconds--;
      setIsRunning(true);
      setRemainingTime(totalSeconds)
      console.log(totalSeconds);

      if (totalSeconds === 0) {
        clearInterval(decreaseTime);
        const calcPercentage = (quantity / dailyGoal) * 100;
        const roundedPercentage = Math.round(calcPercentage);
        const newPartialPercentage = partialPercentage + roundedPercentage;
        const updatedPartialPercentage =
          newPartialPercentage <= 100 ? newPartialPercentage : 100;

        setPartialPercentage(updatedPartialPercentage);
        setIsRunning(false);
        setRemainingTime(null)
      }
    }, 1000);
  }

  function formatTime(seconds: number) {
    const hours = Math.floor(seconds / 3600);
    seconds %= 3600;
    const minutes = Math.floor(seconds / 60);
    seconds %= 60;
  
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
  
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }

  let messageTime;
  const hourNow = new Date().getHours()

  function showMessageTime() {
    if (hourNow >= 0 && hourNow < 12) {
      messageTime = 'Bom dia';
    } else if (hourNow >= 12 && hourNow < 18) {
      messageTime = 'Boa tarde';
    } else {
      messageTime = 'Boa noite';
    }

    return messageTime
  }

  useEffect(() => {
    if (dailyGoal == 0 || quantity == 0 || (hours == 0 && minutes == 0)) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
    
    saveUserName(userName)
  }, [dailyGoal, quantity, hours, minutes, userName]);

  return (
    <div className="w-full h-screen bg-gray-500 text-gray-100 grid place-items-center">
      <main className="max-w-[690px] w-[90%] mx-auto">
        <header className="flex items-center gap-2 mb-[76px]">
          <div className="w-16 h-16 rounded-full bg-gray-200 grid place-items-center">
            <img src={sticker} alt="Avatar" />
          </div>
          <div className="flex flex-col gap-1 text-2xl leading-7">
            <span className="font-light">{showMessageTime()},</span>
            <span className="font-semibold">{userName === null ? 'Biro' : userName} 👋</span>
          </div>
        </header>

        <div className="flex justify-between">
          <div className="bg-blue text-[#1F2128] px-10 py-8 rounded-[20px] text-center w-52 h-[340px] flex flex-col overflow-hidden">
            <span className="text-xs font-bold tracking-[0.36px] mb-10">
              {partialPercentage}%
            </span>
            <div className="flex-1">
              <img
                src={person}
                alt="Pessoa dando uma cambalhota"
                data-isrunning={isRunning}
                className="mx-auto data-[isrunning=true]:animate-jump"
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
              disabled={isDisabled}
              data-isdisabled={isDisabled}
              data-isrunning={isRunning}
              data-istouchsupported={touchIsSupported}
              className="bg-blue h-14 rounded-md text-gray-500 flex items-center justify-center gap-2 cursor-pointer transition-all duration-300
              data-[isdisabled=true]:brightness-90 
              data-[isdisabled=true]:pointer-events-none 
              data-[isrunning=true]:pointer-events-none 
              data-[isrunning=true]:select-none
              data-[istouchsupported=false]:hover:brightness-110"
              onClick={() => {
                timer();
              }}
            >
              {isRunning ? (
                <p>{formatTime(remainingTime || 0)}</p>
              ) : (
                <>
                  <span className="font-medium tracking-[0.48px]">Começar</span>
                  <ChevronRight />
                </>
              )}
            </button>
          </div>
        </div>
      </main>

      {userName === null && <Modal userName={userName} setFunction={setUserName} />}
    </div>
  );
}
