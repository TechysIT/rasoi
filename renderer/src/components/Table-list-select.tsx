"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

const transitionProps = {
  type: "spring",
  stiffness: 500,
  damping: 30,
  mass: 0.5,
};

interface MultiSelectButtonGroupProps {
  options: string[];
  selectedOptions: string[];
  disabledOptions?: string[];
  onChange: (selected: string[]) => void;
}

export function MultiSelectButtonGroup({
  options,
  selectedOptions,
  disabledOptions = [],
  onChange,
}: MultiSelectButtonGroupProps) {
  const toggleOption = (option: string) => {
    if (disabledOptions.includes(option)) return;
    onChange(
      selectedOptions.includes(option)
        ? selectedOptions.filter((o) => o !== option)
        : [...selectedOptions, option]
    );
  };

  return (
    <motion.div
      className="grid grid-cols-4 gap-3 overflow-visible"
      layout
      transition={transitionProps}
    >
      {options.map((option) => {
        const isSelected = selectedOptions.includes(option);
        const isDisabled = disabledOptions.includes(option);
        return (
          <motion.button
            key={option}
            onClick={() => toggleOption(option)}
            disabled={isDisabled}
            layout
            initial={false}
            animate={{
              backgroundColor: isSelected
                ? "#f65220"
                : isDisabled
                ? "#e0e0e0"
                : "#fcfcfc",
            }}
            whileHover={{
              backgroundColor: isSelected
                ? "#e06a1d"
                : isDisabled
                ? "#e0e0e0"
                : "#f9f9f9",
            }}
            whileTap={{
              backgroundColor: isSelected
                ? "#e06a1d"
                : isDisabled
                ? "#e0e0e0"
                : "#e2e2e2",
            }}
            transition={{
              ...transitionProps,
              backgroundColor: { duration: 0.1 },
            }}
            className={`inline-flex items-center px-4 py-2 rounded-full shadow-md text-base capitalize whitespace-nowrap overflow-hidden ring-1 ring-inset ${
              isSelected
                ? "text-white ring-[#f9a36a]"
                : isDisabled
                ? "text-gray-400 ring-gray-300 cursor-not-allowed"
                : "text-customPrimary-500 ring-customPrimary-400"
            }`}
          >
            <motion.div
              className="relative flex items-center"
              animate={{
                width: isSelected ? "auto" : "100%",
                paddingRight: isSelected ? "1.5rem" : "0",
              }}
              transition={{ ease: [0.175, 0.885, 0.32, 1.275], duration: 0.3 }}
            >
              <span>{option}</span>
              <AnimatePresence>
                {isSelected && (
                  <motion.span
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={transitionProps}
                    className="absolute right-0"
                  >
                    <div className="w-4 h-4 rounded-full bg-customPrimary-50 flex items-center justify-center">
                      <Check
                        className="w-3 h-3 text-customPrimary-500"
                        strokeWidth={1.5}
                      />
                    </div>
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.button>
        );
      })}
    </motion.div>
  );
}
