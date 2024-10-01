import { createSlice } from "@reduxjs/toolkit";
import { loadTheme, saveTheme } from "../utils/services";

const defaultTheme =
  typeof window !== "undefined" ? loadTheme() || "light" : "light";

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    value: defaultTheme,
  },
  reducers: {
    toggleTheme: (state) => {
      state.value = state.value === "light" ? "dark" : "light";
      saveTheme(state.value)
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
