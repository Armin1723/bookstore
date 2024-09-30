import BookForm from "@/components/forms/BookForm";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col items-center justify-center flex-1 p-4">
      <div className="form-container rounded-lg shadow-[0_0_50px_#1c1c1c44] p-4">
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
