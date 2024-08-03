// src/components/Category.jsx
import React from "react";
import styles from "./Category.module.css";

const Category = () => {
  return (
    <div className={`py-3 py-md-5 bg-light ${styles.categoryContainer}`}>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h4 className="mb-4">Our Categories</h4>
          </div>
          <div className="col-6 col-md-3">
            <div className={styles.categoryCard}>
              <a href="">
                <div className={styles.categoryCardImg}>
                  <img
                    src="https://images-na.ssl-images-amazon.com/images/I/71tUh9NVxtL._SS400_.jpg"
                    className="w-100"
                    alt="Laptop"
                  />
                </div>
                <div className={styles.categoryCardBody}>
                  <h5>Laptop</h5>
                </div>
              </a>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className={styles.categoryCard}>
              <a href="">
                <div className={styles.categoryCardImg}>
                  <img
                    src="https://doctormobile.lk/wp-content/uploads/2021/04/OnePlus-9-Pro-Forest-Green-best-price-in-Sri-Lanka.jpg"
                    className="w-100"
                    alt="Mobile Devices"
                  />
                </div>
                <div className={styles.categoryCardBody}>
                  <h5>Mobile</h5>
                </div>
              </a>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className={styles.categoryCard}>
              <a href="">
                <div className={styles.categoryCardImg}>
                  <img
                    src="https://image.made-in-china.com/202f0j00ocPkLIYDCdbh/Custom-Oversized-Leisure-Apparel-Layer-Boxy-Puff-Print-Sweatshirts-Sudadera-Con-Capucha-Men-Blank-French-Terry-Heavyweight-Hoodies.webp"
                    className="w-100"
                    alt="Mens Fashion"
                  />
                </div>
                <div className={styles.categoryCardBody}>
                  <h5>Mens Fashion</h5>
                </div>
              </a>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className={styles.categoryCard}>
              <a href="">
                <div className={styles.categoryCardImg}>
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRviTSBaOIFUZZZbPr6ZLxKR9VoowKrmiuaLAs76oc8rkVNlp43eTW_S5HE9U4-b1c4HvY&usqp=CAU"
                    className="w-100"
                    alt="Women Fashion"
                  />
                </div>
                <div className={styles.categoryCardBody}>
                  <h5>Women Fashion</h5>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
