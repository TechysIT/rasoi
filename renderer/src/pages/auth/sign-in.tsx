import { useState } from "react";
import { KeyRound, Eye, EyeOff, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 ">
      <div className="flex justify-center mb-8">
        <div className="flex items-center gap-2">
          <Image src="/demo.jpg" alt="Techy's Logo" width={32} height={32} />
          <span className="text-3xl font-semibold text-customPrimary-500">
            Techy's
          </span>
        </div>
      </div>
      <div className="w-full max-w-[480px] p-8 bg-white rounded-2xl shadow-sm">
        <h1 className="text-3xl text-customPrimary-500 font-semibold text-center mb-4">
          Log in
        </h1>
        <p className="text-center text-muted-foreground mb-8">
          Please enter your credentials below to continue
        </p>

        <form className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-customPrimary-500">
              Email
            </Label>
            <div className="relative">
              <UserCircle className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="pl-10 bg-customPrimary-50"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-customPrimary-500">
              Password
            </Label>
            <div className="relative">
              <KeyRound className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="pl-10 pr-10 bg-customPrimary-50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox id="remember" className="border-customPrimary-500 " />
              <label
                htmlFor="remember"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-customPrimary-500"
              >
                Remember me
              </label>
            </div>
            <Link
              href="/forgot-password"
              className="text-sm font-medium text-customPrimary-500 hover:text-customPrimary-500/90"
            >
              Forgot Password?
            </Link>
          </div>

          <Button
            type="submit"
            className="w-full bg-customPrimary-500 hover:bg-customPrimary-500/90 text-white"
          >
            Log in
          </Button>
        </form>
      </div>
    </div>
  );
}
