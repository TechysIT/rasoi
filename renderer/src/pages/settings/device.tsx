import ThemeSwitcher from "@/components/Them-switch";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/utils/cn";
import { Switch } from "@heroui/switch";

export default function DeviceSettings() {
  return (
    <div className="container mx-auto space-y-6">
      <h1 className="text-3xl font-bold pl-5  text-customPrimary-600">
        Device Settings
      </h1>
      <ScrollArea className="h-[74vh] p-5">
        <div className="grid grid-cols-2 gap-5 ">
          <Card>
            <CardHeader>
              <CardTitle>Barcode Scanner</CardTitle>
              <CardDescription>
                Enable or disable barcode scanner
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <Label htmlFor="barcode-scanner">Enable Scanner</Label>
                <Switch
                  classNames={{
                    base: cn(
                      "inline-flex flex-row-reverse w-full items-center justify-between cursor-pointer rounded-lg gap-2 p-4 border-transparent",
                      "bg-transparent hover:bg-none",
                      "data-[selected=true]:bg-none"
                    ),
                    wrapper: cn(
                      "p-0 h-4 overflow-visible",
                      "group-data-[selected=true]:bg-customPrimary-500"
                    ),
                    thumb: cn(
                      "w-6 h-6 border-2 shadow-lg transition-all",
                      "group-data-[hover=true]:border-customPrimary-500",
                      "group-data-[selected=true]:ms-6",
                      "group-data-[selected=true]:bg-white",
                      "group-data-[selected=true]:border-customPrimary-500",
                      "group-data-[pressed=true]:w-6",
                      "group-data-[selected]:group-data-[pressed]:ms-4"
                    ),
                  }}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Thermal Receipt Printer</CardTitle>
              <CardDescription>Configure printer settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <Label htmlFor="printer">Printer</Label>
                <Select>
                  <SelectTrigger className="max-w-sm">
                    <SelectValue placeholder="Select printer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="main">Main Printer</SelectItem>
                    <SelectItem value="backup">Backup Printer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Thermal Receipt Printer Paper Size</CardTitle>
              <CardDescription>Select paper size</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <Label htmlFor="paper-size">Paper Size</Label>
                <Select>
                  <SelectTrigger className="max-w-sm">
                    <SelectValue placeholder="Select paper size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="80mm">80mm</SelectItem>
                    <SelectItem value="58mm">58mm</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Choose Color Option</CardTitle>
              <CardDescription>Customise theme color</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ThemeSwitcher />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Timezone</CardTitle>
              <CardDescription>Set your device timezone</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <Label htmlFor="timezone">Timezone</Label>
                <Select>
                  <SelectTrigger className="max-w-sm">
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="GMT">GMT</SelectItem>
                    <SelectItem value="UTC">UTC</SelectItem>
                    <SelectItem value="PST">PST</SelectItem>
                    <SelectItem value="EST">EST</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Receipt Customization</CardTitle>
              <CardDescription>Modify receipt appearance</CardDescription>
            </CardHeader>
            <CardContent>
              <div>
                {[
                  { label: "Show Logo" },
                  { label: "Show Store Address" },
                  { label: "Show Website Link" },
                  { label: "Show Customer Signature" },
                ].map((option, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center my-2 w-full"
                  >
                    <p className="text-medium w-full text-left">
                      {option.label}
                    </p>
                    <div className="w-full flex justify-end px-4">
                      <Switch
                        classNames={{
                          base: "flex justify-between items-center cursor-pointer rounded-lg gap-2",
                          wrapper:
                            "p-0 h-5 overflow-visible group-data-[selected=true]:bg-customPrimary-200",
                          thumb: cn(
                            "w-6 h-6 border-2 shadow-lg bg-customPrimary-500",
                            "group-data-[hover=true]:border-customPrimary-500",
                            "group-data-[selected=true]:ml-6 ",
                            "group-data-[pressed=true]:w-7",
                            "group-data-[selected]:group-data-[pressed]:ml-4"
                          ),
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Software Update</CardTitle>
              <CardDescription>
                Check for updates and install the latest version
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <Label htmlFor="software-version">Current Version</Label>
                <span className="text-sm font-medium ">v1.2.3</span>
              </div>
              <div className="flex justify-between items-center">
                <Label htmlFor="update-status">Update Status</Label>
                <span className="text-sm text-green-600">Up to date</span>
              </div>
              <div className="flex justify-between items-center">
                <Label htmlFor="update-check">Check for Updates</Label>
                <Button variant="outline">Check Now</Button>
              </div>
              <div className="flex justify-between items-center">
                <Label htmlFor="install-update">Install Update</Label>
                <Button className="bg-customPrimary-500">Install</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
      <div className="flex justify-end gap-5 ">
        <Button variant="outline">Cancel</Button>
        <Button className="bg-customPrimary-600 hover:bg-customPrimary-700">
          Save Changes
        </Button>
      </div>
    </div>
  );
}
