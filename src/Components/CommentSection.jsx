import React, { useState, useEffect } from "react";
import Comment from "./Comment.jsx";
import CommentInput from "./CommentInput.jsx";
import "./CommentSection.css";

const CommentSection = () => {
  const [comments, setComments] = useState([]);
  const [sortingFilter, setSortingFilter] = useState(null); // State to keep track of the current sorting filter

  

  const addComment = (newComment) => {
    setComments([newComment, ...comments]);
  };

  const deleteComment = (commentId) => {
    const deleteRecursive = (comment) => {
      if (comment.id === commentId) {
        return null;
      }
      if (comment.replies) {
        const updatedReplies = comment.replies
          .map((reply) => deleteRecursive(reply))
          .filter(Boolean);
        return {
          ...comment,
          replies: updatedReplies,
        };
      }
      return comment;
    };

    const updatedComments = comments
      .map((comment) => deleteRecursive(comment))
      .filter(Boolean);
    setComments(updatedComments);
  };

  const replyToComment = (parentCommentId, reply) => {
    const replyRecursive = (comment) => {
      if (comment.id === parentCommentId) {
        return {
          ...comment,
          replies: [...comment.replies, reply],
        };
      } else if (comment.replies) {
        const updatedReplies = comment.replies.map((reply) =>
          replyRecursive(reply)
        );
        return {
          ...comment,
          replies: updatedReplies,
        };
      } else {
        return comment;
      }
    };

    const updatedComments = comments.map((comment) => replyRecursive(comment));
    setComments(updatedComments);
  };

  const sortCommentsByLatest = () => {
    const sortedComments = [...comments].reverse();
    setComments(sortedComments);
    setSortingFilter("latest"); // Set sorting filter to indicate that "Sort by Latest" filter is applied
  };

  const sortCommentsByMostReplies = () => {
    const sortedComments = [...comments].sort(
      (a, b) => b.replies.length - a.replies.length
    );
    setComments(sortedComments);
    setSortingFilter("mostReplies"); // Set sorting filter to indicate that "Sort by Most Replies" filter is applied
  };

  const clearSortingFilter = () => {
    // Clear the sorting filter and shuffle comments
    setSortingFilter(null);
    shuffleComments();
  };

  const shuffleComments = () => {
    // Shuffle comments randomly
    const shuffledComments = [...comments].sort(() => Math.random() - 0.5);
    setComments(shuffledComments);
  };

  const toggleStar = (commentId) => {
    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          starred: !comment.starred,
        };
      }
      return comment;
    });
    setComments(updatedComments);
  };

  return (
    <div className="comment-section">
      <div className="sort-buttons">
        <button onClick={sortCommentsByLatest}>Sort by Latest</button>
        <button onClick={sortCommentsByMostReplies}>
          Sort by Most Replies
        </button>
        {sortingFilter && (
          <button onClick={clearSortingFilter}>Clear Sorting</button>
        )}
      </div>
      <CommentInput addComment={addComment} />
      {sortingFilter && (
        <div className="sorting-indicator">
          Sorting by {sortingFilter === "latest" ? "Latest" : "Most Replies"}
        </div>
      )}
      {comments.map((comment, index) => (
        <Comment
          key={comment.id}
          comment={comment}
          deleteComment={deleteComment}
          replyToComment={replyToComment}
          toggleStar={toggleStar}
          showReply={index < 3}
        />
      ))}
    </div>
  );
};

export default CommentSection;
