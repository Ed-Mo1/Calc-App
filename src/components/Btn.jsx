import { RiEqualFill } from "react-icons/ri";
import { AiOutlinePlus } from "react-icons/ai";
import { BiMinus } from "react-icons/bi";
import { RiCloseLine } from "react-icons/ri";
import { RiDivideLine } from "react-icons/ri";
import { MdPercent } from "react-icons/md";
import { useEffect, useState } from "react";

const Btn = ({ item, handelOperation }) => {
  const [style, setStyle] = useState("");
  function addStyle(item) {
    switch (item) {
      case "AC":
      case "C":
      case "%":
        return "text-blue-400 dark:text-blue-200 ";
      case "+":
      case "-":
      case "*":
      case "/":
        return "text-red-400 dark:text-red-200";
      case "=":
        return "bg-red-400 dark:bg-red-200 text-white";
      case "0":
        return "col-span-2";
      default:
        return "text-black dark:text-white";
    }
  }
  useEffect(() => {
    setStyle(addStyle(item));
  }, []);
  return (
    <div
      onClick={() => handelOperation(item)}
      className={`${style} p-2  lg:p-3 headline-midum grid hover:bg-opacity-80 place-content-center cursor-pointer shadow-lg rounded-xl`}
    >
      {item === "%" ? (
        <MdPercent />
      ) : item === "+" ? (
        <AiOutlinePlus />
      ) : item === "-" ? (
        <BiMinus />
      ) : item === "*" ? (
        <RiCloseLine />
      ) : item === "/" ? (
        <RiDivideLine />
      ) : item === "=" ? (
        <RiEqualFill />
      ) : (
        item
      )}
    </div>
  );
};



export default Btn;