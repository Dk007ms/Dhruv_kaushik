// CommentInput.jsx
import React, { useState } from "react";

const CommentInput = ({ addComment }) => {
  const [input, setInput] = useState("");

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = () => {
    if (input.trim() !== "") {
      const newComment = {
        id: Date.now(), // Unique identifier for the comment
        text: input,
        replies: [], // Initialize replies as an empty array
        timestamp: new Date().toLocaleString(),
        starred: false,
      };
      addComment(newComment);
      setInput("");
    }
  };

  return (
    <div className="comment-input">
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Add a comment..."
      />
      <button onClick={handleSubmit}>Post</button>
    </div>
  );
};

export default CommentInput;
