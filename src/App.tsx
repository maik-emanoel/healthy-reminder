import { useState } from "react";
import { IMaskInput } from "react-imask";

import { ChevronRight } from "lucide-react";
import { InputWrapper } from "./components/InputWrapper";
import person from "./assets/person.svg";
import sticker from "./assets/sticker.png";

export function App() {
  const [dailyGoal, setDailyGoal] = useState<number>(50);
  const [quantity, setQuantity] = useState<number>(5);
  const [partialPercentage, setPartialPercentage] = useState(0)

  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  
  function turnIntoSeconds() {
    const hoursToSeconds = hours * 3600
    const minutesToSeconds = minutes * 60

    console.log(`Hora para segundos: ${hoursToSeconds}, Minutos para segundos: ${minutesToSeconds}`)
    return { hoursToSeconds, minutesToSeconds }
  }

  function timer() {
    const { hoursToSeconds, minutesToSeconds } = turnIntoSeconds()
    let totalSeconds = hoursToSeconds + minutesToSeconds

    const decreaseTime = setInterval(() => {
      totalSeconds--
      console.log(totalSeconds)

      if(totalSeconds === 0) {
        clearInterval(decreaseTime)
        const calcPercentage = (quantity / dailyGoal) * 100
        setPartialPercentage(prevPercentage => prevPercentage + calcPercentage)
        
        if(partialPercentage >=  100) {
          setPartialPercentage(100)
        }
      }
    }, 100) 
  }

  return (
    <div className="w-full h-screen bg-gray-500 text-gray-100">
      <main className="max-w-[690px] w-[90%] mx-auto pt-44">
        <header>
          <div>
            <img src={sticker} alt="Avatar" />
          </div>
          <div>
            <span>Boa tarde,</span>
            <span>Biro 👋</span>
          </div>
        </header>

        <div>
          <div>
            <span>{partialPercentage}%</span>
            <img src={person} alt="Pessoa dando uma cambalhota" />

            <strong>Alongar</strong>
            <p>
              Meta: <span>{dailyGoal}</span>x
            </p>
          </div>

          <div>
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

            <div className="text-black">
              <div>
                <IMaskInput
                  mask="00"
                  validate={(value) => {
                    return Number(value) <= 23;
                  }}
                  onAccept={(e) => {
                    setHours(Number(e))
                  }}
                />
                <span>h</span>
              </div>
              <span>:</span>
              <div>
                <IMaskInput
                  mask="00"
                  validate={(value) => {
                    return Number(value) <= 59;
                  }}
                  onAccept={(e) => {
                    setMinutes(Number(e))
                  }}
                />
                <span>m</span>
              </div>
            </div>
            <button onClick={() => {
              timer()
            }}>
              <span>Começar</span>
              <ChevronRight />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
