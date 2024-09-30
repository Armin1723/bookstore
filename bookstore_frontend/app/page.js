import BookCard from "@/components/cards/BookCard";
import React from "react";

const page = () => {
  return (
    <div className="flex-1 cards-container grid grid-cols-2 max-sm:grid-cols-1 place-content-center gap-8 w-screen p-8 max-sm:p-4">
      {[
        {
          title: "The great Gatsby",
          author: "Scott Fitzgerald",
          genre: "Fiction",
          published_year: 1986,
        },
        {
          title: "The great Gatsby",
          author: "Scott Fitzgerald",
          genre: "Fiction",
          published_year: 1986,
        },
        {
          title: "The great Gatsby",
          author: "Scott Fitzgerald",
          genre: "Fiction",
          published_year: 1986,
        },
        {
          title: "The great Gatsby",
          author: "Scott Fitzgerald",
          genre: "Fiction",
          published_year: 1986,
        },
      ].map((book, index) => {
        return <BookCard key={index} book={book} />;
      })}
    </div>
  );
};

export default page;
