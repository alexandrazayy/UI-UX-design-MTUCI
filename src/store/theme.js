"use client";

import { useEffect, useState } from "react";
import { createContext } from "react";

export const Theme = createContext();

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState("");

  const toggleTheme = () => {
    setCurrentTheme((prev) => (prev == "black" ? "white" : "black"));
    window.localStorage.setItem(
      "theme",
      currentTheme == "black" ? "white" : "black"
    );
  };

  useEffect(() => {
    const theme = localStorage.getItem("theme")
      ? localStorage.getItem("theme")
      : "black";
    setCurrentTheme(theme);
  }, []);

  return (
    <Theme.Provider value={{ currentTheme, toggleTheme }}>
      {children}
    </Theme.Provider>
  );
};
