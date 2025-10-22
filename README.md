# 🧠 Quiz App – React Practice Project

The **Quiz App** is an interactive single-page application built with **React** and **Vite**.  
It allows users to take quizzes, track their scores, and review their answers at the end.  
The project demonstrates practical use of several **React Hooks**, the **Context API**, and **Reducers**,  
showing how to build a modern and accessible user interface with full **Dark Mode** support.

---

## ⚙️ Main Features

- **Dynamic Quiz System**  
  Loads quiz data from a JSON file and renders multiple-choice questions dynamically.  
  Each question includes a 20-second countdown timer, interactive answer selection, and automatic navigation to the next question or results modal.

- **State Management with useReducer**  
  Handles all quiz logic (current question, score, selected answers, modal visibility) using a centralized reducer for clean and scalable code.

- **Dark / Light Mode (Context API)**  
  Built with React Context API and a custom `useTheme` hook.  
  Users can toggle between soft light and dark themes with smooth transitions.

- **Timer using useEffect**  
  Each question runs a 20-second timer managed via `useEffect` that resets and cleans up automatically.

- **Routing with React Router**  
  The app includes three main routes:  
  - `/` → Home page with available quizzes  
  - `/quiz/:id` → Quiz page  
  - `/results` → Results and detailed answer review

- **Reusable Components**  
  `Modal`, `DarkModeToggle`, and `Results` are reusable, modular UI components that keep the app structure clean.

- **Accessibility (A11y)**  
  Every interactive element supports keyboard navigation and focus outlines.  
  Both light and dark themes meet color contrast standards for readability.

---

## 🧩 React Hooks Used

- `useState` → Stores quiz data, timer, and local states  
- `useEffect` → Handles side effects such as fetching data and timers  
- `useReducer` → Manages the overall quiz logic and progress  
- `useContext` → Controls the theme (dark/light) via `ThemeContext`  
- `useRef` → Focuses buttons automatically for better UX  
- `useCallback` → Optimizes handlers like `handleNext` and `handleAnswer`

---

## 🎨 UI and Styling

- Custom **CSS3** with soft shadows and rounded corners  
- Smooth transitions between light and dark themes  
- **Soft Dark Mode** (not pure black) for a more elegant and comfortable appearance  
- Fully responsive layout with clean typography and accessible color palette

---

## 📁 Folder Structure


## 🧠 Summary

This project combines core **React concepts** — Hooks, Reducer, Context, and Effects —  
into a functional and visually polished quiz application.  
It’s a great example of how to structure small-to-medium React projects  
while keeping the code modular, accessible, and easy to maintain.

---

> 💬 “A quiz app is the best way to learn React hooks — one question at a time.”
