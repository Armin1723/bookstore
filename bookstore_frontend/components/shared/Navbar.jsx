import Link from "next/link";
import React from "react";
import ThemeToggle from "../ThemeToggle";

const Navbar = ({ children }) => {
  return (
    <nav className="z-[2] flex w-screen p-3 md:pt-8 md:pr-12 md:sticky md:top-0 justify-end items-center gap-8 max-sm:flex-row-reverse bg-transparent backdrop-blur-lg">
      <div className="flex gap-4">
        <Link href="/add" className="button-effect group">
          <span className="">Add</span>{" "}
          <span className="">+</span>
        </Link>
        <ThemeToggle />
      </div>
      <Link href="/" className="text-2xl font-bold font-['Helvetica'] ">
        {children}
      </Link>
    </nav>
  );
};

export default Navbar;
