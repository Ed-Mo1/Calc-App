import { useEffect, useReducer, useState } from "react";
import Header from "./components/Header";
import DigitBtn from "./components/DigitBtn";
import OperationBtn from "./components/OperationBtn";
import { AiOutlinePlus } from "react-icons/ai";
import { BiMinus } from "react-icons/bi";
import { RiCloseLine } from "react-icons/ri";
import { RiEqualFill } from "react-icons/ri";
import { RiDivideLine } from "react-icons/ri";
import { MdPercent } from "react-icons/md";
import { motion } from "framer-motion";
export const actions = {
  ADD_DIGIT: "add_digit",
  CHOOSE_OPERATION: "choose_operation",
  CLEAR: "clear",
  DELETE_DIGIT: "delete_digit",
  EVALUATE: "evaluate",
};
const reducer = (state, { type, payload }) => {
  const newState = { ...state };
  switch (type) {
    case actions.ADD_DIGIT:
      if (newState.madeCalculation) {
        newState.currentOperand = String(payload.digit);
        newState.madeCalculation = false;
      } else if (
        payload.digit === "." &&
        newState.currentOperand.includes(".")
      ) {
        // return state;
      } else if (payload.digit === "0" && newState.currentOperand === "0") {
        // return state;
      } else if (payload.digit !== "0" && newState.currentOperand === "0") {
        newState.currentOperand = String(payload.digit);
      } else {
        newState.currentOperand =
          (newState.currentOperand || "0") + payload.digit;
      }
      break;
    case actions.CHOOSE_OPERATION:
      if (
        !newState.currentOperand &&
        (!newState.previousOperand || newState.previousOperand === "0")
      ) {
        // return state;
      } else if (newState.currentOperand.slice(-1) == ".") {
        // return state;
      } else if (
        (newState.currentOperand || newState.currentOperand === "0") &&
        !newState.previousOperand
      ) {
        newState.previousOperand = newState.currentOperand;
        newState.currentOperand = "0";
        newState.operation = payload.operation;
      } else if (
        newState.currentOperand &&
        ["+", "-", "*", "/"].includes(newState.currentOperand)
      ) {
        // return state;
      } else if (newState.currentOperand && newState.previousOperand) {
        newState.operation = payload.operation;
        newState.previousOperand = evaluate(
          newState.previousOperand,
          newState.currentOperand,
          payload.operation
        );
        newState.currentOperand = "0";
        newState.madeCalculation = true;
      }
      break;
    case actions.CLEAR:
      newState.currentOperand = "0";
      newState.previousOperand = null;
      newState.operation = null;
      newState.madeCalculation = false;
      break;
    case actions.DELETE_DIGIT:
      if (newState.currentOperand) {
        newState.madeCalculation = false;
        newState.currentOperand = newState.currentOperand.slice(
          0,
          newState.currentOperand.length - 1
        );
        if (newState.currentOperand.length === 0) {
          newState.currentOperand = "0";
        }
      }
      break;
    case actions.EVALUATE:
      if (
        !newState.operation ||
        !newState.currentOperand ||
        !newState.previousOperand
      ) {
        // return state;
      } else if (newState.currentOperand.slice(-1) == ".") {
        // return state;
      } else {
        newState.currentOperand = evaluate(
          newState.previousOperand,
          newState.currentOperand,
          newState.operation
        );
        newState.previousOperand = null;
        newState.operation = null;
        newState.madeCalculation = true;
      }
      break;
  }
  return newState;
};

function evaluate(operand1, operand2, operation) {
  const a = parseFloat(operand1);
  const b = parseFloat(operand2);
  if (isNaN(a) || isNaN(b)) return "";
  return String(eval(a + operation + b));
}
const App = () => {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    {
      currentOperand: "0",
      previousOperand: null,
      operation: null,
      madeCalculation: false,
    }
  );
  console.log(currentOperand, previousOperand, operation);

  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode"));
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);
  return (
    <div className="min-h-screen bg-indygo-200 flex justify-center items-center px-5 py-10">
      <div className="w-full max-w-[500px]  bg-calculator-light  dark:bg-calculator-dark rounded-lg grid  grid-rows-calculator">
        <div className="p-5 grid grid-rows-head">
          <Header darkMode={darkMode} setDarkMode={setDarkMode} />
          <div className="text-right grid place-content-end break-words break-all">
            <div className="headline-medium flex items-center justify-end">
              {previousOperand}{" "}
              {operation === "/" ? (
                <RiDivideLine className="text-red-400 dark:text-red-200" />
              ) : operation === "+" ? (
                <AiOutlinePlus className="text-red-400 dark:text-red-200" />
              ) : operation === "-" ? (
                <BiMinus className="text-red-400 dark:text-red-200" />
              ) : operation === "*" ? (
                <RiCloseLine className="text-red-400 dark:text-red-200" />
              ) : operation === "%" ? (
                <MdPercent className="text-blue-400 dark:text-blue-200" />
              ) : null}
            </div>
            <div className="headline-large">{currentOperand}</div>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-5 p-5 rounded-lg rounded-t-3xl bg-[#FAFAFA] dark:bg-calculator-surface">
          <motion.button
            whileTap={{ scale: 0.5 }}
            className="btn text-blue-400 dark:text-blue-200"
            onClick={() => dispatch({ type: actions.CLEAR })}
          >
            AC
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.5 }}
            className="btn text-blue-400 dark:text-blue-200"
            onClick={() => dispatch({ type: actions.DELETE_DIGIT })}
          >
            C
          </motion.button>
          <OperationBtn dispatch={dispatch} operation="%" />
          <OperationBtn dispatch={dispatch} operation="/" />
          <DigitBtn digit="7" dispatch={dispatch} />
          <DigitBtn digit="8" dispatch={dispatch} />
          <DigitBtn digit="9" dispatch={dispatch} />
          <OperationBtn dispatch={dispatch} operation="-" />

          <DigitBtn digit="4" dispatch={dispatch} />
          <DigitBtn digit="5" dispatch={dispatch} />
          <DigitBtn digit="6" dispatch={dispatch} />
          <OperationBtn dispatch={dispatch} operation="*" />

          <DigitBtn digit="1" dispatch={dispatch} />
          <DigitBtn digit="2" dispatch={dispatch} />
          <DigitBtn digit="3" dispatch={dispatch} />
          <OperationBtn dispatch={dispatch} operation="+" />

          <DigitBtn digit="0" dispatch={dispatch} />
          <DigitBtn digit="." dispatch={dispatch} />
          <motion.button
            whileTap={{ scale: 0.5 }}
            onClick={() => dispatch({ type: actions.EVALUATE })}
            className="bg-red-400 dark:bg-red-200 btn text-white"
          >
            <RiEqualFill />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default App;
