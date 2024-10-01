"use client";
import { useSelector } from "react-redux";

const DeleteModal = ({ isOpen, onClose, onDelete }) => {
  if (!isOpen) return null;
  const theme = useSelector((state) => state.theme.value);

  return (
    <div
      className={`fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 transition-all duration-300 ease-in-out ${
        isOpen ? "opacity-100 scale-1" : "opacity-0 scale-0"
      } 
      `}
    >
      <div
        className={`rounded-lg shadow-[0_0_25px_#1f1f1f] p-6 m-4 w-full max-w-md ${
          theme === "dark" ? "bg-zinc-800/90 text-white" : 'bg-gradient-to-r from-gray-300 to-gray-600'
        }`}
      >
        <h2 className="text-xl font-bold ">Confirm Delete</h2>
        <p className=" mt-2">
          Are you sure you want to delete this item? This action cannot be
          undone.
        </p>
        <div className="mt-2 flex justify-start gap-4">
          <button
            className="button-effect px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded text-gray-700"
            onClick={() => onClose()}
          >
            Cancel
          </button>
          <button
            className="button-effect text-black before:z-[-1] hover:z-[2] hover:text-black before:bg-gradient-to-br from-red-800/50 to-red-500/80"
            onClick={() => onDelete()}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
