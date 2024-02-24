import React, { useState } from "react";
import {
  AiFillStar,
  AiOutlineStar,
  AiOutlineDelete,
  AiOutlineMessage,
} from "react-icons/ai"; // Importing icons
import Reply from "./Reply.jsx";
import "./Comment.css";

const Comment = ({
  comment,
  deleteComment,
  replyToComment,
  toggleStar,
  showReply,
}) => {
  const [replyInput, setReplyInput] = useState("");
  const [showReplyInput, setShowReplyInput] = useState(false);

  const handleDelete = () => {
    deleteComment(comment.id);
  };

  const handleToggleStar = () => {
    toggleStar(comment.id);
  };

  const handleReplyInputChange = (e) => {
    setReplyInput(e.target.value);
  };

  const handleReplySubmit = () => {
    if (replyInput.trim() !== "") {
      const reply = {
        id: Date.now(), // Unique identifier for the reply
        text: replyInput,
        timestamp: new Date().toLocaleString(),
        starred: false,
      };
      replyToComment(comment.id, reply);
      setReplyInput("");
      setShowReplyInput(false);
    }
  };

  const handleToggleReplyInput = () => {
    setShowReplyInput(!showReplyInput);
  };

  return (
    <div className="comment">
      <p className="comment-text">{comment.text}</p>
      <div className="comment-actions">
        <button
          className="comment-action"
          onClick={handleDelete}
          title="Delete Comment"
        >
          <AiOutlineDelete /> {/* Delete icon */}
        </button>
        <button
          className="comment-action"
          onClick={handleToggleStar}
          title={comment.starred ? "Unstar Comment" : "Star Comment"}
        >
          {comment.starred ? <AiFillStar /> : <AiOutlineStar />}{" "}
          {/* Star icon */}
        </button>
        {showReply && (
          <button
            className="comment-action"
            onClick={handleToggleReplyInput}
            title="Reply to Comment"
          >
            <AiOutlineMessage /> {/* Reply icon */}
          </button>
        )}
      </div>
      <p className="timestamp">Timestamp: {comment.timestamp}</p>
      {showReplyInput && (
        <div className="reply-input">
          <input
            type="text"
            value={replyInput}
            onChange={handleReplyInputChange}
            placeholder="Add a reply..."
          />
          <button className="submit-reply" onClick={handleReplySubmit}>
            Reply
          </button>
        </div>
      )}
      {comment.replies?.map((reply) => (
        <Reply key={reply.id} reply={reply} />
      ))}
    </div>
  );
};

export default Comment;
