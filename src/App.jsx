import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Quiz from "./components/Quiz";
import Results from "./components/Results";
import DarkModeToggle from "./components/DarkModeToggle";
import "./styles.css";

export default function App() {
  return (
    <div className="app">
      <Router>
        {/* 🧭 Header landmark */}
        <header className="header" role="banner">
          <h1>Quiz App</h1>
          <DarkModeToggle />
        </header>

        {/* 🧭 Κύριο περιεχόμενο */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz/:id" element={<Quiz />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </Router>
    </div>
  );
}
