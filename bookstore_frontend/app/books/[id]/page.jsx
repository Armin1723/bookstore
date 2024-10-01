"use client";
import DeleteModal from "@/components/shared/DeleteModal";
import { baseUrl } from "@/lib/utils";
import { getRandomBackground } from "@/lib/utils/services";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaBook } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const page = () => {
  const params = useParams();
  const books = useSelector((state) => state.results.books);
  const theme = useSelector((state) => state.theme.value);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [book, setBook] = useState({});
  const [id, setId] = useState(params.id);

  const router = useRouter();

  useEffect(() => {
    const bookToast = toast.loading("Fetching book...");
    const fetchBook = async () => {
      const foundBook = books.find((book) => book.id == params.id);

      if (foundBook) {
        setBook(foundBook);
        toast.dismiss(bookToast);
        return;
      }

      try {
        const response = await fetch(`${baseUrl}/books/${params.id}/`);

        if (!response.ok) {
          throw new Error("Error fetching the book from the API");
        }

        const data = await response.json();
        setBook(data);
        toast.update(bookToast,{
          render: "Book fetched successfully",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        })
      } catch (error) {
        console.log(error.message);
        toast.update(bookToast, {
          render: "Error fetching book",
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });
        router.push("/");
      }
    };

    fetchBook();
    
  }, [id]);

  const handleDelete = async () => {
    const deleteToast = toast.loading("Deleting book...");
    try {
      const response = await fetch(`${baseUrl}/books/delete/${book.id}/`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Error deleting the book from the API");
      } else 
      {
        toast.update(deleteToast, {
          render: "Book deleted successfully",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
        router.push("/");
      }
    } catch (error) {
      console.log(error.message);
      toast.update(deleteToast, {
        render: "Error deleting book",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }
    setIsModalOpen(false);
  };

  const background = getRandomBackground(book.title + book.author);

  return (
    <div className="flex-1 flex items-center justify-center relative overflow-hidden ">
      <div
        className={`blob ${theme === "dark" ? "opacity-45" : "opacity-100"}`}
        style={{
          background: background.blobGradient,
          position: "absolute",
          top: "10%",
          left: "-50%",
          width: "120%",
          height: "120%",
          borderRadius: "50%",
          filter: "blur(40px)",
          zIndex: 1,
          animation: "moveBlob 10s infinite ease-in-out",
        }}
      ></div>

      <motion.div
        initial={{ opacity: 0, y: "20px" }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-lg flex flex-col justify-between md:max-w-[30vw] max-w-[80vw] p-6 min-h-[70vh] aspect-[3/4] text-black z-[2]"
        style={{
          background: background.gradient,
          boxShadow: `0 0 25px ${background.shadow}`,
        }}
      >
        <motion.div
          initial={{ opacity: 0, x: "40px" }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2, staggerChildren: 0.3 }}
          className="actions flex gap-2 justify-start"
        >
          <Link
            href={`/books/edit/${book.id}`}
            className="button-effect before:bg-gradient-to-br from-blue-500/80 to-blue-800/50 hover:z-[2] before:z-[-1] flex items-center justify-center gap-1"
          >
            <p>Edit</p>
            <span>
              <MdEdit />
            </span>
          </Link>
          <button
            onClick={() => setIsModalOpen(true)}
            className="button-effect before:bg-gradient-to-br from-red-500/80 to-red-800/50 hover:z-[2] before:z-[-1] flex items-center justify-center gap-1"
          >
            <p>Delete</p>
            <span>
              <MdDelete />
            </span>
          </button>
          <DeleteModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onDelete={handleDelete}
          />
        </motion.div>
        <motion.div
          initial={{ y: "40px", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5, staggerChildren: 0.3 }}
          className="details"
        >
          <FaBook className="text-6xl my-4" />
          <p className="text-4xl font-bold">{book.title}</p>
          <p>Author: {book.author}</p>
          <p>Year of Publication: {book.published_year}</p>
          <p>Genre: {book.genre}</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default page;
