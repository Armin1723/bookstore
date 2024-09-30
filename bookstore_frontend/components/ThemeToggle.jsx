import { toggleTheme } from "@/lib/theme/themeSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const ThemeToggle = () => {
    const theme = useSelector((state) => state.theme.value)
    const dispatch = useDispatch()
  return (
    <div className="flex items-center justify-center">
      <label className="switch drop-shadow-md shadow-gray-800" >
        <input type="checkbox" checked={theme === 'dark'} id="theme-toggle-checkbox" onChange={()=>dispatch(toggleTheme())}/>
        <span className={`slider ${theme === 'dark' ? 'before:bg-black' : 'before:bg-white'} round backdrop-blur-lg`}> </span>
      </label>
    </div>
  );
};

export default ThemeToggle;