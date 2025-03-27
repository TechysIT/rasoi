import { Variants, Transition } from "motion/react";
export const customVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.95,
    y: 40,
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 40,
  },
};

export const customTransition: Transition = {
  type: "spring",
  bounce: 0,
  duration: 0.25,
};
