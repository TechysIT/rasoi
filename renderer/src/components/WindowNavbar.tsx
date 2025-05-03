import Image from "next/image";
import {
  IoCloseCircle,
  IoScanCircleSharp,
  IoRemoveCircleSharp,
  IoEllipse,
  IoReloadCircleSharp,
} from "react-icons/io5";
import { useEffect, useState } from "react";

export default function WindowNavbar() {
  const [isMaximized, setIsMaximized] = useState(true);

  useEffect(() => {
    if (!window?.ipc) return;

    const handleWindowStatus = (value: boolean) => {
      setIsMaximized(value);
    };

    const unsubscribe = window.ipc.on("window-status", handleWindowStatus);

    return () => {
      unsubscribe();
    };
  }, []);

  const handleMinimize = () => {
    window.ipc.send("window-minimize", {});
  };

  const handleMaximize = () => {
    window.ipc.send("window-maximize", {});
  };

  const handleClose = () => {
    window.ipc.send("window-close", {});
  };

  return (
    <div className="w-full app-region h-7 bg-[#f2f2f2] border-1 border-[#f3f3f3] z-[200] flex flex-row justify-between items-center">
      <div className="w-fit items-center flex flex-row flex-nowrap gap-2 px-2">
        <Image
          src={"/logo.png"}
          className="object-contain"
          alt={"logo"}
          height={16}
          width={16}
        />
        <p className="font-semibold text-xs tracking-wider uppercase drop-shadow-[2px_2px_1px_rgba(0,0,0,0.2)]">
          Techy&apos;s{" "}
        </p>
      </div>
      <div className="w-fit h-full flex flex-row gap-2 px-2">
        <div>
          <IoEllipse className="absolute" size={24} fill={"#ffffff"} />
          <IoRemoveCircleSharp
            onClick={handleMinimize}
            className="relative cursor-pointer btn-region hover:fill-[#f59757] active:fill-[#f7a872]"
            size={24}
            fill={"#f37d2d"}
            title="Minimize"
          />
        </div>
        <div>
          <IoEllipse className="absolute" size={24} fill={"#ffffff"} />
          {isMaximized ? (
            <IoReloadCircleSharp
              onClick={handleMaximize}
              className="relative cursor-pointer btn-region hover:fill-[#f59757] active:fill-[#f7a872]"
              size={24}
              fill={"#f37d2d"}
              title="Restore"
            />
          ) : (
            <IoScanCircleSharp
              onClick={handleMaximize}
              className="relative cursor-pointer btn-region hover:fill-[#f59757] active:fill-[#f7a872]"
              size={24}
              fill={"#f37d2d"}
              title="Maximize"
            />
          )}
        </div>
        <div>
          <IoEllipse className="absolute" size={24} fill={"#ffffff"} />
          <IoCloseCircle
            onClick={handleClose}
            className="relative cursor-pointer btn-region hover:fill-[#e00000] active:fill-[#ff2121]"
            size={24}
            fill={"#f37d2d"}
            title="Close"
          />
        </div>
      </div>
    </div>
  );
}
