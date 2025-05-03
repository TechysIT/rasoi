import React from "react";
import Lottie from "lottie-react";
import animationData from "@/lottie/no-result.json";

interface NotFoundProps {
  text?: string;
}

export default function NotFound({ text }: NotFoundProps) {
  return (
    <div className="flex flex-col justify-center items-center h-[56vh] text-center">
      <div className="mb-4">
        <Lottie
          animationData={animationData}
          loop={true}
          className="w-60 h-60"
        />
      </div>
      {text && (
        <div className="text-xl font-bold italic text-customPrimary-500 drop-shadow-[2px_2px_1px_rgba(0,0,0,0.2)]">
          {text}
        </div>
      )}
    </div>
  );
}
