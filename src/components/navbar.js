"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";
import imaage from "../images/ClipartKey_297748.png";
import bnlLogo from "../images/bnl.png";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useEffect } from "react";

const Navbar = (props) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

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
      // console.log(res.data);
      setUser(res.data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 fixed w-full">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 relative">
        <Link href="#" className="flex items-center">
          <Image
            className="w-8 h-8 rounded-full"
            src={bnlLogo}
            alt=""
            width={50} // Specify either width or height, not both
            priority
          />

          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Betiyan Nidhi Ltd.
          </span>
        </Link>
        <div className="flex items-center md:order-2 flex-col">
          <button
            type="button"
            className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            id="user-menu-button"
            aria-expanded={isDropdownOpen}
            onClick={toggleDropdown}
          >
            <span className="sr-only">Open user menu</span>
            <Image
              className="w-8 h-8 rounded-full"
              src={imaage}
              alt=""
              width={50} // Specify either width or height, not both
              priority
            />
          </button>
          {/* Dropdown menu */}
          <div
            className={`z-50 ${
              isDropdownOpen ? "block" : "hidden"
            } absolute right-0 mt-14 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`}
            id="user-dropdown"
          >
            <div className="px-4 py-3">
              <span className="block text-sm text-gray-900 dark:text-white">
                {user.name}
              </span>
              <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                {user.email}
              </span>
            </div>
            <ul className="py-2" aria-labelledby="user-menu-button">
              <li>
                <Link
                  href="/user"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Settings
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Earnings
                </Link>
              </li>
              <li>
                <button
                  onClick={logout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Sign out
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-user"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                href="/member"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover-text-blue-500 dark:hover-bg-gray-700 dark:border-gray-700"
              >
                Members
              </Link>
            </li>
            <li>
              <Link
                href="/promoter"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover-text-blue-500 dark:hover-bg-gray-700 dark:border-gray-700"
              >
                Promoters
              </Link>
            </li>
            <li>
              <Link
                href="/transaction"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover-text-blue-500 dark:hover-bg-gray-700 dark:border-gray-700"
              >
                Transaction
              </Link>
            </li>
            <li>
              <Link
                href="/bankaccount"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover-text-blue-500 dark:hover-bg-gray-700 dark:border-gray-700"
              >
                Bank Accounts
              </Link>
            </li>
            <li>
              <Link
                href="/cashbook"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover-text-blue-500 dark:hover-bg-gray-700 dark:border-gray-700"
              >
                Cashbook
              </Link>
            </li>
            <li>
              <Link
                href="/bankbook"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover-text-blue-500 dark:hover-bg-gray-700 dark:border-gray-700"
              >
                Bankbook
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
