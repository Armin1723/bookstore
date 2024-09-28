"use client";
import Navbar from "@/components/shared/Navbar";
import React from "react";
import { useSelector } from "react-redux";

const Wrapper = ({ children }) => {
  const theme = useSelector((state) => state.theme.value);
  return (
    <div
      className={` ${
        theme == "dark"
          ? "bg-zinc-900 text-white"
          : "bg-gradient-to-r from-transparent to-zinc-300/50"
      } `}
    >
      <Navbar>Book Store</Navbar>
      {children}
    </div>
  );
};

export default Wrapper;
