import { AiOutlinePlus } from "react-icons/ai";
import { BiMinus } from "react-icons/bi";
import { RiCloseLine } from "react-icons/ri";
import { RiDivideLine } from "react-icons/ri";
import { MdPercent } from "react-icons/md";
import { actions } from "../App";
import {motion} from 'framer-motion'
const OperationBtn = ({ dispatch, operation }) => {
  return (
    <motion.button
      whileTap={{ scale: 0.5 }}
      className={`btn ${
        operation == "%"
          ? "text-blue-400 dark:text-blue-200"
          : "text-red-400 dark:text-red-200"
      }`}
      onClick={() =>
        dispatch({ type: actions.CHOOSE_OPERATION, payload: { operation } })
      }
    >
      {operation === "+" ? (
        <AiOutlinePlus />
      ) : operation === "-" ? (
        <BiMinus />
      ) : operation === "/" ? (
        <RiDivideLine />
      ) : operation === "%" ? (
        <MdPercent />
      ) : (
        <RiCloseLine />
      )}
    </motion.button>
  );
};

export default OperationBtn;
