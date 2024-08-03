import React from "react";
import styles from "./Sales.module.css";

const Sales = () => {
  return (
    <div className={styles.salesContainer}>
      <div className={styles.saleCard}>
        <img
          src="https://www.notebookcheck.net/fileadmin/Notebooks/News/_nc3/Dell-XPS-13-ultrabook.jpg"
          alt="Laptop Sale"
          className={styles.image}
        />
        <div className={styles.saleOverlay}>
          <div className={styles.saleContent}>
            <h2>Super Sale</h2>
            <p>Up to 50% off</p>
            <p>On All Laptops</p>
            <button className={styles.button}>Hurry Up</button>
          </div>
        </div>
      </div>

      <div className={styles.saleCard}>
        <img
          src="https://templates.mediamodifier.com/5d9f0a841e443d3ad53ca8db/mens-fashion-sale-banner-maker.jpg"
          alt="Fashion Summer Sale"
          className={styles.image}
        />
        <div className={styles.saleOverlay}>
          <div className={styles.saleContent}>
            <h2>Fashion Summer Sale</h2>
            <p>Up to 50% off</p>
            <p>On Top Men's Fashion Brands</p>
            <button className={styles.button}>Shop Now</button>
          </div>
        </div>
      </div>

      <div className={styles.saleCard}>
        <img
          src="https://c.ndtvimg.com/2021-04/8dgceh18_fashion-sale650_625x300_01_April_21.jpg"
          alt="Women's Fashion Sale"
          className={styles.image}
        />
        <div className={styles.saleOverlay}>
          <div className={styles.saleContent}>
            <h2>Fashion Clearance</h2>
            <p>Buy Women's Fashion Products and get 30% off</p>
            <button className={styles.button}>Shop Now</button>
          </div>
        </div>
      </div>

      <div className={styles.saleCard}>
        <img
          src="https://img.freepik.com/free-vector/super-sale-phone-banner-mobile-clearance-sale-discount-poster-smartphone-sale-marketing-special-offer-promotion_433751-53.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1722643200&semt=ais_hybrid"
          alt="Mobiles Sale"
          className={styles.image}
        />
        <div className={styles.saleOverlay}>
          <div className={styles.saleContent}>
            <h2>Mobiles Sale</h2>
            <p>See All Mobiles and get 10% off</p>
            <button className={styles.button}>Shop Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sales;
