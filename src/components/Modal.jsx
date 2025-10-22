import React, { useEffect, useRef } from "react";

export default function Modal({ show, onClose, children }) {
  const modalRef = useRef(null);

  // ♻️ useEffect πρέπει να είναι πάντα ενεργό
  useEffect(() => {
    if (!show) return;

    // focus στο modal όταν ανοίγει
    modalRef.current?.focus();

    const handleKey = (e) => {
      if (e.key === "Escape") onClose(); // κλείσιμο με ESC
    };

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [show, onClose]);

  // ❗ το conditional render έρχεται ΜΕΤΑ τα hooks
  if (!show) return null;

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="modal-content"
        ref={modalRef}
        tabIndex="-1"
        onClick={(e) => e.stopPropagation()} // σταματάει το κλείσιμο όταν πατάς μέσα
      >
        {children}

        <button className="close-btn" onClick={onClose}>
          Κλείσιμο
        </button>
      </div>
    </div>
  );
}
