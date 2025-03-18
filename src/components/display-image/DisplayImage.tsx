"use client";

import { CldImage } from "next-cloudinary";
import Image from "next/image";

type DisplayImageProps = {
  imgUrl: string;
};

const DisplayImage: React.FC<DisplayImageProps> = ({ imgUrl }) => {
  return (
    <div className="relative sm:h-[250px] md:h-[400px] hidden sm:block">
      {imgUrl ? (
        <div className="relative h-[320px]">
          <CldImage
            src={imgUrl}
            alt="collection"
            className="object-cover rounded-lg"
            fill
          />
        </div>
      ) : (
        <div className="relative h-[300px]">
          <Image src={"/p1.jpeg"} alt="" fill />
        </div>
      )}
    </div>
  );
};

export default DisplayImage;
