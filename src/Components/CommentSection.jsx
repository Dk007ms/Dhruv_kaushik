import React, { useState, useEffect } from "react";
import Comment from "./Comment.jsx";
import CommentInput from "./CommentInput.jsx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./CommentSection.css";
import "./toaststyles.css";

const CommentSection = () => {
  const [comments, setComments] = useState([]);
  const [sortingFilter, setSortingFilter] = useState(null);

  const notify = (message) => {
    const position = window.innerWidth <= 426 ? "top-right" : "top-center";
    toast(message, { 
        position:position,
         autoClose: 3000 ,
         className:"toastbody",
         bodyClassName:"toasbody",
         draggable:"true",
        });
  };

  const addComment = (newComment) => {
    setComments([newComment, ...comments]);
    notify("Comment added successfully!");
  };

  const deleteComment = (commentId) => {
    const updatedComments = comments.filter(
      (comment) => comment.id !== commentId
    );
    setComments(updatedComments);
    notify("Comment deleted successfully!");
  };

  const replyToComment = (parentCommentId, reply) => {
    const updatedComments = comments.map((comment) => {
      if (comment.id === parentCommentId) {
        return {
          ...comment,
          replies: [...comment.replies, reply],
        };
      }
      return comment;
    });
    setComments(updatedComments);
    notify("Reply added successfully!");
  };

  const sortCommentsByLatest = () => {
    const sortedComments = [...comments].reverse();
    setComments(sortedComments);
    setSortingFilter("latest");
    notify("Comments sorted by latest!");
  };

  const sortCommentsByMostReplies = () => {
    const sortedComments = [...comments].sort(
      (a, b) => b.replies.length - a.replies.length
    );
    setComments(sortedComments);
    setSortingFilter("mostReplies");
    notify("Comments sorted by most replies!");
  };

  const clearSortingFilter = () => {
    setSortingFilter(null);
    shuffleComments();
    notify("Sorting cleared!");
  };

  const shuffleComments = () => {
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
    notify("Comment starred/unstarred!");
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
