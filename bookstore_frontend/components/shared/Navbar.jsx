"use client";
import { toggleTheme } from "@/lib/theme/themeSlice";
import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const Navbar = ({ children }) => {
  const theme = useSelector((state) => state.theme.value);
  const dispatch = useDispatch();
  return (
    <nav
      className={`flex w-screen p-3 md:pt-8 md:pr-12 md:sticky md:top-0 justify-end items-center gap-8 max-sm:flex-row-reverse backdrop-blur-lg`}
    >
      <Link href='/add' className="button-effect">Add</Link>
      <button onClick={() => dispatch(toggleTheme())}>Change</button>
      <Link href='/'>{children}</Link>
    </nav>
  );
};

export default Navbar;
