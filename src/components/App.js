import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  // GET /questions
  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then(setQuestions);
  }, []);

  // POST /questions
  function handleAddQuestion(formData) {
    const newQuestion = {
      prompt: formData.prompt,
      answers: [
        formData.answer1,
        formData.answer2,
        formData.answer3,
        formData.answer4,
      ],
      correctIndex: parseInt(formData.correctIndex),
    };
    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newQuestion),
    })
      .then((r) => r.json())
      .then((addedQuestion) => setQuestions([...questions, addedQuestion]));
  }

  // DELETE /questions/:id
  function handleDeleteQuestion(id) {
    fetch(`http://localhost:4000/questions/${id}`, { method: "DELETE" }).then(
      () => setQuestions(questions.filter((q) => q.id !== id))
    );
  }

  // PATCH /questions/:id
  function handleUpdateCorrectIndex(id, correctIndex) {
    const correctIndexNumber = Number(correctIndex);

    // Optimistically update state
    setQuestions((questions) =>
      questions.map((q) =>
        q.id === id ? { ...q, correctIndex: correctIndexNumber } : q
      )
    );

    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correctIndex: correctIndexNumber }),
    });
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm onAddQuestion={handleAddQuestion} />
      ) : (
        <QuestionList
          questions={questions}
          onDeleteQuestion={handleDeleteQuestion}
          onUpdateCorrectIndex={handleUpdateCorrectIndex}
        />
      )}
    </main>
  );
}

export default App;
