"use client";
import BookCard from "@/components/cards/BookCard";
import Pagination from "@/components/shared/Pagination";
import { updateResults } from "@/lib/results/resultsSlice";
import { baseUrl } from "@/lib/utils";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const page = () => {
  const books = useSelector((state) => state.results.books);
  const totalPages = useSelector((state) => state.results.totalPages);
  const dispatch = useDispatch();
  const params = useSearchParams();
  const router = useRouter();
  const [error, setError] = useState("");
  const [page, setPage] = useState(params.get("page") || 1);


  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(`${baseUrl}/books/?page=${page}`);
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.detail);
        } else {
          const data = await response.json();
          dispatch(updateResults({
            books: data.results,
            totalPages: Math.ceil(data.count / 10)
          }));
          setError('')
        }
      } catch (error) {
        setError(error.message);
      }
    };
    fetchBooks();
  }, [page]);

  if (books.length === 0 && !error && totalPages !== 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-2xl">
        Loading...
      </div>
    );
  } else if (totalPages == 0) {
    return (
      <div className="flex-1 flex flex-col gap-4 items-center justify-center text-2xl">
        Its Quite Lonely in here...
        <Link href="add/" className="button-effect">Add book </Link>
      </div>
    );
  } else if (error) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-2xl gap-4">
        {error}
        <button
          onClick={() => {
            router.push("/");
            setPage(1); 
          }}
          className="button-effect"
        >
          Go Back?
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1">
      <div className="flex-1 cards-container grid grid-cols-2 max-sm:grid-cols-1 place-content-start gap-8 w-screen p-8 mb-12 max-sm:p-4 overflow-scroll">
        {books &&
          books.map((book, index) => {
            return <BookCard key={index} book={book} />;
          })}
      </div>
      <Pagination path='/' page={page} totalPages={totalPages} setPage={setPage}/>
    </div>
  );
};

export default page;
