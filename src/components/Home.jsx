import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    fetch("/questions.json")
      .then((res) => res.json())
      .then((data) => setQuizzes(data.quizzes))
      .catch((err) => console.error("Σφάλμα φόρτωσης δεδομένων:", err));
  }, []);

  const quizList = useMemo(() => quizzes, [quizzes]);

  return (
    // 🧭 κύρια περιοχή περιεχομένου
    <main className="home" role="main" aria-labelledby="available-quizzes-title">
      <h2 id="available-quizzes-title">Διαθέσιμα Quiz</h2>

      <div className="quiz-list" role="list">
        {quizList.map((quiz) => (
          <Link
            to={`/quiz/${quiz.id}`}
            key={quiz.id}
            role="link" // 👉 δηλώνει ότι είναι σύνδεσμος
            aria-label={`Άνοιγμα του quiz: ${quiz.title}`}
            className="quiz-card"
          >
            <h3>{quiz.title}</h3>
            <p>{quiz.questions.length} ερωτήσεις</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
