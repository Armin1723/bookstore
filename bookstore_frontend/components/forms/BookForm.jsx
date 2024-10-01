"use client";
import { baseUrl } from "@/lib/utils";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const BookForm = ({ purpose, book = {} }) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: book?.title || "",
      author: book?.author || "",
      genre: book?.genre || "",
      published_year: book?.published_year || "",
    },
  });

  const router = useRouter();

  useEffect(() => {
    if (purpose === "update") {
      reset({
        title: book?.title || "",
        author: book?.author || "",
        genre: book?.genre || "",
        published_year: book?.published_year || "",
      });
    }
  }, [book]);

  const [globalError, setGlobalError] = React.useState(null);

  const onSubmit = async (data) => {
    const bookToast = toast.loading("Adding book...");

    try {
      const endpoint = purpose === "create" ? "create/" : `update/${book.id}/`;
      const response = await fetch(`${baseUrl}/books/${endpoint}`, {
        method: purpose === "create" ? "POST" : "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        toast.update(bookToast, {
          render: `Book ${purpose === 'update' ? 'updated' : 'created'} successfully`,
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
        reset();
        router.push("/");
      } else {
        const data = await response.json();
        throw new Error(data.error);
      }
    } catch (error) {
      setGlobalError(error.message);
      toast.update(bookToast, {
        render: error.message,
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
      }
  };

  return (
    <motion.form initial={{ y: '30px', opacity : 0}} animate={{y: 0, opacity: 1}} transition={{delay : 0.4, duration: 0.6, staggerChildren : 0.4}} onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-4">
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
    </motion.form>
  );
};

export default BookForm;
