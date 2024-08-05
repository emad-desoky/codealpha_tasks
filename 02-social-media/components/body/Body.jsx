// components/Body.jsx
import React, { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";
import CircularProgress from "@mui/material/CircularProgress";
import Avatar from "@mui/material/Avatar";

const defaultProfilePic =
  "https://wallpapers.com/images/hd/shadow-boy-white-eyes-unique-cool-pfp-nft-13yuypusuweug9xn.jpg";

const posts = [
  {
    id: 1,
    title: "Post Title 1",
    content: "This is the content of the first post.",
    author: {
      username: "Author1",
      profilePic: defaultProfilePic,
    },
    comments: [
      { username: "Commenter1", text: "Great post!" },
      { username: "Commenter2", text: "Very informative." },
      { username: "Commenter3", text: "Thanks for sharing!" },
    ],
  },
  {
    id: 2,
    title: "Post Title 2",
    content: "This is the content of the second post.",
    author: {
      username: "Author2",
      profilePic: defaultProfilePic,
    },
    comments: [
      { username: "Commenter4", text: "Interesting read." },
      { username: "Commenter5", text: "I learned a lot." },
      { username: "Commenter6", text: "Awesome post!" },
    ],
  },
  // Add more posts as needed
];

const Post = ({ title, content, comments, author }) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 400], [0, -50]);

  const postAnimation = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={postAnimation}
      className="bg-white rounded-lg shadow-lg mb-4 p-4 transition-transform transform hover:scale-105"
      style={{ y }}
    >
      <div className="flex items-center mb-4">
        <Avatar src={author.profilePic} alt={author.username} />
        <Typography variant="h6" gutterBottom className="ml-2">
          {author.username}
        </Typography>
      </div>
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
            <Avatar src={defaultProfilePic} alt={comment.username} />
            <div className="ml-2">
              <Typography variant="body2" color="textSecondary">
                <strong>{comment.username}</strong>: {comment.text}
              </Typography>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const Body = () => {
  const [loading, setLoading] = useState(false);
  const [postsToShow, setPostsToShow] = useState(2);

  const loadMorePosts = () => {
    setLoading(true);
    setTimeout(() => {
      setPostsToShow((prev) => prev + 2);
      setLoading(false);
    }, 1000); // Simulating network delay
  };

  return (
    <div className="p-4 bg-gradient-to-r from-blue-100 to-blue-200 min-h-screen">
      <Typography variant="h4" gutterBottom>
        Recent Posts
      </Typography>
      <div>
        {posts.slice(0, postsToShow).map((post) => (
          <Post
            key={post.id}
            title={post.title}
            content={post.content}
            comments={post.comments}
            author={post.author}
          />
        ))}
      </div>
      <div className="flex justify-center mt-4">
        {loading ? (
          <CircularProgress />
        ) : (
          <Button variant="contained" color="primary" onClick={loadMorePosts}>
            Load More
          </Button>
        )}
      </div>
    </div>
  );
};

export default Body;
