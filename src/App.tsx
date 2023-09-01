import { ChevronRight } from "lucide-react";
import { InputWrapper } from "./components/InputWrapper";
import person from "./assets/person.svg";
import sticker from './assets/sticker.png'

export function App() {
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
            <span>80%</span>
            <img src={person} alt="Pessoa dando uma cambalhota" />

            <strong>Alongar</strong>
            <p>
              Meta: <span>10</span>x
            </p>
          </div>

          <div>
            <InputWrapper id="inputDailyGoal" label="Meta diária" />
            <InputWrapper id="inputTimer" label="Quantidade por timer" />

            <div>
              <div>
                <input type="number" id="inputHour" />
                <span>h</span>
              </div>
              <span>:</span>
              <div>
                <input type="number" id="inputMinutes" />
                <span>m</span>
              </div>
            </div>
            <button>
              <span>Começar</span>
              <ChevronRight />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
