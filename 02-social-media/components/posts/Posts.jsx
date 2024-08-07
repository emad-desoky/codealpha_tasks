import React, { useState } from "react";
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
import postsData from "./PostsData";
import styles from "./Posts.module.css";

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
  const [liked, setLiked] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const cardAnimation = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
  };

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-full w-full text-white p-8 bg-gradient-to-r from-blue-950 via-indigo-950 to-blue-950 bg-[length:400%_400%] animate-gradient-motion">
      <div className={styles.container}>
        {postsData.map((post, index) => (
          <motion.div
            key={index}
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
                avatar={<Avatar src={post.pfp} />}
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
                  <IconButton aria-label="like" onClick={handleLike}>
                    {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
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
                    {post.commentsCount}
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
                {post.comments.map((comment, index) => (
                  <Box key={index} className={styles.comment}>
                    <Avatar src={comment.pfp} />
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
                    {index < post.comments.length - 1 && (
                      <hr className={styles.commentSeparator} />
                    )}
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
