import { useEffect, useState } from "react";
import Header from "./components/Header";
import Btn from "./components/Btn";
import { AiOutlinePlus } from "react-icons/ai";
import { BiMinus } from "react-icons/bi";
import { RiCloseLine } from "react-icons/ri";
import { RiDivideLine } from "react-icons/ri";
import { MdPercent } from "react-icons/md";

const operatorsAndNumbers = [
  "AC",
  "C",
  "%",
  "/",
  "7",
  "8",
  "9",
  "*",
  "4",
  "5",
  "6",
  "-",
  "1",
  "2",
  "3",
  "+",
  "0",
  ".",
  "=",
];

const App = () => {
  const [operations, setOperations] = useState(["0"]);
  const storedDarkMode = localStorage.getItem("darkMode");
  const [darkMode, setDarkMode] = useState(storedDarkMode === "true");

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const handelOperation = (item) => {
    if (item === "=") {
      if (
        ["+", "-", "/", "*", "%"].includes(operations[operations.length - 1])
      ) {
        setOperations([eval(operations.slice(0, -1).join(""))]);
      }
      setOperations([eval(operations.join(""))]);
    } else if (item === "AC") {
      setOperations(["0"]);
    } else if (item === "C") {
      setOperations(operations.slice(0, -1));
      if (operations.length <= 1) {
        setOperations(["0"]);
      }
    } else {
      if (item === "0" && operations[operations.length - 1] === "0") {
        return;
      }
      if (
        (item != "0" &&
          !isNaN(item) &&
          operations.length == 1 &&
          operations[0] == "0") ||
        operations[0] == "Infinity"
      ) {
        setOperations((prev) => [...prev.slice(1), item]);
        return;
      }

      if (
        (item === "." && operations[operations.length - 1] === ".") ||
        operations[operations.length - 1] === "Infinity"
      ) {
        return;
      }

      if (
        ["+", "-", "/", "*", "%"].includes(operations[operations.length - 1]) &&
        ["+", "-", "/", "*", "%"].includes(item)
      ) {
        return;
      }
      setOperations([...operations, item]);
    }
  };

  return (
    <div className="min-h-screen bg-indigo-200 flex items-center justify-center p-5">
      <div className="w-full flex flex-col max-w-[500px] shadow-xl aspect-[4/5] bg-calculator-light dark:bg-calculator-dark   rounded-2xl">
        <div className="px-5 max-sm:basis-[55%] basis-[45%] ">
          <div className="relative h-full flex justify-end items-end">
            <Header darkMode={darkMode} setDarkMode={setDarkMode} />
            <div
              className={`headline-large results mb-3 whitespace-nowrap ${
                darkMode ? "overflow-dark" : "overflow-light"
              } w-full overflow-x-auto  text-right`}
            >
              {operations.map((el, i) =>
                el === "*" ? (
                  <RiCloseLine key={i} className="inline-block align-middle" />
                ) : el === "/" ? (
                  <RiDivideLine key={i} className="inline-block" />
                ) : el === "%" ? (
                  <MdPercent key={i} className="inline-block" />
                ) : el === "+" ? (
                  <AiOutlinePlus key={i} className="inline-block" />
                ) : el === "-" ? (
                  <BiMinus key={i} className="inline-block" />
                ) : (
                  <span>{el}</span>
                )
              )}
            </div>
          </div>
        </div>
        <div className="flex-grow-[1] bg-[#FAFAFA] dark:bg-calculator-surface rounded-b-2xl rounded-t-3xl grid grid-cols-4 grid-rows-5 gap-5 pt-10 pb-5 px-5">
          {operatorsAndNumbers.map((item, index) => (
            <Btn key={index} item={item} handelOperation={handelOperation} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
