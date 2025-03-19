"use client";

import { useRouter } from "next/navigation";
import { StepTwoFormData } from "../../../types";
import Image from "next/image";

interface InsightCardProps {
  imgUrl: string;
  title: string;
  desc: string;
  price: string;
  index: number;
  isForm: boolean;
  formData: StepTwoFormData;
  setFormData: React.Dispatch<React.SetStateAction<StepTwoFormData>>;
  carSlug: string;
}

const InsightCard: React.FC<InsightCardProps> = ({
  imgUrl,
  title,
  desc,
  price,
  index,
  isForm,
  formData,
  setFormData,
  carSlug,
}) => {
  const router = useRouter();

  return (
    <div className="flex justify-center md:flex-row flex-col gap-6  border p-4 rounded-lg shadow-md">
      <Image
        src={imgUrl}
        width={250}
        height={250}
        className="md:w-[350px] w-full h-[250px] rounded-[32px] object-cover"
        alt=""
      />

      <div>
        <div className="flex justify-between">
          <h4 className="font-extrabold text-slate-500 lg:text-[42px] text-[22px]">
            {title}
          </h4>
          {isForm && (
            <button
              type="button"
              onClick={() => {
                setFormData((prev) => ({
                  ...prev,
                  imgUrl,
                  title,
                  desc,
                  price,
                  carSlug,
                }));
                router.replace(`/booking-page?index=2&option=${index}`, {
                  scroll: false,
                });
              }}
              className={`${
                formData.imgUrl === imgUrl
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              } h-12 text-md px-7 rounded-full transition-all`}
            >
              {formData.imgUrl === imgUrl ? "Selected" : "Select"}
            </button>
          )}
        </div>
        <p className="mt-4 font-normal lg:text-lg text-sm text-slate-400">
          {desc}
        </p>
      </div>
    </div>
  );
};

export default InsightCard;
