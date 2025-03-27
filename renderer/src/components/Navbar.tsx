"use client";
import {
  Album,
  Bell,
  CircleUserRound,
  Clock,
  Disc2,
  LogOut,
  Mails,
  Search,
  Store,
  Users,
  Wallet,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { BiCloudUpload } from "react-icons/bi";
import { Avatar, Button, Radio, RadioGroup } from "@heroui/react";

import NotificationPanel from "./Notification";
import SearchProduct from "./Search";
import Image from "next/image";
import PopUpAnimation from "./Popup-animation";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Textarea } from "./ui/textarea";
import { FileUploader } from "react-drag-drop-files";
import { FaCircleCheck } from "react-icons/fa6";
import StartAndEnd from "./Shift-start-end";

export default function Navbar() {
  return (
    <div className="flex h-20 items-center justify-between px-6 bg-white">
      <h2 className="text-xl font-bold text-customPrimary-500 ">
        Techy's Food Ltd.
      </h2>

      <div className="flex flex-1 items-center justify-center max-w-2xl mx-8">
        <SearchProduct />
      </div>

      <div className="flex items-center gap-4">
        <NotificationPanel />
        <Popover>
          <PopoverTrigger>
            <Avatar
              src={"/images/placeholder.jpg"}
              className="border-2 border-customPrimary-500"
            />
          </PopoverTrigger>
          <PopoverContent className="rounded-xl mr-6 w-fit">
            <div>
              <h4 className="text-customPrimary-500 text-body mb-2">
                Welcome back,
                {/* {customerData[0].name.split(" ")[0]} */}
              </h4>
              <ul className="space-y-1">
                <Link href={"/profile"}>
                  <PopUpAnimation
                    delay={0 * 0.05}
                    className="flex justify-start items-center space-x-2 hover:bg-customPrimary-50 rounded-2xl py-1.5 px-3 text-sm"
                  >
                    <CircleUserRound size={18} />
                    <span>View Profile</span>
                  </PopUpAnimation>
                </Link>

                <PopUpAnimation delay={1 * 0.05}>
                  <CashInOut />
                </PopUpAnimation>
                <PopUpAnimation delay={4 * 0.05}>
                  <StartAndEnd
                    accountInfo={{
                      id: "1",
                      storeName: "John Doe",
                      breakstart: "",
                      accountPin: "12345",
                      cashDrawerBalance: "$99.50",
                    }}
                  />
                </PopUpAnimation>
                {/* <PopUpAnimation
                  delay={2 * 0.05}
                  className="flex justify-start items-center space-x-2 hover:bg-customPrimary-50 rounded-2xl py-1.5 px-3"
                >
                  <Clock />
                  <span>Clock in/ out</span>
                </PopUpAnimation> */}
                <Link href={"/temp/members"}>
                  <PopUpAnimation
                    delay={3 * 0.05}
                    className="flex justify-start items-center space-x-2 hover:bg-customPrimary-50 rounded-2xl py-1.5 px-3 text-sm"
                  >
                    <Users size={18} />
                    <span>Switch Profile</span>
                  </PopUpAnimation>
                </Link>

                <Link href={"/temp/store"}>
                  <PopUpAnimation
                    delay={3 * 0.05}
                    className="flex justify-start items-center space-x-2 hover:bg-customPrimary-50 rounded-2xl py-1.5 px-3 text-sm"
                  >
                    <Store size={18} />
                    <span>Switch Store</span>
                  </PopUpAnimation>
                </Link>

                <PopUpAnimation className="flex justify-start items-center space-x-2 hover:bg-customPrimary-50 rounded-2xl py-1.5 px-3 text-red-500 text-sm">
                  <LogOut size={18} />
                  <span>Log out</span>
                </PopUpAnimation>
              </ul>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}

// cash in out
interface FileInfo {
  name: string;
  size: number;
}
const CashInOut = () => {
  const [fileInfo, setFileInfo] = useState<FileInfo | null>(null);
  const [progress, setProgress] = useState<number>(0);
  // Handle file change
  const handleFileChange = (file: File) => {
    const fileSizeInKB = file.size / 1024;
    setFileInfo({
      name: file.name,
      size: fileSizeInKB,
    });

    setProgress(0);
    simulateUpload(fileSizeInKB);
  };

  //simulate the file upload
  const simulateUpload = (totalSizeInKB: number) => {
    let uploaded = 0;
    const interval = setInterval(() => {
      // Increment the uploaded size
      uploaded += totalSizeInKB * 0.1; // Simulating 10% per interval
      if (uploaded >= totalSizeInKB) {
        uploaded = totalSizeInKB; // Cap it at 100%
        clearInterval(interval);
      }
      // Update progress
      setProgress(uploaded);
    }, 500);
  };
  return (
    <Dialog>
      <DialogTrigger className="flex justify-start items-center bg-transparent hover:bg-customPrimary-50 rounded-2xl py-1.5 px-3 w-full space-x-2 font-normal">
        <Wallet size={18} />
        <span>Cash in/ out</span>
      </DialogTrigger>
      <DialogContent className="p-6 max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-customPrimary-500 text-xl font-medium">
            Cash in/ Out
          </DialogTitle>
        </DialogHeader>
        <div className="mt-5">
          <RadioGroup orientation="horizontal" defaultValue={"cash-in"}>
            {[
              {
                id: "cash-in",
                name: "Cash In",
              },
              {
                id: "cash-out",
                name: "Cash Out",
              },
            ].map((item) => (
              <Radio
                key={item.id}
                classNames={{
                  control:
                    "bg-customPrimary-500 group-data-[selected=true]:text-customPrimary-500",
                  wrapper:
                    "group-data-[selected=true]:border-customPrimary-500",
                  label: "group-data-[selected=true]:text-customPrimary-500",
                }}
                value={item.id}
              >
                {item.name}
              </Radio>
            ))}
          </RadioGroup>
          <div className="grid grid-cols-3 gap-12 mt-5">
            <div className="text-tag space-y-3 text-customPrimary-500 ">
              <p>Amount</p>
              <p>Reason</p>
              <p className="pt-16">Reference Document</p>
            </div>
            <div className="col-span-2 space-y-3">
              <Input
                name="reason"
                type="text"
                required
                placeholder="Enter amount here"
              />
              <Textarea
                name="reason"
                required
                placeholder="Describe reason here"
              />
              <div>
                <FileUploader
                  handleChange={handleFileChange}
                  name="file"
                  children={
                    <div className="border border-black/40 rounded-lg px-10 py-5 mt-3">
                      <div className="flex justify-center items-center">
                        <BiCloudUpload
                          size={25}
                          className="text-customPrimary-400"
                        />
                      </div>
                      <h5 className="text-center text-sm">
                        Choose a file or drag & drop it here
                      </h5>
                      <p className="text-xs text-black/40 text-center">
                        JPEG, PNG, PDF formats, up to 50MB
                      </p>
                      <p className="text-sm text-customPrimary-500 font-medium text-center">
                        Browse Files
                      </p>
                    </div>
                  }
                  label={"Drag here"}
                  types={["JPEG", "PNG", "PDF"]}
                />

                {/* Display uploaded file information */}
                {fileInfo && (
                  <div className="mt-4 bg-customPrimary-50 py-1 px-3 rounded">
                    <p>{fileInfo.name}</p>
                    <div className="text-sm flex justify-start items-center space-x-2">
                      <span className="text-black/30">
                        {progress.toFixed(2)} KB of {fileInfo.size.toFixed(2)}
                        KB
                      </span>
                      {progress >= fileInfo.size && (
                        <>
                          <FaCircleCheck className="text-green-500" size={14} />
                          <span>Completed</span>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <Button radius="sm" className="bg-customPrimary-500 text-white">
            Confirm
          </Button>
        </div>
        <DialogClose />
      </DialogContent>
    </Dialog>
  );
};
