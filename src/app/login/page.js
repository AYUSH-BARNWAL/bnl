"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import "../signup/loader.css";

export default function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const data = await axios.post("/api/users/login", {
        email: user.email,
        password: user.password,
      });
      // console.log(data);
      toast.success("User logged in successfully");
      // await setTimeout(() => {
      router.push("/promoter");
      // }, 3000);
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
        <p className="text-xl text-gray-600">Login to your account</p>
      </div>
      <form
        className="w-1/4 bg-white rounded-lg shadow-md p-8 mt-10 mx-auto"
        onSubmit={handleSubmit}
      >
        {loading ? (
          <div className="text-center py-4">
            <span className="loader"></span>
            <p className="text-black">
              Loggin in <br />
              Please wait.
            </p>
          </div>
        ) : (
          <>
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
              />
            </div>
            <div className="mb-4">
              <input id="remember" type="checkbox" className="mr-2" />
              <label htmlFor="remember" className="text-sm">
                Remember Me
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 rounded-lg"
            >
              Login
            </button>
          </>
        )}
      </form>
    </div>
  );
}
