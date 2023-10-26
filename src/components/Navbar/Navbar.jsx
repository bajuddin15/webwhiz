"use client";
import { signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import { HiOutlineMenu } from "react-icons/hi";
import { MdDarkMode, MdOutlineDarkMode } from "react-icons/md";

import webwhizLogo from "../../assets/webwhiz-2.png";

const Navbar = () => {
  const { data, status } = useSession();
  const { systemTheme, theme, setTheme } = useTheme();
  useEffect(() => {
    const currentTheme = theme === "system" ? systemTheme : theme;
    if (currentTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);
  return (
    <div className="flex items-center justify-between py-4 md:py-5">
      <div className="flex items-center gap-10">
        <div className="">
          {/* <img
            src="/webwhiz-2.png"
            alt="webwhiz"
            className="w-[120px] h-[120px] mb-5"
          /> */}
          <Image
            src={webwhizLogo}
            alt="webwhiz"
            width={180}
            height={180}
            className="mb-5"
          />
        </div>
        <ul className="hidden md:flex items-center gap-10 text-md md:text-xl">
          <li className="cursor-pointer hover:underline">Home</li>
          <li className="cursor-pointer hover:underline">About</li>
          <li className="cursor-pointer hover:underline">Contact</li>
        </ul>
      </div>
      <div className="hidden md:flex items-center gap-10 text-md md:text-xl">
        <div className="flex items-center gap-4 bg-teal-100 px-5 py-3 rounded-full">
          <input
            type="text"
            placeholder="Search here..."
            className="border-none outline-none bg-inherit text-md text-black"
          />
          <div className="text-teal-700">
            <BiSearch size={24} className="cursor-pointer" />
          </div>
        </div>
        {status === "authenticated" ? (
          <>
            <span className="cursor-pointer hover:underline">
              {data?.session?.user?.name}
            </span>
            <span
              className="cursor-pointer hover:underline"
              onClick={() => signOut()}
            >
              Logout
            </span>
          </>
        ) : (
          <Link href="/sign-in">
            <span className="cursor-pointer hover:underline">Sign in</span>
          </Link>
        )}

        {theme === "dark" ? (
          <div
            className="cursor-pointer text-teal-700"
            onClick={() => setTheme("light")}
          >
            <MdOutlineDarkMode size={28} />
          </div>
        ) : (
          <div
            className="cursor-pointer text-teal-700"
            onClick={() => setTheme("dark")}
          >
            <MdDarkMode size={28} />
          </div>
        )}

        <button className="bg-teal-600 text-white hover:bg-teal-700 font-bold cursor-pointer px-10 py-3 rounded-full">
          Become a subscriber
        </button>
      </div>
      <div className="flex md:hidden cursor-pointer">
        <HiOutlineMenu size={28} />
      </div>
    </div>
  );
};

export default Navbar;
