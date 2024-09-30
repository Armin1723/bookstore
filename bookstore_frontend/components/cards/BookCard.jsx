"use client";
import { motion } from "framer-motion";
import React from "react";
import { useSelector } from "react-redux";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { MdDelete, MdEdit } from "react-icons/md";
import { FaBook } from "react-icons/fa"

const BookCard = ({ book }) => {
  const theme = useSelector((state) => state.theme.value);
  const [ref, inView] = useInView();

  return (
    <motion.div ref={ref} className="flex items-center justify-center">
      <div
        style={{
          transform: inView ? "none" : "translateY(30px)",
          scale: inView ? 1 : 0.5,
          opacity: inView ? 1 : 0,
          transition: "all 0.6s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
        }}
        className="flex max-sm:flex-col flex-row items-center max-sm:items-start gap-4 shadow-[0_0_25px_gray] shadow-gray-500/40 backdrop-blur-md rounded-xl p-4 min-h-fit w-full hover-effect"
      >

        <div className="logo flex min-h-full items-center max-sm:items-start justify-center w-1/4">
          <FaBook className="h-full drop-shadow-md text-6xl"/>
        </div>

        <div className="details flex flex-col w-3/4">
          <p className="text-2xl font-bold">{book.title}</p>
          <p className="font-extralight !important">Year of Release : {book.published_year}</p>
          <p>Author : {book.author}</p>
          <p>
            Genre : <span>{book.genre}</span>
          </p>
          <div className="flex gap-4 pt-4">
            <Link
              href={`/edit/${book.id}`}
              className="button-effect before:bg-gradient-to-br from-blue-500/80 to-blue-800/50 flex items-center justify-center gap-4"
            >
              <p>Edit</p>
              <span>
                <MdEdit />
              </span>
            </Link>
            <Link
              href={`/delete/${book.id}`}
              className="button-effect before:bg-gradient-to-br from-red-700/80 to-red-800/50 flex items-center justify-center gap-4"
            >
              <p>Delete</p>
              <span>
                <MdDelete />
              </span>
            </Link>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default BookCard;
