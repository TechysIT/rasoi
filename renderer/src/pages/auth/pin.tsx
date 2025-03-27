import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@heroui/react";

export default function PosPin() {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center p-4">
      <Link
        href="#"
        className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 self-start container"
      >
        <ChevronLeft className="h-4 w-4 mr-1 text-customPrimary-500" />
        Back
      </Link>
      <div className="flex items-center gap-2 mb-8">
        <Image src="/logo.png" alt="Techy's Logo" width={32} height={32} />
        <span className="text-3xl font-semibold text-customPrimary-500">
          Techy's
        </span>
      </div>
      <div className="p-10 bg-white rounded-lg shadow-lg ">
        <h2 className="text-customPrimary-500 text-2xl font-semibold mb-10">
          Enter Your PIN
        </h2>
        <form>
          <InputOTP
            maxLength={6}
            autoFocus
            inputMode="text"
            pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
          >
            <div className="flex justify-center gap-2">
              {[...Array(3)].map((_, i) => (
                <InputOTPSlot
                  key={i}
                  index={i}
                  className="px-8 py-8 bg-white"
                />
              ))}
            </div>
            <InputOTPSeparator />
            <div className="flex justify-center gap-2">
              {[...Array(3)].map((_, i) => (
                <InputOTPSlot
                  key={i + 3}
                  index={i + 3}
                  className="px-8 py-8 bg-white"
                />
              ))}
            </div>
          </InputOTP>
        </form>
        <div className="flex justify-end mt-10 space-x-3">
          <Button className="bg-transparent text-gray-500">Cancel</Button>
          <Button radius="sm" className="bg-customPrimary-500 text-white">
            Proceed
          </Button>
        </div>
      </div>
    </div>
  );
}
