// Questions.js
import React, { useEffect, useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db, auth } from "./firebase";

export default function Questions({ user }) {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:4000/questions/${user.prefix}`)
      .then((res) => res.json())
      .then(setQuestions)
      .catch(() => setQuestions([]));
  }, [user.prefix]);

  const handleChange = (code, value) => {
    setAnswers((prev) => ({ ...prev, [code]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentUser = auth.currentUser;
    if (!currentUser) {
      alert("User not authenticated. Please log in again.");
      return;
    }

    try {
      await setDoc(doc(db, "responses", currentUser.uid), { answers }, { merge: true });
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting to Firestore:", error);
      alert("Failed to submit. Please try again.");
    }
  };

  if (submitted) {
    return <h3>Thank you for submitting your answers!</h3>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Questions for {user.prefix}</h2>
      {questions.map((q) => (
        <div key={q.code} style={{ marginBottom: 15 }}>
          <label>
            <strong>{q.code}:</strong> {q.text}
            <br />
            <input
              required
              type="text"
              value={answers[q.code] || ""}
              onChange={(e) => handleChange(q.code, e.target.value)}
              placeholder="Your answer"
              style={{ width: "100%" }}
            />
          </label>
        </div>
      ))}
      <button type="submit">Submit Answers</button>
    </form>
  );
}
