"use client";
import { useState, useEffect, useMemo } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Disc2 } from "lucide-react";
import { Button } from "@heroui/react";
import { customTransition, customVariants } from "@/lib/constant";

interface AccountInfo {
  id: string;
  accountPin: string;
  storeName: string;
  breakstart?: string;
  cashDrawerBalance?: string;
}

interface ShiftInputProps {
  accountInfo: AccountInfo;
  formattedDateTime: string;
  pinInput: string;
  setPinInput: (value: string) => void;
}

interface ShiftDetailsProps {
  accountInfo: AccountInfo;
  formattedDateTime: string;
  isEnding: boolean;
}

interface CashBalanceProps {
  label: string;
  amount?: string;
}

interface StartAndEndProps {
  accountInfo: AccountInfo;
}

const StartAndEnd: React.FC<StartAndEndProps> = ({ accountInfo }) => {
  const [dateTime, setDateTime] = useState<Date>(new Date());
  const [modalStage, setModalStage] = useState<"input" | "start" | "end">(
    "input"
  );
  const [pinInput, setPinInput] = useState<string>("");

  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDateTime = useMemo(
    () => dateTime.toLocaleString(),
    [dateTime]
  );

  const handleConfirm = (): void => {
    if (modalStage === "input") {
      pinInput === accountInfo.accountPin
        ? setModalStage("start")
        : alert("Incorrect PIN. Please try again.");
    } else {
      setModalStage(modalStage === "start" ? "end" : "input");
      if (modalStage === "end") setPinInput("");
    }
  };

  return (
    <Dialog variants={customVariants} transition={customTransition}>
      <DialogTrigger className="flex items-center bg-transparent hover:bg-customPrimary-50 rounded-2xl py-1.5 px-3 w-full space-x-2 font-normal">
        <Disc2 size={18} />
        <span>Start/End Shift</span>
      </DialogTrigger>

      <DialogContent className={`p-6 ${modalStage === "input" ? "xl" : "2xl"}`}>
        <DialogHeader>
          <DialogTitle className="text-xl text-customPrimary-500">
            {modalStage === "input"
              ? "Start/End Shift"
              : modalStage === "start"
              ? "Start Shift"
              : "End Shift"}
          </DialogTitle>
        </DialogHeader>

        <div className="my-4">
          {modalStage === "input" && (
            <ShiftInput
              accountInfo={accountInfo}
              formattedDateTime={formattedDateTime}
              pinInput={pinInput}
              setPinInput={setPinInput}
            />
          )}

          {modalStage === "start" && (
            <ShiftDetails
              accountInfo={accountInfo}
              formattedDateTime={formattedDateTime}
              isEnding={false}
            />
          )}

          {modalStage === "end" && (
            <ShiftDetails
              accountInfo={accountInfo}
              formattedDateTime={formattedDateTime}
              isEnding={true}
            />
          )}
        </div>

        <DialogClose />

        <Button
          radius="sm"
          className="bg-customPrimary-500 text-white w-full"
          onClick={handleConfirm}
        >
          {modalStage === "input"
            ? "Confirm"
            : modalStage === "start"
            ? "Start Shift"
            : "End Shift"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

const ShiftInput: React.FC<ShiftInputProps> = ({
  accountInfo,
  formattedDateTime,
  pinInput,
  setPinInput,
}) => (
  <div className="grid grid-cols-5 gap-12">
    <div className="text-customPrimary-500 col-span-2 space-y-3">
      <p>Store Name</p>
      <p>Current Date & Time</p>
      <p>Break Start Information</p>
      <p>Account Pin</p>
    </div>
    <div className="col-span-3 space-y-3 text-black/60">
      <p>{accountInfo.storeName}</p>
      <p>{formattedDateTime}</p>
      <p>{accountInfo.breakstart || "No information yet."}</p>
      <Input
        type="text"
        placeholder="Enter account pin"
        value={pinInput}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPinInput(e.target.value)
        }
        required
      />
    </div>
  </div>
);

const ShiftDetails: React.FC<ShiftDetailsProps> = ({
  accountInfo,
  formattedDateTime,
  isEnding,
}) => (
  <>
    <div className="grid grid-cols-5 gap-10">
      <div className="text-customPrimary-500 col-span-2 space-y-4">
        <p>Store Name</p>
        <p>Shift Starting Date & Time</p>
        {isEnding && <p>Shift Ending Date & Time</p>}
        <p>Cash Drawer Balance</p>
        <p>Note Count in the Cash Drawer</p>
      </div>

      <div className="col-span-3 space-y-6 text-black/60">
        <p>{accountInfo.storeName}</p>
        <p>{formattedDateTime}</p>
        {isEnding && <p>{formattedDateTime}</p>}

        <div className="grid grid-cols-2 gap-5">
          <CashBalance
            label="Total at previous shift ending"
            amount={accountInfo.cashDrawerBalance}
          />
          <CashBalance
            label={`Total at ${
              isEnding ? "current shift ending" : "starting current shift"
            }`}
          />
        </div>

        <NoteCount />
      </div>
    </div>

    <div className="grid grid-cols-8 gap-5 my-5">
      <div className="text-customPrimary-500 col-span-2">
        <p>Note</p>
      </div>
      <div className="col-span-6">
        <Textarea name="note" required placeholder="Enter additional notes" />
      </div>
    </div>
  </>
);

const CashBalance: React.FC<CashBalanceProps> = ({ label, amount }) => (
  <div>
    <p className="text-black/70">{amount || <Input type="text" required />}</p>
    <p className="text-[10px] text-customPrimary-500 mt-0.5">{label}</p>
  </div>
);

const NoteCount: React.FC = () => (
  <div className="grid grid-cols-2 gap-5">
    {[
      ["500", "50", "10", "1", "25p", "5p"],
      ["100", "20", "5", "50p", "10p", "1p"],
    ].map((notes, index) => (
      <div key={index} className="grid grid-cols-5 gap-2">
        <div className="space-y-4">
          {notes.map((n) => (
            <p key={n}>{n}</p>
          ))}
        </div>
        <form className="col-span-4 space-y-2">
          {notes.map((_, i) => (
            <Input key={i} type="text" required />
          ))}
        </form>
      </div>
    ))}
  </div>
);

export default StartAndEnd;
