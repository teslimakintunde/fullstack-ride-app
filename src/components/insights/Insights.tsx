"use client";
import React, { useEffect, useState } from "react";

import { StepTwoFormData, CarOption } from "../../../types";
import InsightCard from "../insight-card/InsightCard";

interface InsightsProps {
  isForm: boolean;
  formData: StepTwoFormData;
  setFormData: React.Dispatch<React.SetStateAction<StepTwoFormData>>;
}

const Insights: React.FC<InsightsProps> = ({
  isForm,
  formData,
  setFormData,
}) => {
  const [data, setData] = useState<CarOption[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const BASE_URL =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
        const res = await fetch(`${BASE_URL}/api/get-car`, {
          method: "GET",
        });
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await res.json();
        setData(jsonData);
      } catch (error) {
        console.log("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []); // Fetch data on mount

  console.log(data);

  return (
    <div className="max-w-[1280px] mx-auto flex flex-col px-4">
      <form className="mt-12 flex flex-col gap-x-10 gap-y-10">
        <div>
          {loading ? (
            <p className="text-xl">Loading...</p>
          ) : (
            data?.map((option, index) => (
              <InsightCard
                key={index}
                imgUrl={option?.imgUrl}
                title={option?.title}
                desc={option?.desc}
                price={option?.price}
                carSlug={option?.slug}
                index={index}
                isForm={isForm}
                formData={formData}
                setFormData={setFormData}
              />
            ))
          )}
        </div>
      </form>
    </div>
  );
};

export default Insights;
