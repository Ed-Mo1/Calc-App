import { FaRegMoon } from "react-icons/fa";
import { LuSun } from "react-icons/lu";

const Header = ({ darkMode, setDarkMode }) => {
  return (
    <div className="absolute z-40 top-6 w-full flex justify-between items-center">
      <h3 className="text-3xl font-bold headline-small">Calc</h3>
      <div className="flex items-center gap-7 bg-white dark:bg-calculator-surface shadow-xl rounded-full py-3 px-4">
        <button
          onClick={() => setDarkMode(true)}
          className={`text-xl lg:text-2xl ${
            darkMode ? "text-white" : "text-gray-900 text-opacity-[36%]"
          }  
          `}
        >
          <FaRegMoon />
        </button>
        <button
          onClick={() => setDarkMode(false)}
          className={`text-xl  lg:text-2xl ${
            !darkMode ? "text-black" : "text-white text-opacity-[36%] "
          }  
          `}
        >
          <LuSun />
        </button>
      </div>
    </div>
  );
};

export default Header;
