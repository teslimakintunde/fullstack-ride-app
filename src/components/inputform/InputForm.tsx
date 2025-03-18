"use client";

import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

interface InputFormProps {
  id: string;
  label: string;
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputForm: React.FC<InputFormProps> = ({
  id,
  label,
  placeholder,
  type,
  value,
  onChange,
}) => {
  return (
    <div>
      <Label htmlFor={id} className="font-semibold text-md">
        {label}
      </Label>
      <div className="border-gray-300 bg-slate-100 border my-3">
        <Input
          id={id}
          name={id}
          placeholder={placeholder}
          className="bg-slate-100"
          type={type}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default InputForm;
