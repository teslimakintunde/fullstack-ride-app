"use client";
import React from "react";
import { Label } from "../ui/label";

export type CustomLocation = {
  lat: number;
  lng: number;
  address: string;
};

// Define the props type for CitySelect
interface CitySelectProps {
  id: "source" | "destination";
  label: string;
  value: CustomLocation | null;
  onChange: (location: CustomLocation) => void;
  setActiveMode: (mode: "source" | "destination") => void;
}

const CitySelect: React.FC<CitySelectProps> = ({
  id,
  label,
  value,
  onChange,
  setActiveMode,
}) => {
  return (
    <div>
      <Label htmlFor={id} className="font-semibold text-md">
        {label}
      </Label>
      <input
        type="text"
        id={id}
        className="border p-2 w-full rounded-md mt-1"
        placeholder={`Select ${label.toLowerCase()} on map or enter manually`}
        value={value?.address || ""}
        // onChange={(e) => onChange({ ...value, address: e.target.value })} // Allow manual input
        onChange={(e) =>
          onChange({
            ...value,
            address: e.target.value,
            lat: value?.lat || 0, // Provide a default value for lat
            lng: value?.lng || 0, // Provide a default value for lng
          })
        }
        onFocus={() => setActiveMode(id)} // Set Active Mode When Focused
      />
    </div>
  );
};

export default CitySelect;
