import React from "react";
import styles from "./Hero.module.css";
import { FaShippingFast, FaMoneyBillWave, FaHeadphones } from "react-icons/fa";

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.item}>
        <div className={styles.iconWrapper}>
          <FaShippingFast className={styles.icon} />
        </div>
        <div className={styles.text}>
          <h3>FREE SHIPPING & RETURN</h3>
          <p>Free shipping on all orders over $49</p>
        </div>
      </div>
      <div className={styles.separator}></div>
      <div className={styles.item}>
        <div className={styles.iconWrapper}>
          <FaMoneyBillWave className={styles.icon} />
        </div>
        <div className={styles.text}>
          <h3>MONEY BACK GUARANTEE</h3>
          <p>100% money back guarantee</p>
        </div>
      </div>
      <div className={styles.separator}></div>
      <div className={styles.item}>
        <div className={styles.iconWrapper}>
          <FaHeadphones className={styles.icon} />
        </div>
        <div className={styles.text}>
          <h3>ONLINE SUPPORT 24/7</h3>
          <p>Awesome Support for 24/7 Days</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
