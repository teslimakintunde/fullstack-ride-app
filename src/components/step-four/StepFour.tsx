"use client";

import { useRouter } from "next/navigation";
import React from "react";

//import Image from "next/image";

import toast from "react-hot-toast";
import DisplayImage from "../display-image/DisplayImage";

// Define the Location type
type Location = {
  lat: number;
  lng: number;
  address: string;
};

// Define the FormData type
type FormData = {
  imgUrl: string;
  title: string;
  desc: string;
  price: string | number;
  pickupDate: string | string;
  pickupTime: string;
  persons: string | number;
  pickupLocation: Location | null;
  destinationLocation: Location | null;
  email: string;
  carSlug: string;
  comment: string;
  firstname: string;
  lastname: string;
  phoneNumber: string;
};

// Define the props for StepFour
interface StepFourProps {
  formData: FormData;
}

const StepFour: React.FC<StepFourProps> = ({ formData }) => {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting Order:", formData);

    if (!formData || Object.keys(formData).length === 0) {
      toast.error("Order data is missing!");
      return;
    }

    const sanitizedData = {
      imgUrl: formData.imgUrl || "",
      title: formData.title || "Unknown",
      desc: formData.desc || "",
      price: Number(formData.price) || 0,
      pickupDate: formData.pickupDate
        ? new Date(formData.pickupDate).toISOString()
        : new Date().toISOString(),
      pickupTime: formData.pickupTime || "",
      persons: Number(formData.persons) || 1,
      pickupLocation: formData.pickupLocation || {
        lat: 0,
        lng: 0,
        address: "Unknown",
      },
      destinationLocation: formData.destinationLocation || {
        lat: 0,
        lng: 0,
        address: "Unknown",
      },
      userEmail: formData.email || "no-email@example.com",
      carSlug: formData.carSlug || "default-slug",
      comment: formData.comment || "",
      phoneNumber: formData.phoneNumber || "",
    };

    try {
      const BASE_URL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
      const res = await fetch(`${BASE_URL}/api/order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sanitizedData),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Error Response:", errorText);
        throw new Error("Failed to submit order. Please try again.");
      }

      const responseData = await res.json();
      console.log("Order submitted successfully:", responseData);
      toast.success("Order submitted successfully!");

      localStorage.setItem("recentOrder", JSON.stringify(responseData));
      router.push("/success");
    } catch (error) {
      console.error("Submit Error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  console.log(formData);

  return (
    <div className="max-w-[1150px] mx-auto">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 p-4 mt-10">
        <div className="relative w-full mb-4 rounded overflow-hidden">
          <DisplayImage imgUrl={formData?.imgUrl} />
        </div>
        <div className="pt-8">
          <div className="flex justify-between items-center border-b mb-5 pb-5">
            <h3 className="text-3xl font-bold ">{formData?.title}</h3>
            <p className="text-lg font-bold text-black">
              Price: <span className="text-2xl">${formData.price}</span>
            </p>
          </div>
          <h3 className="text-2xl font-bold mb-5">Order Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 bg-slate-50 p-5 rounded-lg mb-8">
            <div className="flex gap-10 p-2">
              <span className="font-bold">First Name:</span>
              <span>{formData.firstname}</span>
            </div>
            <div className="flex gap-10 p-2">
              <span className="font-bold">Last Name:</span>
              <span>{formData.lastname}</span>
            </div>
            <div className="flex gap-10 p-2">
              <span className="font-bold">Email:</span>
              <span>{formData.email}</span>
            </div>
            <div className="flex gap-10 p-2">
              <span className="font-bold">Pick Up Date:</span>

              <span>
                {formData.pickupDate
                  ? new Date(formData.pickupDate).toLocaleDateString()
                  : "N/A"}
              </span>
            </div>
            <div className="flex gap-10 p-2">
              <span className="font-bold">Pick Up Time:</span>
              <span>{formData.pickupTime}</span>
            </div>
            <div className="flex gap-10 p-2">
              <span className="font-bold">Passenger:</span>
              <span>{formData.persons}</span>
            </div>

            <div className="flex gap-10 p-2">
              <span className="font-bold">Destination:</span>
              <span>{formData.destinationLocation?.address || "N/A"}</span>
            </div>

            <div className="flex gap-10 p-2">
              <span className="font-bold">Comment:</span>
              <span>{formData.comment}</span>
            </div>
          </div>

          <button
            className="bg-black text-white font-bold w-full py-2.5 px-4 rounded-md"
            //onClick={Submit}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default StepFour;
