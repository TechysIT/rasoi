"use client";

// Global Imports
import React, { useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";

// Local Imports
import { cn } from "@/utils/cn";

interface PopUpAnimationProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const PopUpAnimation: React.FC<PopUpAnimationProps> = ({
  children,
  className,
  delay = 0.1,
}) => {
  const { scrollYProgress } = useScroll();

  const [downwards, setDownwards] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      let direction = current - scrollYProgress.getPrevious()!;
      if (direction < 0) {
        setDownwards(true);
      } else {
        setDownwards(false);
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          y: downwards ? 100 : -100,
          opacity: 0,
        }}
        whileInView={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          delay: delay,
          duration: 0.5,
          ease: "easeInOut",
        }}
        className={cn("inset-x-0 z-[5000]", className)}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PopUpAnimation;
