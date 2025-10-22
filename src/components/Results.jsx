// 📦 Εισαγωγές React και React Router
import React from "react";
import { useLocation, Link } from "react-router-dom";

export default function Results() {
  // 🔹 Παίρνουμε τα δεδομένα που περάσαμε από το Quiz μέσω του useNavigate()
  const { state } = useLocation();
  const { score, total, answers } = state || {};

  // 🚨 Αν δεν υπάρχει state (π.χ. άνοιξε τη σελίδα απευθείας)
  if (!state) return <p>Δεν υπάρχουν αποτελέσματα.</p>;

  // 📊 Υπολογίζουμε το ποσοστό επιτυχίας
  const percentage = ((score / total) * 100).toFixed(0);

  return (
    // 🧭 Το κύριο περιεχόμενο της σελίδας (για screen readers)
    <main
      className="results-page"
      role="main"
      aria-labelledby="results-heading" // Συνδέεται με τον τίτλο h2
    >
      {/* 🔹 Κύριος τίτλος */}
      <h2 id="results-heading">Αποτελέσματα</h2>

      {/* 📦 Πλαίσιο σκορ με ARIA attributes */}
      <section
        className="score-box"
        aria-label="Περίληψη σκορ και ποσοστού επιτυχίας"
      >
        {/* Βαθμολογία */}
        <p>
          Σκορ:{" "}
          <strong aria-live="polite">
            {score}
          </strong>{" "}
          / {total}
        </p>

        {/* Ποσοστό */}
        <p className="percentage" aria-live="polite">
          {percentage}%
        </p>

        {/* 📊 Προοδευτική γραμμή (προσβάσιμη) */}
        <div
          className="progress-bar"
          role="progressbar" // Δηλώνει ότι αυτό είναι progress bar
          aria-valuenow={percentage} // Τρέχουσα τιμή
          aria-valuemin="0"
          aria-valuemax="100"
          aria-label={`Ποσοστό επιτυχίας ${percentage}%`}
        >
          <div
            className="progress"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </section>

      {/* 🔍 Ανασκόπηση απαντήσεων */}
      <section
        className="answers-list"
        aria-labelledby="review-heading"
        aria-live="off"
      >
        <h3 id="review-heading">Ανασκόπηση:</h3>

        {/* 🧩 Λίστα απαντήσεων */}
        {answers.map((a, i) => {
          const correct = a.selected === a.correct;

          return (
            <article
              key={i}
              className={`answer-card ${correct ? "correct" : "wrong"}`}
              aria-label={`Ερώτηση ${i + 1}: ${correct ? "Σωστή" : "Λάθος"} απάντηση`}
            >
              {/* Ερώτηση */}
              <p className="question-text">
                {i + 1}. {a.question}
              </p>

              {/* Επιλογή χρήστη */}
              <p>
                <strong>Δική σου απάντηση:</strong>{" "}
                <span aria-live="polite">{a.selected || "—"}</span>
              </p>

              {/* Σωστή απάντηση */}
              <p>
                <strong>Σωστή απάντηση:</strong>{" "}
                <span>{a.correct}</span>
              </p>
            </article>
          );
        })}
      </section>

      {/* 🔙 Ενέργειες / Πλοήγηση */}
      <nav
        className="results-actions"
        aria-label="Ενέργειες μετά τα αποτελέσματα"
      >
        <Link
          to="/"
          className="back-btn"
          aria-label="Επιστροφή στην αρχική σελίδα"
        >
          🏠 Επιστροφή στην Αρχική
        </Link>
      </nav>
    </main>
  );
}
