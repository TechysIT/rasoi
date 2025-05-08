import { ChevronLeft, Crown, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Avatar } from "@heroui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog-cn";
import { useRouter } from "next/router";
import { Button } from "@heroui/react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast } from "sonner";

interface Employee {
  id: string;
  name: string;
  role: string;
  image: string;
  email: string;
  isAdmin?: boolean;
}

export default function ProfileSelector() {
  const router = useRouter();
  const { storeId } = router.query;
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [code, setCode] = useState<string>("");
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null);

  useEffect(() => {
    if (!storeId) return;

    const fetchEmployees = async () => {
      setLoading(true);
      try {
        const response = await window.ipc.invoke(
          "getEmployeesByStore",
          storeId
        );
        // console.log("Received employees in frontend:", response);
        if (Array.isArray(response)) {
          setEmployees(response);
        } else {
          setEmployees([]);
        }
      } catch (error) {
        console.error("Failed to fetch employees in frontend:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, [storeId]);

  const handleProceed = () => {
    if (selectedProfile) {
      const employee = employees.find((emp) => emp.id === selectedProfile);
      if (employee) {
        console.log("ep", employee);
        setSelectedEmail(employee.email);
        setIsDialogOpen(true);
      }
    }
  };

  const handleSubmitCode = async () => {
    if (!selectedEmail || code.length !== 6) return;

    try {
      const response = await window.ipc.invoke("employeeLogin", {
        email: selectedEmail,
        pin: code,
      });

      if (response.success) {
        toast.success("Login successful!", {
          closeButton: true,
        });
        setIsDialogOpen(false);
        setCode("");
        router.push("/");
      } else {
        toast.error(response.message || "Login failed", {
          closeButton: true,
        });
        setCode("");
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("An error occurred. Please try again.", {
        closeButton: true,
      });
      setCode("");
    }
  };
  const adminProfile = employees.find((employee) => employee.isAdmin);
  const otherProfiles = employees.filter((employee) => !employee.isAdmin);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 p-4">
      <Link
        href="/auth/store"
        className="self-start inline-flex items-center text-muted-foreground hover:text-foreground mb-8"
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
      <div className="w-full max-w-[420px] bg-white rounded-2xl p-6 shadow-md">
        <h1 className="text-2xl text-customPrimary-500 font-semibold text-center mb-8">
          Choose your Profile
        </h1>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : employees.length === 0 ? (
          <p className="text-center text-gray-500">No employees found.</p>
        ) : (
          <ScrollArea className="space-y-2 h-72 rounded-lg p-2">
            <div className="pr-2">
              {adminProfile && (
                <button
                  key={adminProfile.id}
                  onClick={() => setSelectedProfile(adminProfile.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors hover:bg-customPrimary-50/80 ${
                    selectedProfile === adminProfile.id
                      ? "border-2 border-customPrimary-500"
                      : ""
                  }`}
                >
                  <div className="relative">
                    <Avatar
                      src={adminProfile.image || adminProfile.name[0]}
                      alt="Admin"
                      className="rounded-full border-2 border-customPrimary-500"
                    />
                    <Crown className="absolute -top-4 -left-1 h-4 w-4 text-customPrimary-500" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-medium text-customPrimary-500 capitalize">
                      {adminProfile.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Role:{" "}
                      <span className="text-black">{adminProfile.role}</span>
                    </div>
                  </div>
                  {selectedProfile === adminProfile.id && (
                    <div className="w-5 h-5 rounded-full bg-[#22C55E] flex items-center justify-center">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                  )}
                </button>
              )}
              {otherProfiles.map((profile) => (
                <button
                  key={profile.id}
                  onClick={() => setSelectedProfile(profile.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors hover:bg-customPrimary-50/80 ${
                    selectedProfile === profile.id
                      ? "border-2 border-customPrimary-500"
                      : ""
                  }`}
                >
                  <div className="relative">
                    <Avatar
                      src={profile.image || profile.name[0]}
                      alt={profile.name}
                      className="rounded-full border-2 border-customPrimary-500"
                    />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-medium text-customPrimary-500">
                      {profile.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Role: <span className="text-black">{profile.role}</span>
                    </div>
                  </div>
                  {selectedProfile === profile.id && (
                    <div className="w-5 h-5 rounded-full bg-[#22C55E] flex items-center justify-center">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </ScrollArea>
        )}

        <Button
          size="sm"
          radius="sm"
          className="bg-customPrimary-500 text-white flex justify-self-end mt-4"
          disabled={!selectedProfile}
          onClick={handleProceed}
        >
          Proceed
        </Button>
      </div>

      {/* Dialog for 6-digit Code Input */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl text-customPrimary-500 font-semibold ">
              Enter 6-Digit Code
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 justify-center items-center">
            <InputOTP
              maxLength={6}
              value={code}
              onChange={(value) => setCode(value)}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
          <DialogFooter>
            <Button
              onClick={handleSubmitCode}
              radius="sm"
              size="sm"
              disabled={code.length !== 6}
              className="bg-customPrimary-500 text-white"
            >
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
