"use client";
import Navbar from "@/components/shared/Navbar";
import { toggleTheme } from "@/lib/theme/themeSlice";
import { loadTheme } from "@/lib/utils/services";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useHydrateTheme = () => {
  const [ hydrated, setHydrated ] = useState(false);
  const theme = useSelector((state) => state.theme.value);
  const dispatch = useDispatch();

  useEffect(() => {
    const savedTheme = loadTheme();
    if (savedTheme !== theme) {
      dispatch(toggleTheme());
    }
    setHydrated(true);
  }, [dispatch]);
  return hydrated;
};

const Wrapper = ({ children }) => {
  const hydrated = useHydrateTheme();
  const theme = useSelector((state) => state.theme.value);

  if (!hydrated) {
    // Optionally render a loader or empty div during hydration
    return <div style={{ visibility: 'hidden' }}>Loading...</div>;
  }

  return (
    <div
      className={` ${
        theme == "dark"
          ? "bg-zinc-900 text-white"
          : "bg-gradient-to-r from-transparent to-zinc-300/50"
      } min-h-screen flex flex-col`}
    >
      <Navbar>Book Store</Navbar>
      {children}
    </div>
  );
};

export default Wrapper;
