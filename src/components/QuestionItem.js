import React from "react";

function QuestionItem({ question, onDeleteQuestion, onUpdateCorrectIndex }) {
  const { id, prompt, answers, correctIndex } = question;

  function handleDelete() {
    onDeleteQuestion(id);
  }

  function handleChange(event) {
    // Pass string value to parent, convert to number there if needed
    onUpdateCorrectIndex(id, event.target.value);
  }

  const options = answers.map((answer, index) => (
    <option key={index} value={index.toString()}>
      {answer}
    </option>
  ));

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select value={correctIndex.toString()} onChange={handleChange}>
          {options}
        </select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
