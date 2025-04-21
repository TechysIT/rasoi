// Global Imports
import React, { useState, useEffect } from "react";
import { Button } from "@heroui/button";
import { FileUploader } from "react-drag-drop-files";
import Image from "next/image";

// Local Imports
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/modal";

type UploadProfileProps = {
  previousImage?: string;
  fallbackText: string;
};

function UploadProfile({ previousImage, fallbackText }: UploadProfileProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (previousImage) {
      setPreview(previousImage);
    }
  }, [previousImage]);

  const handleChange = (file: File) => {
    setFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const renderAvatar = () => {
    if (preview) {
      return (
        <Image
          src={preview}
          alt="Profile"
          width={100}
          height={100}
          className="rounded-full object-cover border"
        />
      );
    } else {
      return (
        <div className="w-[100px] h-[100px] rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-semibold text-xl border">
          {fallbackText}
        </div>
      );
    }
  };

  return (
    <>
      <div className="mb-4 flex justify-center">{renderAvatar()}</div>

      <Button
        variant="ghost"
        onPress={onOpen}
        className="border-none text-customPrimary-500 font-semibold mb-5"
      >
        Upload Photo
      </Button>

      <Modal backdrop={"blur"} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Upload Profile
              </ModalHeader>
              <ModalBody>
                <div className="flex justify-center items-center mb-4">
                  {renderAvatar()}
                </div>
                <FileUploader
                  className="bg-customPrimary-500"
                  handleChange={handleChange}
                  name="file"
                  types={["JPG", "PNG", "GIF"]}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  className="bg-customPrimary-500 text-white"
                  onPress={() => {
                    console.log("Uploading file:", file);
                  }}
                >
                  Upload
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default UploadProfile;
