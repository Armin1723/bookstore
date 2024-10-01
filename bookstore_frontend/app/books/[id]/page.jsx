"use client";
import { baseUrl } from "@/lib/utils";
import { getRandomBackground } from "@/lib/utils/services";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaBook } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import { useSelector } from "react-redux";

const page = () => {
  const params = useParams();
  const books = useSelector((state) => state.books);
  const theme = useSelector((state) => state.theme.value);
  const [book, setBook] = useState({});
  const [id, setId] = useState(params.id);
  console.log(books)

  useEffect(() => {  
    const fetchBook = async () => {

      const foundBook = books.find((book) => book.id == params.id);
      
      if (foundBook) {
        setBook(foundBook);
        return;
      }

      try {
        const response = await fetch(`${baseUrl}/books/${params.id}/`);
        
        if (!response.ok) {
          throw new Error("Error fetching the book from the API");
        }
  
        const data = await response.json();
        setBook(data);
        
      } catch (error) {
        console.log(error.message);
      }
    };
  
    fetchBook();
  }, [id]);

  const background = getRandomBackground(book.title + book.author);

  return (
    <div
      className="flex-1 flex items-center justify-center relative overflow-hidden "
    >
      <div
        className={`blob ${theme === 'dark' ? 'opacity-45' : 'opacity-100'}`}
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

      <div
        className="rounded-lg flex flex-col justify-between md:max-w-[50vw] max-w-[80vw] p-6 min-h-[70vh] aspect-[3/4] text-black z-[2]"
        style={{
          background: background.gradient,
          boxShadow: `0 0 25px ${background.shadow}`,
        }}
      >
        <div className="actions flex gap-2 justify-start">
          <Link
            href={`/books/edit/${book.id}`}
            className="button-effect before:bg-gradient-to-br from-blue-500/80 to-blue-800/50 hover:z-[2] before:z-[-1] flex items-center justify-center gap-1"
          >
            <p>Edit</p>
            <span>
              <MdEdit />
            </span>
          </Link>
          <Link
            href={`/books/delete/${book.id}`}
            className="button-effect before:bg-gradient-to-br from-red-500/80 to-red-800/50 hover:z-[2] before:z-[-1] flex items-center justify-center gap-1"
          >
            <p>Delete</p>
            <span>
              <MdDelete />
            </span>
          </Link>
        </div>
        <div className="details">
          <FaBook className="text-6xl my-4" />
          <p className="text-4xl font-bold">{book.title}</p>
          <p>Author: {book.author}</p>
          <p>Year of Publication: {book.published_year}</p>
          <p>Genre: {book.genre}</p>
        </div>
      </div>
    </div>
  );
};

export default page;
