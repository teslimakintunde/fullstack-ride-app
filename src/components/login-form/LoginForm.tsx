"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import toast from "react-hot-toast";

const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false, // Prevents automatic redirection
    });

    // if (result?.error) {
    //   setError("Invalid email or password");
    //   setLoading(false);
    // } else {
    //   router.push("/"); // Redirect to homepage on success
    // }
    if (result?.error) {
      console.warn("Login failed:", result.error); // Use console.warn instead of console.error to avoid red warnings
      if (result.error === "CredentialsSignin") {
        // setError(
        //   "Invalid email or password. You can register if you have not!  "
        // ); // Show a user-friendly message
        toast.error(
          "Invalid email or password. You can register if you have not!  "
        );
      } else {
        // setError("An unexpected error occurred. Please try again.");
        toast.error(
          "Invalid email or password. You can register if you have not!  "
        );
      }
    } else {
      console.log("Login successful, redirecting...");
      router.push("/");
    }
    setLoading(false);
  };
  const handleForgotPassword = () => {
    if (!email) {
      // alert("Please enter your email before resetting your password.");
      toast.success("Please enter your email before resetting your password.");
      return;
    }
    const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    router.push(
      `${BASE_URL}/forgot-password?email=${encodeURIComponent(email)}`
    );
  };
  return (
    <section className="md:w-[60%] w-full p-3 md:p-0">
      <form onSubmit={handleLogin} className="flex flex-col gap-5 w-full">
        <input
          type="email"
          placeholder="example.com"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-2 rounded-sm w-full"
          autoComplete="off"
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-4 py-2 rounded-sm w-full"
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="bg-red-400 text-white font-medium px-4 py-2 rounded-sm mb-10"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <div className="flex justify-between">
          <Link
            href="/register"
            className="text-black text-bold text-center mb-10"
          >
            {"Don't have an account?"} <b>Register</b>
          </Link>
          <Link
            href="/reset-password"
            className="text-blue-500 hover:underline"
            onClick={handleForgotPassword}
          >
            Forgot Password?
          </Link>
        </div>
      </form>
    </section>
  );
};

export default LoginForm;
