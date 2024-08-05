// components/Post.jsx
import React from "react";
import { motion } from "framer-motion";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";

const postAnimation = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Post = ({ title, content, comments }) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={postAnimation}
      className="bg-white rounded-lg shadow-lg mb-4 p-4 transition-transform transform hover:scale-105"
    >
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body1" paragraph>
        {content}
      </Typography>
      <div className="flex gap-4 mb-2">
        <IconButton
          color="primary"
          className="transition-transform transform hover:scale-110"
        >
          <ThumbUpIcon />
        </IconButton>
        <IconButton
          color="primary"
          className="transition-transform transform hover:scale-110"
        >
          <CommentIcon />
        </IconButton>
        <IconButton
          color="primary"
          className="transition-transform transform hover:scale-110"
        >
          <ShareIcon />
        </IconButton>
      </div>
      <div className="mt-2">
        {comments.map((comment, index) => (
          <div key={index} className="flex items-center mb-2">
            <Typography variant="body2" color="textSecondary">
              <strong>{comment.username}</strong>: {comment.text}
            </Typography>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Post;
