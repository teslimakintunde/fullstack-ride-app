"use client";

import React from "react";
import { Label } from "../ui/label";
type SelectFormProps = {
  id: string;
  label: string;
  placeholder: string;
  list: (string | number)[]; // Allow both strings and numbers
  value: string | number; // Allow both strings and numbers
  onChange: (value: string | number) => void; // Ensure correct type
};

const SelectForm: React.FC<SelectFormProps> = ({
  id,
  label,
  placeholder,
  list,
  value,
  onChange,
}) => {
  return (
    <div>
      <Label htmlFor={id} className="font-semibold text-md">
        {label}
      </Label>
      <select
        id={id}
        name={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border rounded-md px-3 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">{placeholder}</option>
        {list?.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectForm;
