import React, { useState, useRef } from "react";
import {
  AiOutlineStar,
  AiFillStar,
  AiOutlineDelete,
  AiOutlineMessage,
  AiOutlineClose,
} from "react-icons/ai";
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
  const replyInputRef = useRef(null);

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
        id: Date.now(),
        text: replyInput,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        starred: false,
      };
      replyToComment(comment.id, reply);
      setReplyInput("");
      setShowReplyInput(false);
    }
  };

  const handleToggleReplyInput = () => {
    setShowReplyInput(!showReplyInput);
    if (!showReplyInput) {
      setTimeout(() => {
        replyInputRef.current.focus();
      }, 0);
    }
  };

  const handleCloseReplyInput = () => {
    if (replyInput.trim() === "") {
      setShowReplyInput(false);
    }
  };

  return (
    <div className="comment">
      <div className="comment-header">
        <div className="comment-actions">
          <button
            className="comment-action"
            onClick={handleToggleStar}
            title={comment.starred ? "Unstar Comment" : "Star Comment"}
          >
            {comment.starred ? <AiFillStar className="starred" /> : <AiOutlineStar />}
          </button>
          <button
            className="comment-action"
            onClick={handleDelete}
            title="Delete Comment"
          >
            <AiOutlineDelete />
          </button>
        </div>
        <div className="comment-info">
          <p className="timestamp">{comment.timestamp}</p>
        </div>
      </div>
      <p className="comment-text">{comment.text}</p>
      {showReply && (
        <div className="comment-actions">
          <button
            className="comment-action reply-button"
            onClick={handleToggleReplyInput}
            title="Reply to Comment"
          >
            <AiOutlineMessage />
            <span>Reply</span>
          </button>
        </div>
      )}
      {showReplyInput && (
        <div className="reply-input">
          <input
            type="text"
            value={replyInput}
            onChange={handleReplyInputChange}
            onBlur={handleCloseReplyInput}
            ref={replyInputRef}
            placeholder="Add a reply..."
          />
          <button className="close-reply" onClick={handleCloseReplyInput}>
            <AiOutlineClose />
          </button>
          <button className="submit-reply" onClick={handleReplySubmit}>
            Submit
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
