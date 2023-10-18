"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
export default function User() {
  const router = useRouter();
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("User logged out successfully");
      router.push("/login");
    } catch (e) {
      console.log(e);
    }
  };

  const [user, setUser] = useState("");
  const getUser = async () => {
    try {
      const res = await axios.get("/api/users/me");
      console.log(res.data);
      setUser(res.data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <div className="">
      <Navbar user={user} />
      This is a next app
      <br></br>
      <div className="my-20">
        Click{" "}
        <button onClick={logout} className="text-green-900">
          Here
        </button>{" "}
        to logout
      </div>
      <div>
        {user === "" ? (
          "No User Logged In"
        ) : (
          <Link href={`/user/${user._id}`}>{user.email} logged in</Link>
        )}
      </div>
    </div>
  );
}
