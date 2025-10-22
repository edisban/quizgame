import React, { createContext, useState, useContext, useEffect } from "react";

// Δημιουργούμε το Context
const ThemeContext = createContext();

// Παροχέας (Provider)
export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    // Αν ο χρήστης έχει system dark mode, το ενεργοποιούμε εξ αρχής
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return true;
    }
    return false;
  });

  const toggleTheme = () => setDarkMode((prev) => !prev);

  // Κάθε φορά που αλλάζει το darkMode → ενημερώνουμε το body
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
      document.body.setAttribute("aria-live", "polite"); // 👈 screen reader update
    } else {
      document.body.classList.remove("dark");
      document.body.removeAttribute("aria-live");
    }
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {/* Προαιρετικά: role για screen readers */}
      <div role="region" aria-label="Theme provider area">
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

// Custom hook για εύκολη χρήση του theme
export const useTheme = () => useContext(ThemeContext);
