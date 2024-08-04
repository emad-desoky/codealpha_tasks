// components/Dialog.jsx
import React from "react";
import styles from "./Dialoug.module.css"; // Create a CSS module for the dialog styling if needed

const Dialog = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className={styles.dialogOverlay} onClick={onClose}>
      <div
        className={styles.dialogContent}
        onClick={(e) => e.stopPropagation()}
      >
        <h4 className={styles.dialogTitle}>{product.name}</h4>
        <img
          src={product.image}
          alt={product.name}
          className={styles.dialogImage}
        />
        <p className={styles.dialogDescription}>{product.description}</p>
        <p className={styles.dialogPrice}>
          <span>Price:</span> ${product.price.toFixed(2)}
        </p>
        <button className={styles.dialogCloseButton} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Dialog;
