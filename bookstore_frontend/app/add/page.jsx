'use client';
import BookForm from "@/components/forms/BookForm";
import React from "react";
import { useSelector } from "react-redux";

const page = () => {
  const theme = useSelector((state) => state.theme.value);
  return (
    <div className="flex flex-col items-center justify-center flex-1 p-4">
      <div className={`form-container rounded-lg ${theme === 'light' ? 'shadow-[0_0_50px_#1c1c1c88]' : 'shadow-[0_0_50px_#ffffff66]'} p-4`}>
        <h3 className="text-3xl font-bold">Add a book</h3>
        <p>
          Please fill in the details of the book you want to add to the
          bookstore.
        </p>
        <BookForm purpose="create" />
      </div>
    </div>
  );
};

export default page;
