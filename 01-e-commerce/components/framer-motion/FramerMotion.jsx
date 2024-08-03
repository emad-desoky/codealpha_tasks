import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "popmotion";
import { images } from "./images"; // Ensure this is the correct path to your image-data file
import styles from "./FramerMotion.module.css"; // Import the CSS Module

const imageVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
    scale: 1.1,
    rotate: 10,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
    rotate: 0,
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.9,
    rotate: -10,
  }),
};

const navbarVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0 },
};

const pageVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => Math.abs(offset) * velocity;

export const FramerMotion = () => {
  const [[page, direction], setPage] = useState([0, 0]);
  const [autoScroll, setAutoScroll] = useState(true);
  const intervalRef = useRef(null);
  const firstRender = useRef(true); // Track first render

  const imageIndex = wrap(0, images.length, page);

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
    setAutoScroll(false); // Stop auto-scroll when user clicks
    if (intervalRef.current) clearInterval(intervalRef.current); // Clear interval on click
    setTimeout(() => {
      setAutoScroll(true); // Resume auto-scroll after 5 seconds
      startAutoScroll(); // Restart auto-scroll
    }, 5000);
  };

  const startAutoScroll = () => {
    if (autoScroll) {
      intervalRef.current = setInterval(() => {
        setPage(([page]) => [page + 1, 1]);
      }, 3000); // Change image every 3 seconds
    }
  };

  useEffect(() => {
    startAutoScroll();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current); // Cleanup interval on unmount
    };
  }, [autoScroll]);

  return (
    <motion.div
      className={styles.pageContainer}
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={pageVariants}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      <AnimatePresence>
        <motion.div
          className={styles.navbar}
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={navbarVariants}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {/* Your Navbar content */}
        </motion.div>
      </AnimatePresence>
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          key={page}
          src={images[imageIndex]}
          custom={direction}
          variants={imageVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.3 },
            scale: { duration: 0.5 },
            rotate: { duration: 0.5 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
          className={styles.img}
        />
      </AnimatePresence>
      <div className={styles.imgOverlay}>
        <div className={styles.overlayContent}>
          <h1>Best Ecommerce Solutions</h1>
          <h2>To Boost Your Brand Name & Sales</h2>
          <p>
            We offer an extensive range of services including website
            development, SEO optimization, digital marketing, and more.
            Transform your online presence and increase your sales with our
            tailored solutions.
          </p>
          <button onClick={() => alert("Get Now")}>GET NOW</button>
        </div>
      </div>
      <div className={styles.next} onClick={() => paginate(1)}>
        {"‣"}
      </div>
      <div className={styles.prev} onClick={() => paginate(-1)}>
        {"‣"}
      </div>
      <div className={styles.refresh}>{/* Refresh icon or content */}</div>
    </motion.div>
  );
};
