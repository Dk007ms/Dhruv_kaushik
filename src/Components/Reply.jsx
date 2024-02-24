// Reply.jsx
import React from "react";

const Reply = ({ reply }) => {
  return (
    <div className="reply">
      <p>{reply.text}</p>
      <p className="timestamp">Timestamp: {reply.timestamp}</p>
    </div>
  );
};

export default Reply;
