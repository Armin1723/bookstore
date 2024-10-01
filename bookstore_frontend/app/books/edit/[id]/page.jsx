"use client";
import BookForm from "@/components/forms/BookForm";
import { baseUrl } from "@/lib/utils";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const page = () => {
  const books = useSelector((state) => state.results.books) || [];
  const theme = useSelector((state) => state.theme.value) || 'light';
  const { id } = useParams();
  const [book, setBook] = useState({});

  useEffect(() => {
    const fetchBook = async () => {
      const foundBook = books.find((book) => book.id == id);

      if (foundBook) {
        setBook(foundBook);
        return;
      }

      try {
        const response = await fetch(`${baseUrl}/books/${id}/`);

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

  return (
    <div className="flex flex-col items-center justify-center flex-1 p-4">
      <div className={`form-container rounded-lg ${theme === 'light' ? 'shadow-[0_0_50px_#1c1c1c88]' : 'shadow-[0_0_50px_#ffffff66]'} p-4`}>
        <h3 className="text-3xl font-bold">Update book details.</h3>
        <p>
          Please fill in the details of the book you want to update on the
          bookstore.
        </p>
        <BookForm purpose="update" book={book} />
      </div>
    </div>
  );
};

export default page;
