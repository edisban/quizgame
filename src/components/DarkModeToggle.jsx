import React from "react";
import { useTheme } from "../context/ThemeContext";

export default function DarkModeToggle() {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="theme-button"
      aria-pressed={darkMode} // 👈 δηλώνει αν είναι ενεργό
      aria-label={darkMode ? "Απενεργοποίηση σκοτεινής λειτουργίας" : "Ενεργοποίηση σκοτεινής λειτουργίας"}
      title={darkMode ? "Light Mode" : "Dark Mode"} // 👌 tooltip για οπτικούς χρήστες
    >
      {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
    </button>
  );
}
