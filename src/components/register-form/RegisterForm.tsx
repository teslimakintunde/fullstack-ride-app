"use client";

import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

const RegisterForm = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [error, setError] = useState("");

  console.log(password, passwordRepeat);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    if (password !== passwordRepeat) {
      setError("Passwords do not match");
      return;
    }

    const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const response = await fetch(`${BASE_URL}/api/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, passwordRepeat }),
    });
    const data = await response.json();

    if (response.ok) {
      router.push("/login");
    } else {
      setError(data.message || "Registration failed");
    }
  };
  console.log(email, password, passwordRepeat);
  return (
    <section>
      <form onSubmit={handleLogin}>
        <div className="max-w-[500px] mx-auto">
          <input
            type="email"
            placeholder="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-3 py-3 w-full my-5 border font-roboto"
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-3 py-3 w-full border font-roboto"
          />
          <input
            type="password"
            placeholder="password again"
            name="passwordRepeat"
            value={passwordRepeat}
            onChange={(e) => setPasswordRepeat(e.target.value)}
            className="px-3 py-3 w-full my-5 border font-roboto"
          />
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="bg-blue-600 text-white font-medium text-center w-full py-3 rounded-sm mt-5"
          >
            Register
          </button>
        </div>
      </form>
    </section>
  );
};

export default RegisterForm;
