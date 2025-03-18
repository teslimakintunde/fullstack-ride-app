import React from "react";
import { Plus, Trash } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import { CldImage, CloudinaryUploadWidgetResults } from "next-cloudinary";

type ImageUploadProps = {
  onChange: (url: string) => void;
  onRemove: (url: string) => void;
  value: string[]; // Array of image URLs
};

const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  onRemove,
  value,
}) => {
  // const handleUploadSuccess = ({
  //   event,
  //   info,
  // }: {
  //   event: string;
  //   info?: { secure_url?: string };
  // }) => {
  //   if (event && info?.secure_url) {
  //     const url = info.secure_url;
  //     onChange(url);
  //   } else {
  //     console.error("Upload failed or missing URL", info);
  //   }
  // };
  const handleUploadSuccess = (results: CloudinaryUploadWidgetResults) => {
    if (
      results.event === "success" &&
      results.info &&
      typeof results.info === "object" &&
      "secure_url" in results.info
    ) {
      const url = results.info.secure_url as string;
      onChange(url);
    } else {
      console.error("Upload failed or missing URL", results);
    }
  };
  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-4">
        {value.map((url) => {
          console.log("Rendering image from URL:", url);

          return (
            <div key={url} className="relative w-[200px] h-[200px]">
              <div className="absolute top-0 right-0 z-10">
                <button
                  type="button"
                  onClick={() => onRemove(url)}
                  //size="sm"
                  className="bg-red-600 p-2 text-white "
                >
                  <Trash className="h-4 w-4 " />
                </button>
              </div>
              <CldImage
                src={url}
                alt="collection"
                className="object-cover rounded-lg"
                width={200}
                height={200}
                onError={(e) => console.error("Image failed to load:", e)}
              />
            </div>
          );
        })}
      </div>
      <CldUploadWidget uploadPreset="myyu6boo" onSuccess={handleUploadSuccess}>
        {({ open }) => {
          return (
            <button
              className="bg-red-400 text-[1rem]  py-2 text-white px-4 shrink-0 sm:px-6 sm:py-2 rounded-sm flex flex-row items-center"
              onClick={(e) => {
                e.preventDefault(); // ✅ Stops any accidental form submission
                open();
              }}
            >
              <Plus className="h-4 w-4 sm:mr-2 hidden sm:block" />
              Upload an Image
            </button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
