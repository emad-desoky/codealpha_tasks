import React, { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
  IconButton,
  TextField,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import { motion } from "framer-motion";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import styles from "./Posts.module.css";
import axios from "axios";

// Helper function to convert date to "x time ago"
const timeAgo = (date) => {
  const now = new Date();
  const diff = Math.floor((now - new Date(date)) / 1000); // difference in seconds
  if (diff < 60) return `${diff} seconds ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
  return `${Math.floor(diff / 86400)} days ago`;
};

const Posts = () => {
  const [postsData, setPostsData] = useState([]);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [comments, setComments] = useState([]);
  const [liked, setLiked] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const fetchPostsData = async () => {
      try {
        const response = await fetch("/api/posts"); // Adjust the endpoint if necessary
        const data = await response.json();
        setPostsData(data);
      } catch (error) {
        console.error("Failed to fetch posts data:", error);
      }
    };

    fetchPostsData();
  }, []);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users"); // Adjust the endpoint if necessary
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch posts data:", error);
      }
    };

    fetchUsers();
  }, []);
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch("/api/comments"); // Adjust the endpoint if necessary
        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error("Failed to fetch posts data:", error);
      }
    };

    fetchComments();
  }, []);

  const cardAnimation = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
  };

  const handleLike = async (postId) => {
    setUser((prevUser) => {
      // Ensure likedPosts is an array
      const currentLikedPosts = Array.isArray(prevUser.likedPosts)
        ? prevUser.likedPosts
        : [];

      const updatedUser = {
        ...prevUser,
        likedPosts: Array.from(new Set([...currentLikedPosts, postId])),
      };

      // Update localStorage
      localStorage.setItem("user", JSON.stringify(updatedUser));

      // Send the updated user data to the backend
      axios
        .put(`/api/users`, updatedUser)
        .then((response) => {
          console.log("User updated successfully", response.data);
        })
        .catch((error) => {
          console.error("Failed to update user", error);
        });

      return updatedUser;
    });

    // Optionally toggle the liked state for UI updates
    setLiked(!liked);
  };

  // Example useEffect to load the user data from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser({
        ...userData,
      });
    }
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-full w-full text-white p-8 bg-gradient-to-r from-blue-950 via-indigo-950 to-blue-950 bg-[length:400%_400%] animate-gradient-motion">
      <div className={styles.container}>
        {postsData.map((post) => (
          <motion.div
            key={post.id}
            initial="hidden"
            animate="visible"
            variants={cardAnimation}
            className={styles.card}
          >
            <Card
              className={styles.card}
              sx={{
                color: "white",
                bgcolor: "rgba(255, 255, 255, 0.001)",
                "& .MuiTypography-root": {
                  color: "white",
                  fontWeight: "bold",
                },
                "& .MuiCardHeader-title": {
                  color: "gray",
                  fontWeight: "bold",
                },
                "& .MuiCardHeader-subheader": {
                  color: "gray",
                },
                "& .MuiCardContent-root": {
                  color: "gray",
                },
                "& .MuiIconButton-root": {
                  color: "gray",
                },
                "& .MuiTextField-root input": {
                  color: "white", // Ensure text color inside TextField is white
                },
              }}
            >
              <CardHeader
                avatar={
                  <Avatar
                    src={users.find((u) => u.username == post.username)?.pfp}
                  />
                }
                title={
                  <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                    {post.username}
                  </Typography>
                }
                subheader={
                  <Typography variant="body3" sx={{ color: "gray" }}>
                    {timeAgo(post.date)}
                  </Typography>
                }
                action={
                  <IconButton onClick={handleClick}>
                    <MoreVertIcon />
                  </IconButton>
                }
              />
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Remove this post</MenuItem>
              </Menu>
              {post.post.image && (
                <CardMedia
                  component="img"
                  height="200"
                  image={post.post.image}
                  alt="Post image"
                />
              )}
              <CardContent>
                <Typography variant="body2">{post.post.text}</Typography>
              </CardContent>
              <Box className={styles.actions}>
                <Box className={styles.iconContainer}>
                  <IconButton
                    aria-label="like"
                    onClick={(e) => handleLike(post.id)}
                  >
                    {user.likedPosts.find((l) => l == post.id) ? (
                      <FavoriteIcon />
                    ) : (
                      <FavoriteBorderIcon />
                    )}
                  </IconButton>
                  <Typography variant="body2" className={styles.iconText}>
                    {post.likes}
                  </Typography>
                </Box>
                <Box className={styles.iconContainer}>
                  <IconButton aria-label="comment">
                    <ModeCommentIcon />
                  </IconButton>
                  <Typography variant="body2" className={styles.iconText}>
                    {comments.filter((c) => c.postId == post.id).length}
                  </Typography>
                </Box>
                <Box className={styles.iconContainer}>
                  <IconButton aria-label="share">
                    <ShareOutlinedIcon />
                  </IconButton>
                  <Typography variant="body2" className={styles.iconText}>
                    {post.shares}
                  </Typography>
                </Box>
              </Box>
              <CardContent sx={{ borderTop: "1px solid gray", pt: 2 }}>
                {comments
                  .filter((c) => c.postId == post.id)
                  .map((comment, index) => (
                    <Box key={comment.id} className={styles.comment}>
                      <Avatar
                        src={
                          users.find((u) => u.username == comment.username)?.pfp
                        }
                      />
                      <Box ml={2}>
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: "bold", fontSize: "0.9rem" }}
                        >
                          {comment.username}
                        </Typography>
                        <Typography variant="body2">{comment.text}</Typography>
                        <Typography variant="body2" sx={{ color: "gray" }}>
                          {timeAgo(comment.date)}
                        </Typography>
                      </Box>
                      <Box className={styles.iconContainer}>
                        <IconButton aria-label="like-comment">
                          <FavoriteBorderIcon />
                        </IconButton>
                        <Typography variant="body2" className={styles.iconText}>
                          {comment.likes}
                        </Typography>
                      </Box>
                      {index <
                        comments.filter((c) => c.postId == post.id).length -
                          1 && <hr className={styles.commentSeparator} />}
                    </Box>
                  ))}
                <TextField
                  variant="outlined"
                  fullWidth
                  placeholder="Write a comment..."
                  className={styles.commentField}
                />
                <Button
                  variant="contained"
                  color="primary"
                  className={styles.commentButton}
                >
                  Comment
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
