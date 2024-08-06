import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Box,
  Typography,
  Avatar,
  Divider,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import { Favorite, Comment } from "@mui/icons-material";
import { FaShare } from "react-icons/fa";
import { EmojiEmotions, EmojiNature } from "@mui/icons-material";

const MotionPost = ({
  post,
  newComment,
  handleCommentChange,
  handleCommentSubmit,
}) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      className="relative bg-white p-4 rounded-lg shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
      transition={{ duration: 0.5 }}
    >
      <Box
        component="img"
        src={post.postImage}
        alt="Post"
        sx={{
          position: "absolute",
          inset: 0,
          objectFit: "cover",
          width: "100%",
          height: "100%",
          borderRadius: "8px",
          opacity: 0.1,
          zIndex: -1,
        }}
      />

      {/* Post Content */}
      <Box display="flex" alignItems="center" mb={2}>
        <Avatar
          src={post.image}
          alt={post.username}
          sx={{
            width: 56,
            height: 56,
            mr: 2,
            border: "2px solid #ffffff",
          }}
        />
        <Box>
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333" }}>
            {post.username}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {post.date}
          </Typography>
        </Box>
      </Box>

      <Typography variant="body1" paragraph sx={{ color: "#333", mb: 2 }}>
        {post.content.text}
      </Typography>

      {/* Add image and text content */}
      <Box mb={2} display="flex" alignItems="center">
        <Box
          component="img"
          src={post.content.image}
          alt="Content"
          sx={{
            width: 100,
            height: 100,
            borderRadius: "8px",
            mr: 2,
            boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
          }}
        />
        <Typography variant="body2" sx={{ flex: 1 }}>
          Additional content goes here. This section can include more details or
          text about the post.
        </Typography>
      </Box>

      <Box display="flex" alignItems="center" mb={2}>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <IconButton color="inherit">
            <Favorite />
            <Typography variant="body2" sx={{ color: "#333", ml: 1 }}>
              {post.likes}
            </Typography>
          </IconButton>
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <IconButton color="inherit">
            <Comment />
            <Typography variant="body2" sx={{ color: "#333", ml: 1 }}>
              {post.comments.length}
            </Typography>
          </IconButton>
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <IconButton color="inherit">
            <FaShare />
          </IconButton>
        </motion.div>
      </Box>

      <Divider sx={{ mb: 2, backgroundColor: "#333" }} />

      {post.comments.map((comment) => (
        <Box key={comment.id} display="flex" alignItems="center" mb={1}>
          <Avatar
            src={comment.avatar}
            alt={comment.username}
            sx={{ width: 36, height: 36, mr: 2 }}
          />
          <Box>
            <Typography
              variant="body2"
              fontWeight="bold"
              sx={{ color: "#333" }}
            >
              {comment.username}:
            </Typography>
            <Typography variant="body2" sx={{ color: "#333" }}>
              {comment.text}
            </Typography>
          </Box>
        </Box>
      ))}

      <Box display="flex" alignItems="center" mt={2}>
        <Box display="flex" alignItems="center" sx={{ mr: 2 }}>
          <Avatar
            src="https://via.placeholder.com/40"
            alt="User"
            sx={{ width: 40, height: 40, mr: 1 }}
          />
          <TextField
            variant="outlined"
            size="small"
            value={newComment}
            onChange={handleCommentChange}
            placeholder="Add a comment..."
            fullWidth
            sx={{
              borderRadius: "20px",
              backgroundColor: "#f0f0f0",
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#ddd",
                },
                "&:hover fieldset": {
                  borderColor: "#aaa",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#888",
                },
              },
            }}
          />
        </Box>
        <Box display="flex" alignItems="center">
          <IconButton color="inherit" sx={{ mr: 1 }}>
            <EmojiEmotions />
          </IconButton>
          <IconButton color="inherit">
            <EmojiNature />
          </IconButton>
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleCommentSubmit(post.id)}
          sx={{ borderRadius: "20px", ml: 2 }}
        >
          Post
        </Button>
      </Box>
    </motion.div>
  );
};

export default MotionPost;
