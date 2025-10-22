// 📦 Εισαγωγές React Hooks και άλλων modules
import React, { useState, useEffect, useReducer, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { quizReducer, initialState } from "../reducers/quizReducer";

// 🧩 Κύριο component του quiz
export default function Quiz() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [timeLeft, setTimeLeft] = useState(20);
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const nextButtonRef = useRef(null);

  // 🎯 Φόρτωση quiz
  useEffect(() => {
    fetch("/questions.json")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const foundQuiz = data.quizzes.find((q) => q.id === parseInt(id));
        setQuiz(foundQuiz);
      })
      .catch((err) => console.error("Σφάλμα φόρτωσης quiz:", err));
  }, [id]);

  // ⏱️ Χρονόμετρο
  useEffect(() => {
    if (timeLeft === 0) {
      handleNext();
      return;
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  // 🔁 Focus στο "Επόμενη"
  useEffect(() => {
    nextButtonRef.current?.focus();
  }, [state.currentIndex]);

  // 🧠 Επιλογή απάντησης
  const handleAnswer = useCallback(
    (choice) => {
      dispatch({ type: "SELECT", payload: choice });
    },
    [dispatch]
  );

  // 👉 Επόμενη ερώτηση
  const handleNext = useCallback(() => {
    const currentQuestion = quiz.questions[state.currentIndex];
    const correctChoice = currentQuestion.choices.find((c) => c.correctAnswer);
    const isCorrect = state.selected === correctChoice.choice;

    dispatch({
      type: "ADD_ANSWER",
      payload: {
        question: currentQuestion.question,
        selected: state.selected,
        correct: correctChoice.choice,
      },
    });

    if (isCorrect) dispatch({ type: "INCREMENT_SCORE" });

    if (state.currentIndex < quiz.questions.length - 1) {
      dispatch({ type: "NEXT" });
      setTimeLeft(20);
    } else {
      dispatch({ type: "SHOW_MODAL" });
    }
  }, [quiz, state]);

  // 🧭 Μετάβαση στα αποτελέσματα
  const handleGoToResults = () => {
    navigate("/results", {
      state: { score: state.score, answers: state.answers, total: quiz.questions.length },
    });
  };

  if (!quiz) return <p>Φόρτωση...</p>;

  const currentQuestion = quiz.questions[state.currentIndex];

  return (
    <main className="quiz" role="main" aria-labelledby="quiz-title">
      <h2 id="quiz-title">{quiz.title}</h2>

      <section
        className="question-card"
        aria-label={`Ερώτηση ${state.currentIndex + 1} από ${quiz.questions.length}`}
      >
        <p>
          Ερώτηση {state.currentIndex + 1} από {quiz.questions.length}
        </p>
        <h3>{currentQuestion.question}</h3>

        {/* Επιλογές απαντήσεων */}
        <div role="group" aria-label="Επιλογές απαντήσεων">
          {currentQuestion.choices.map((c, i) => (
            <button
              key={i}
              className={`choice ${state.selected === c.choice ? "selected" : ""}`}
              onClick={() => handleAnswer(c.choice)}
              aria-pressed={state.selected === c.choice}
            >
              {c.choice}
            </button>
          ))}
        </div>

        {/* Χρονομετρητής με aria-live */}
        <div className="timer" aria-live="polite">
          ⏱️ Απομένουν {timeLeft} δευτερόλεπτα
        </div>

        {/* Κουμπί “Επόμενη” */}
        <button
          ref={nextButtonRef}
          onClick={handleNext}
          disabled={!state.selected && timeLeft > 0}
          aria-label="Επόμενη ερώτηση"
        >
          Επόμενη
        </button>
      </section>

      {/* ✅ Προσβάσιμο Modal */}
      <Modal
        show={state.showModal}
        onClose={handleGoToResults}
        role="dialog"
        aria-modal="true"
        aria-labelledby="quiz-result-title"
      >
        <h2 id="quiz-result-title">🎉 Μπράβο!</h2>
        <p>
          Το σκορ σου: {state.score} / {quiz.questions.length}
        </p>
        <button onClick={handleGoToResults}>Προβολή Αποτελεσμάτων</button>
      </Modal>
    </main>
  );
}
