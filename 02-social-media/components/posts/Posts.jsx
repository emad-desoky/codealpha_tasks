import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import MotionPost from "./MotionPost";

const postsData = [
  {
    id: 1,
    image: "https://via.placeholder.com/150",
    postImage: "https://via.placeholder.com/600x300",
    username: "User One",
    date: "August 1, 2024",
    content: {
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image: "https://via.placeholder.com/100x100",
    },
    likes: 123,
    comments: [
      {
        id: 1,
        username: "User A",
        text: "Great post!",
        avatar: "https://via.placeholder.com/40",
        date: "August 2, 2024",
      },
      {
        id: 2,
        username: "User B",
        text: "Thanks for sharing!",
        avatar: "https://via.placeholder.com/40",
        date: "August 3, 2024",
      },
    ],
  },
  {
    id: 2,
    image: "https://via.placeholder.com/150",
    postImage: "https://via.placeholder.com/600x300",
    username: "User Two",
    date: "July 25, 2024",
    content: {
      text: "Very informative. I learned a lot from this post. The details were well presented and easy to understand.",
      image: "https://via.placeholder.com/100x100",
    },
    likes: 45,
    comments: [
      {
        id: 3,
        username: "User C",
        text: "Very informative.",
        avatar: "https://via.placeholder.com/40",
        date: "July 26, 2024",
      },
      {
        id: 4,
        username: "User D",
        text: "I learned a lot!",
        avatar: "https://via.placeholder.com/40",
        date: "July 27, 2024",
      },
    ],
  },
  // Add more posts as needed
];

const Posts = () => {
  const [newComment, setNewComment] = useState("");

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleCommentSubmit = (postId) => {
    console.log("Submit comment for post:", postId);
    // Handle comment submission logic here
    setNewComment("");
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(to right, #e0f7fa, #b2ebf2)",
        padding: "20px",
        minHeight: "100vh",
      }}
    >
      <Typography
        variant="h4"
        sx={{ mb: 4, textAlign: "center", color: "#333" }}
      >
        Posts
      </Typography>
      <Box display="flex" flexDirection="column" alignItems="center">
        {postsData.map((post) => (
          <MotionPost
            key={post.id}
            post={post}
            newComment={newComment}
            handleCommentChange={handleCommentChange}
            handleCommentSubmit={handleCommentSubmit}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Posts;
