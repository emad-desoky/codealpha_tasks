// components/HeroSection.jsx
import React from "react";
import { motion } from "framer-motion";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const HeroSection = () => {
  // Animation settings for Framer Motion
  const titleAnimation = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const buttonAnimation = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-full w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white p-8">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={titleAnimation}
        className="text-center mb-8"
      >
        <Typography
          variant="h2"
          gutterBottom
          sx={{ fontWeight: "bold", fontSize: { xs: "2rem", sm: "3rem" } }}
        >
          Welcome to CodeAlpha Social
        </Typography>
        <Typography
          variant="h6"
          color="inherit"
          sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
        >
          Connect with friends and the world around you on CodeAlpha.
        </Typography>
      </motion.div>
      <motion.div initial="hidden" animate="visible" variants={buttonAnimation}>
        <Button
          variant="contained"
          size="large"
          color="secondary"
          sx={{
            padding: "12px 24px",
            borderRadius: "8px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            "&:hover": {
              backgroundColor: "#f50057",
              boxShadow: "0px 6px 8px rgba(0, 0, 0, 0.2)",
            },
          }}
        >
          Join Us Now
        </Button>
      </motion.div>
    </div>
  );
};

export default HeroSection;
