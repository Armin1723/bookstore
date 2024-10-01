'use client'
import React from "react";
import { useRouter } from "next/navigation";

const Pagination = ({ path = '/', totalPages = 10, page={page}, setPage= ()=>{} }) => {

  const router = useRouter()

  const handleNavigation = (direction) => {
    const newPage = direction === "prev" ? page - 1 : page + 1;
    setPage(newPage);
    router.push(`${path}?page=${newPage}`);
  }

  return (
    <div className="pagination fixed bottom-0 bg-inherit backdrop-blur-lg w-full items-center flex flex-row justify-center py-2 gap-4">
      <button
        className="button-effect rounded-lg px-2 py-1 border border-teal-600 auth-button disabled:hover:before:h-0 disabled:hover:shadow-none disabled:hover:text-current disabled:cursor-not-allowed disabled:opacity-50"
        onClick={() => handleNavigation('prev')}
        disabled={page == 1}
      >
        Prev
      </button>
      <p className="px-4 mx-1 border-r border-l border-slate-900">{page}</p>
      <button
        className="button-effect rounded-lg px-2 py-1 border border-teal-600 auth-button disabled:hover:before:h-0 disabled:hover:shadow-none disabled:hover:text-current disabled:cursor-not-allowed disabled:opacity-50"
        onClick={() => handleNavigation('next')}
        disabled={page === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;