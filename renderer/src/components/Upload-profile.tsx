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
  previousImage: string;
};

function UploadProfile({ previousImage }: UploadProfileProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  // Set the initial preview to the previous image
  useEffect(() => {
    if (previousImage) {
      setPreview(previousImage);
    }
  }, [previousImage]);

  const handleChange = (file: File) => {
    setFile(file);

    // Create a file reader to read the file as a data URL for preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };

    // If the file is valid, read it as a data URL
    if (file) {
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  return (
    <>
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
                {preview && (
                  <div className="flex justify-center items-center">
                    <Image
                      src={preview}
                      alt="Preview"
                      width={200}
                      height={200}
                      className="rounded-full border object-contain"
                    />
                  </div>
                )}
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
                    // Add your upload logic here
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
