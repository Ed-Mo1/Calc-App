import { FaRegMoon } from "react-icons/fa";
import { LuSun } from "react-icons/lu";
import { motion } from "framer-motion";
const Header = ({ darkMode, setDarkMode }) => {
  return (
    <div className="flex justify-between items-center pb-5">
      <h3 className="text-3xl font-bold headline-small">Calc</h3>
      <div className="flex items-center gap-7 bg-white dark:bg-calculator-surface shadow-xl rounded-full py-3 px-4">
        <motion.button
          whileHover={{ rotate: -25 }}
          whileTap={{ rotate: -25, scale: 0.5 }}
          onClick={() => setDarkMode(true)}
          className={`text-xl lg:text-2xl ${
            darkMode ? "text-white" : "text-gray-900 text-opacity-[36%]"
          }  
          `}
        >
          <FaRegMoon />
        </motion.button>
        <motion.button
          whileHover={{
            rotate: 360,
            transition: {
              type: "spring",
              duration: 1,
              damping: 10,
              stiffness: 100,
            },
          }}
          whileTap={{
            rotate: 90,
            scale: 0.5,
            transition: {
              type: "spring",
              duration: 1,
              damping: 10,
              stiffness: 100,
            },
          }}
          onClick={() => setDarkMode(false)}
          className={`text-xl  lg:text-2xl ${
            !darkMode ? "text-black" : "text-white text-opacity-[36%] "
          }  
          `}
        >
          <LuSun />
        </motion.button>
      </div>
    </div>
  );
};

export default Header;
