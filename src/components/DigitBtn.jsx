import { actions } from "../App";
import { motion } from "framer-motion";

const DigitBtn = ({ dispatch, digit }) => {
  return (
    <motion.button
      whileTap={{ scale: 0.5 }}
      className={`${digit == 0 && "col-span-2"} dark:text-white btn`}
      onClick={() => dispatch({ type: actions.ADD_DIGIT, payload: { digit } })}
    >
      {digit}
    </motion.button>
  );
};

export default DigitBtn;
