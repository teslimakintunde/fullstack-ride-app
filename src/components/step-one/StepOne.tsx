"use client";
import React, { useEffect, useState } from "react";

import toast from "react-hot-toast";
import { StepOneFormData, CustomLocation } from "../../../types";
// import SharedMap from "../share-map/SharedMap";
import CitySelect from "../city-select/CitySelect";
import { pickupTime } from "@/constants/appdata";
import SelectForm from "../select-form/SelectForm";
// import DateTimeForm from "../datetime-form/DateTimeForm";
import dynamic from "next/dynamic";
import DateSelection from "../date-selection/DateSelection";

const SharedMap = dynamic(() => import("../share-map/SharedMap"), {
  ssr: false,
});

interface StepOneProps {
  formData: StepOneFormData;
  setFormData: React.Dispatch<React.SetStateAction<StepOneFormData>>;
  setIsDateRangeAvailable?: (isAvailable: boolean) => void; // Optional callback to parent
  reset?: boolean; // Add reset prop
}
const StepOne: React.FC<StepOneProps> = ({
  formData,
  setFormData,
  setIsDateRangeAvailable,
  reset,
}) => {
  const [error, setError] = useState<string | null>(null);

  const handleLocationSelect = (location: CustomLocation) => {
    setFormData((prev) => ({
      ...prev,
      pickupLocation:
        prev.activeMode === "source" ? location : prev.pickupLocation,
      destinationLocation:
        prev.activeMode === "destination" ? location : prev.destinationLocation,
    }));
  };

  const checkDateRangeAvailability = async (startDate: Date, endDate: Date) => {
    try {
      const BASE_URL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
      const res = await fetch(
        `${BASE_URL}/api/bookings/check?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`
      );

      if (!res.ok) {
        throw new Error("Failed to fetch availability");
      }

      const data = await res.json();
      if (data.booked) {
        setError("This date range is already booked. Please select another.");
        toast.error(
          "This date range is already booked. Please select another."
        );
      } else {
        setError(null);
      }

      if (setIsDateRangeAvailable) {
        setIsDateRangeAvailable(!data.booked);
      }
    } catch (error) {
      console.error("Error checking date range:", error);
      setError("Could not check date availability.");
      if (setIsDateRangeAvailable) {
        setIsDateRangeAvailable(false);
      }
    }
  };

  useEffect(() => {
    if (formData.startDate && formData.endDate) {
      checkDateRangeAvailability(formData.startDate, formData.endDate);
    }
  }, [formData.startDate, formData.endDate]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mx-10 md:mx-[10%] my-10 mt-32">
      <div className="flex flex-col space-y-7">
        <DateSelection
          formData={formData}
          setFormData={setFormData}
          reset={reset}
        />

        {error && <p className="text-red-500">{error}</p>}

        <SelectForm
          id="pickuptime"
          label="Pickup Time"
          placeholder="Set pickup time"
          list={pickupTime}
          value={formData.pickupTime} // Set the current value from state
          onChange={(value) =>
            setFormData((prev) => ({ ...prev, pickupTime: String(value) }))
          } // Update state on change
        />
        <SelectForm
          id="persons"
          label="Persons"
          placeholder="Select persons"
          list={[1, 2, 3, 4, 5, 6]} // Provide options directly
          value={formData.persons}
          onChange={(value) =>
            setFormData((prev) => ({ ...prev, persons: String(value) }))
          }
        />
        <CitySelect
          id="source"
          label="Pick Up Spot"
          value={formData.pickupLocation}
          onChange={(location: CustomLocation) =>
            setFormData((prev) => ({ ...prev, pickupLocation: location }))
          }
          setActiveMode={(mode: "source" | "destination") =>
            setFormData((prev) => ({ ...prev, activeMode: mode }))
          }
        />
        <CitySelect
          id="destination"
          label="Destination"
          value={formData.destinationLocation}
          onChange={(location: CustomLocation) =>
            setFormData((prev) => ({ ...prev, destinationLocation: location }))
          }
          setActiveMode={(mode: "source" | "destination") =>
            setFormData((prev) => ({ ...prev, activeMode: mode }))
          }
        />
      </div>

      <div className="mt-10">
        <SharedMap
          // activeMode={formData.activeMode}
          pickupLocation={formData.pickupLocation}
          destinationLocation={formData.destinationLocation}
          onSelectLocation={handleLocationSelect}
        />
      </div>
    </div>
  );
};

export default StepOne;
