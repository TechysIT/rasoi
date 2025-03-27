"use client";

import type React from "react";

import { useState } from "react";
import { Trash2, Upload, X } from "lucide-react";
import { Button } from "@heroui/button";
import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

import { Input } from "@/components/ui/input";
import { FileUploader } from "react-drag-drop-files";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button as UIButton } from "@/components/ui/button";

const socialOptions = [
  {
    value: "FaFacebook",
    icon: <FaFacebook size="1.5em" className="text-customPrimary-500" />,
  },
  {
    value: "FaTwitter",
    icon: <FaTwitter size="1.5em" className="text-customPrimary-500" />,
  },
  {
    value: "FaInstagram",
    icon: <FaInstagram size="1.5em" className="text-customPrimary-500" />,
  },
  {
    value: "FaLinkedin",
    icon: <FaLinkedin size="1.5em" className="text-customPrimary-500" />,
  },
];

export default function StoreSettings() {
  const [iconLinks, setIconLinks] = useState<{ icon: string; link: string }[]>(
    []
  );
  const [selectedIcon, setSelectedIcon] = useState("FaFacebook");
  const [link, setLink] = useState("");
  const addIconLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (link.trim()) {
      setIconLinks((prevLinks) => [...prevLinks, { icon: selectedIcon, link }]);
      setLink("");
    }
  };

  const handleRemove = (index: number) => {
    setIconLinks((prevLinks) => prevLinks.filter((_, i) => i !== index));
  };

  // image
  const [preview, setPreview] = useState<string | null>(null);

  const handleUpload = (file: File | null) => {
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
    }
  };

  const handleRemoveLogo = () => {
    setPreview(null);
  };

  const [existingVouchers, setExistingVouchers] = useState([
    { code: "SUMMER2023", discount: 20 },
    { code: "WELCOME10", discount: 10 },
  ]);
  const [newVoucherCode, setNewVoucherCode] = useState("");
  const [newVoucherDiscount, setNewVoucherDiscount] = useState("");

  const handleAddVoucher = () => {
    if (newVoucherCode && newVoucherDiscount) {
      setExistingVouchers([
        ...existingVouchers,
        { code: newVoucherCode, discount: Number.parseInt(newVoucherDiscount) },
      ]);
      setNewVoucherCode("");
      setNewVoucherDiscount("");
    }
  };

  const handleDeleteVoucher = (code: string) => {
    setExistingVouchers(
      existingVouchers.filter((voucher) => voucher.code !== code)
    );
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-8">
        Store Settings
      </h1>
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="mb-4  bg-customPrimary-50 text-customPrimary-500">
          <TabsTrigger value="general">General Settings</TabsTrigger>
          <TabsTrigger value="vouchers">Gift Vouchers</TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <ScrollArea className="max-h-[70vh] overflow-y-auto p-4 scrollbar-default">
            <form className="space-y-6 p-2">
              {/* Logo Upload */}
              <Section
                title="Upload Store Logo"
                description="Upload a high-quality image of your store's logo."
              >
                {!preview ? (
                  <FileUploader
                    multiple={false}
                    types={["png", "jpg", "jpeg"]}
                    handleChange={(file: File | null) => handleUpload(file)}
                    uploadedLabel="Uploaded Successfully! Upload another?"
                  >
                    <div className="border border-dashed border-customPrimary-100 p-14 text-center text-gray-500">
                      <Upload className="mx-auto mb-2 text-customPrimary-500" />
                      <p>Drag and drop or click to upload</p>
                    </div>
                  </FileUploader>
                ) : (
                  <div className="flex justify-start items-center gap-5">
                    <Image
                      src={preview || "/placeholder.svg"}
                      alt="Store Logo"
                      className="w-40 h-40 object-contain border rounded-lg"
                      width={200}
                      height={200}
                    />
                    <Button
                      onClick={handleRemoveLogo}
                      className="bg-transparent text-orange-600 font-medium"
                    >
                      Remove Logo
                    </Button>
                  </div>
                )}
              </Section>

              {/* Store Name */}
              <Section
                title="Store Name"
                description="Official name of your store as it will appear on receipts and invoices."
              >
                <Input
                  id="store-name"
                  placeholder="Store Name"
                  className=""
                  type="text"
                />
              </Section>
              {/* location  */}
              <Section
                title="Store Location"
                description="Full address of your store with zip code as it will appear on receipts and invoices."
              >
                <Input
                  id="store-location"
                  placeholder="Store Address"
                  type="text"
                />
              </Section>

              <Section
                title="VAT Number"
                description="Your store's VAT number for tax purposes."
              >
                <Input id="vat-number" placeholder="VAT Number" type="text" />
              </Section>

              <Section
                title="VAT Percentage"
                description="Specify the VAT percentage applicable to your store."
              >
                <Input id="vat-percentage" placeholder="VAT %" type="number" />
              </Section>

              <Section
                title="Store Website"
                description="Your store's official website link."
              >
                <Input
                  id="store-website"
                  placeholder="Website URL"
                  type="url"
                />
              </Section>

              <Section
                title="Store Hotline"
                description="The customer service hotline number for your store."
              >
                <Input
                  id="store-hotline"
                  placeholder="Hotline Number"
                  type="tel"
                />
              </Section>

              <Section
                title="Registration Number"
                description="Your store's official business registration number."
              >
                <Input
                  id="reg-number"
                  placeholder="Registration Number"
                  type="text"
                />
              </Section>

              <Section
                title="Email Address"
                description="Your store's primary contact email."
              >
                <Input
                  id="store-email"
                  placeholder="Email Address"
                  type="email"
                />
              </Section>

              <Section
                title="Privacy Policy"
                description="Provide a link to your store's privacy policy."
              >
                <Input
                  id="privacy-policy"
                  placeholder="Privacy Policy URL"
                  type="url"
                />
              </Section>

              {/* Social Links */}
              <Section
                title="Social Links"
                description="Link your store's social media to connect with customers."
              >
                {iconLinks.map((item, index) => (
                  <div key={index} className="flex items-center gap-2 mb-2">
                    <span className="w-24 flex justify-center items-center border border-black/10 rounded-md p-2">
                      {
                        socialOptions.find(
                          (option) => option.value === item.icon
                        )?.icon
                      }
                    </span>
                    <div className="w-full border border-black/10 rounded-md p-2 flex justify-between items-center">
                      <Link
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-black/40"
                      >
                        {item.link}
                      </Link>
                      <button
                        onClick={() => handleRemove(index)}
                        className="border border-customPrimary-500 text-red-500 rounded-full focus:outline-none mx-2"
                      >
                        <X size={15} />
                      </button>
                    </div>
                  </div>
                ))}

                <div className="grid grid-cols-7 gap-2 justify-center items-center">
                  <Select
                    onValueChange={(value) => setSelectedIcon(value)}
                    defaultValue={"FaFacebook"}
                  >
                    <SelectTrigger className="border border-customPrimary-100 bg-white">
                      <SelectValue placeholder="Select Social Media" />
                    </SelectTrigger>
                    <SelectContent>
                      {socialOptions.map((option) => (
                        <SelectItem
                          key={option.value}
                          value={option.value}
                          className="flex items-center gap-2"
                        >
                          {option.icon}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    placeholder="Paste your website link"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    className="col-span-6"
                  />
                </div>
                <div className="flex justify-end">
                  <Button
                    onClick={addIconLink}
                    className="font-medium col-span-1 bg-transparent p-0 text-customPrimary-500 hover:bg-none hover:text-customPrimary-300"
                  >
                    Add Another
                  </Button>
                </div>
              </Section>

              {/* Form Actions */}
              <div className="flex justify-end space-x-4">
                <Button radius="sm" className="bg-transparent">
                  Cancel
                </Button>
                <Button
                  radius="sm"
                  className="bg-customPrimary-500 text-white hover:bg-custtext-customPrimary-500/90"
                >
                  Save Details
                </Button>
              </div>
            </form>
          </ScrollArea>
        </TabsContent>
        <TabsContent value="vouchers">
          <ScrollArea className="max-h-[70vh] overflow-y-auto p-4 scrollbar-hide">
            <form className="space-y-6 p-2 ">
              {/* previous vouchar  */}
              <Section
                title={"Existing Vouchers"}
                description={"Voucher that makes previously"}
              >
                <div className="space-y-2">
                  {existingVouchers.map((voucher) => (
                    <div
                      key={voucher.code}
                      className="flex items-center justify-between bg-gray-100 p-2 rounded"
                    >
                      <span>
                        <strong>{voucher.code}</strong> - {voucher.discount}%
                        off
                      </span>
                      <UIButton
                        onClick={() => handleDeleteVoucher(voucher.code)}
                        variant="destructive"
                        size="sm"
                      >
                        <Trash2 />
                      </UIButton>
                    </div>
                  ))}
                </div>
              </Section>
              {/* Gift Vouchers */}
              <Section
                title="Gift Vouchers"
                description="Offer flexible gifting options for your customers."
              >
                <div className="flex gap-4 items-center">
                  <Input
                    placeholder="Enter code"
                    type="text"
                    value={newVoucherCode}
                    onChange={(e) => setNewVoucherCode(e.target.value)}
                  />
                  <Input
                    placeholder="Enter price"
                    type="number"
                    value={newVoucherDiscount}
                    onChange={(e) => setNewVoucherDiscount(e.target.value)}
                  />
                </div>
                <div className="flex gap-2 mt-2 justify-end items-center">
                  {/* <Button radius="sm" variant="ghost" className="text-gray-600">
                    Remove old
                  </Button> */}
                  <Button
                    radius="sm"
                    className="bg-transparent  text-customPrimary-500  hover:bg-custtext-customPrimary-500/90"
                  >
                    Print Voucher
                  </Button>{" "}
                  <Button
                    radius="sm"
                    variant="ghost"
                    className="text-customPrimary-500"
                  >
                    Add new
                  </Button>
                </div>
              </Section>

              {/* Form Actions */}
              <div className="flex justify-end items-end space-x-4 ">
                <Button radius="sm" className="bg-transparent">
                  Cancel
                </Button>
                <Button
                  radius="sm"
                  className="bg-customPrimary-500 text-white hover:bg-custtext-customPrimary-500/90"
                >
                  Save Details
                </Button>
              </div>
            </form>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-2 gap-2 items-center">
      <div className="space-y-2">
        <h2 className="text-customPrimary-500 font-medium">{title}</h2>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <div>{children}</div>
    </div>
  );
}
