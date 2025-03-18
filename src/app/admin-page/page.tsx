"use client";

// import ImageUpload from "@/components/image-upload/ImageUpload";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";
// Dynamic import for ImageUpload, disabled on server-side
const ImageUpload = dynamic(
  () => import("@/components/image-upload/ImageUpload"),
  {
    ssr: false,
  }
);

const AdminPage = () => {
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  // const [title, setTitle] = useState("");
  const [passenger, setpassenger] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const router = useRouter();

  const handlePassengerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setpassenger(value);
    } else {
      toast.error("Please enter only numbers for passengers");
    }
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      // Allows decimal numbers
      setPrice(value);
    } else {
      toast.error("Please enter a valid number for price");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!desc || !passenger || !category || !image || !price) {
      return toast.error("Missing input fields");
    }
    try {
      const BASE_URL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
      const res = await fetch(`${BASE_URL}/api/admin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          slug: category.toLowerCase().replace(/\s+/g, "-"), // Convert to slug format
          title: category,
          desc: desc,
          passenger: Number(passenger),
          price: Number(price),
          imgUrl: image,
        }),
      });
      if (!res.ok)
        throw new Error(
          "There is a problem while trying to save the car model"
        );
      if (!res.ok) throw new Error("Failed to save the car model");

      const data = await res.json();
      if (data.success) {
        toast.success("Car Model Created Successfully");
        setDesc("");
        setImage("");
        setCategory("");
        setpassenger("");
        setPrice("");
        // Optional: Redirect or refresh data
        router.push("/admin");
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <section>
      <div className="container mt-[100px]">
        <h1 className="text-4xl font-medium mb-9 ">Upload Your Car Details</h1>
        <form onSubmit={handleSubmit} className="flex flex-col max-w-[60%]">
          <select
            name=""
            id=""
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border px-3 py-2 mb-9"
          >
            <option value="" disabled>
              Choose the car category
            </option>
            <option value="luxury sedan">Luxury Sedan</option>
            <option value="premium sedan">Premium Sedan</option>
            <option value="luxury suv">Luxury SUV</option>
            <option value="van">Van</option>
            <option value="transporter">Transporter</option>
          </select>
          <div>
            <label htmlFor="" className="">
              Enter Max Passenger
            </label>
            <input
              type="number"
              className="w-full p-3 mb-4 border mt-3"
              placeholder="Number of Passengers"
              value={passenger}
              onChange={handlePassengerChange}
            />
            <input
              type="text"
              className="w-full p-3 mb-4 border"
              placeholder="Enter Price"
              value={price}
              onChange={handlePriceChange}
            />
          </div>
          <div className="w-full h-[300px]">
            <textarea
              name=""
              id=""
              className="border w-full h-full p-5"
              placeholder="Enter the description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>

          <div className="max-w-[600px]">
            <ImageUpload
              value={image ? [image] : []}
              onChange={(url: string) => setImage(url)}
              onRemove={() => setImage("")}
            />
          </div>
          <div className="mt-5">
            <button className="px-6 py-2 bg-red-400 text-white font-medium rounded-sm">
              Sumit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AdminPage;
