"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import "./loader.css";

export default function Login() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = await axios.post("/api/users/signup", {
        name: user.name,
        email: user.email,
        password: user.password,
      });
      toast.success("User created successfully");
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (error) {
      toast.error(error.response.data.error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-200 h-screen w-screen overflow-hidden">
      <div className="text-center mt-20">
        <h1 className="text-5xl font-semibold">Betiyan Nidhi Limited</h1>
        <p className="text-xl text-gray-600">Signup your account</p>
      </div>
      <form
        className="w-1/4 bg-white rounded-lg shadow-md p-8 mt-10 mx-auto"
        onSubmit={handleSubmit}
      >
        {loading ? (
          <div className="text-center py-4">
            <span className="loader"></span>
            <p className="text-black">Signing up...</p>
          </div>
        ) : (
          <>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium">
                Name
              </label>
              <input
                id="name"
                type="string"
                required
                className="w-full border rounded-lg p-2"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                placeholder="Enter your name"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                className="w-full border rounded-lg p-2"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                className="w-full border rounded-lg p-2"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              className={`w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 rounded-lg ${
                loading ? "opacity-50 cursor-wait" : ""
              }`}
              disabled={loading}
            >
              Sign Up
            </button>
          </>
        )}
      </form>
    </div>
  );
}
