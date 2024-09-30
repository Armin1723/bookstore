"use client";
import { baseUrl } from "@/lib/utils";
import React from "react";
import { useForm } from "react-hook-form";

const BookForm = ({ purpose }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const [globalError, setGlobalError] = React.useState(null);

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`${baseUrl}/books/create/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        alert("Book added successfully");
      } else {
        const data = await response.json();
        throw new Error(data.error);
      }
    } catch (error) {
      setGlobalError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-4">
      <div className="title flex flex-col gap-2">
        <input
          type="text"
          className={`outline-none bg-transparent active:bg-transparent border-b-2 border-gray-500 p-2 pl-0 ${
            errors.title &&
            "border-red-700 text-red-700 placeholder:text-red-700"
          }`}
          placeholder="Enter the title of the book."
          {...register("title", { required: true })}
          aria-invalid={errors.title}
        />
        {errors.title && (
          <p role="alert" className="text-sm text-red-700 italic">
            Title is mandatory
          </p>
        )}
      </div>

      <div className="author flex flex-col gap-2">
        <input
          type="text"
          className={`outline-none bg-transparent active:bg-transparent border-b-2 border-gray-500 p-2 pl-0 ${
            errors.title &&
            "border-red-700 text-red-700 placeholder:text-red-700"
          }`}
          placeholder="Enter the name of Author."
          {...register("author", { required: true })}
          aria-invalid={errors.author}
        />
        {errors.author && (
          <p role="alert" className="text-sm text-red-700 italic">
            Author name is mandatory
          </p>
        )}
      </div>

      <div className="genre flex flex-col gap-2">
        <input
          type="text"
          className={`outline-none bg-transparent active:bg-transparent border-b-2 border-gray-500 p-2 pl-0 ${
            errors.genre &&
            "border-red-700 text-red-700 placeholder:text-red-700"
          }`}
          placeholder="Select suitable Genre."
          {...register("genre", { required: true })}
          aria-invalid={errors.genre}
        />
        {errors.genre && (
          <p role="alert" className="text-sm text-red-700 italic">
            Author name is mandatory
          </p>
        )}
      </div>

      <div className="year flex flex-col gap-2">
        <input
          type="number"
          className={`outline-none bg-transparent active:bg-transparent border-b-2 border-gray-500 p-2 pl-0 ${
            errors.published_year &&
            "border-red-700 text-red-700 placeholder:text-red-700"
          }`}
          placeholder="Year of Publication."
          {...register("published_year", {
            required: true,
            min: 1600,
            max: new Date().getFullYear(),
          })}
          aria-invalid={errors.published_year}
        />
        {errors.published_year && (
          <p role="alert" className="text-sm text-red-700 italic">
            Invalid Year
          </p>
        )}
      </div>

      {globalError && (
        <p className="text-sm text-red-700 italic">{globalError}</p>
      )}

      <button
        type="submit"
        className=" button-effect bg-gray-300/30 my-1 capitalize"
      >
        {purpose === "create" ? "Add new book" : "Update book"}
      </button>
    </form>
  );
};

export default BookForm;
