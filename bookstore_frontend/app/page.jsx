"use client";
import BookCard from "@/components/cards/BookCard";
import { updateBooks } from "@/lib/books/bookSlice";
import { baseUrl } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const page = () => {
  const books = useSelector((state) => state.books);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [error, setError ] = useState('')

  useEffect(() => {
    const fetchBooks = async () => {
      if(books.length + 1 % ( page * 10) === 0){
        return
      }
      try {
        const response = await fetch(
          `${baseUrl}/books/?page=${page}`
        )
        if (!response.ok) {
          throw new Error(response.error);
        } else {
          const data = await response.json()
          dispatch(updateBooks(data.results))
        }
      } catch (error) {
        setError(error.detail);
      }
    };
    fetchBooks();
  }, [page]);



  return (
    <div className="flex-1 cards-container grid grid-cols-2 max-sm:grid-cols-1 place-content-start gap-8 w-screen p-8 max-sm:p-4 overflow-scroll">
      {books &&
        books.map((book, index) => {
          return <BookCard key={index} book={book} />;
        })}
    </div>
  );
};

export default page;
