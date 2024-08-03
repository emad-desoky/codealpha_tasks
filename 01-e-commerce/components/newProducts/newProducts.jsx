import React, { useState, useEffect } from "react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import styles from "./NewProducts.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as faHeartRegular,
  faHeart as faHeartSolid,
  faEye,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";

SwiperCore.use([Navigation, Pagination]);

const NewProducts = () => {
  const [newProducts, setNewProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [likedProducts, setLikedProducts] = useState(new Set());

  useEffect(() => {
    fetch("/api/products") // Ensure this is the correct endpoint
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data); // Debug line
        // Filter new products only
        const filteredProducts = data.filter(
          (product) => product.category === "newProduct"
        );
        setNewProducts(filteredProducts);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleQuickView = (product) => {
    setSelectedProduct(product);
  };

  const handleLikeToggle = (productId) => {
    setLikedProducts((prev) => {
      const updated = new Set(prev);
      if (updated.has(productId)) {
        updated.delete(productId);
      } else {
        updated.add(productId);
      }
      return updated;
    });
  };

  return (
    <section className={styles.newProducts}>
      <div className={styles.header}>
        <h3 className={styles.headerTitle}>NEW PRODUCT</h3>
        <hr className={styles.headerLine} />
      </div>
      <Swiper
        spaceBetween={30}
        slidesPerView={4}
        navigation
        pagination={{ clickable: true }}
      >
        {newProducts.length > 0 ? (
          newProducts.map((product) => (
            <SwiperSlide key={product.id}>
              <div className={styles.productCard}>
                <div className={styles.productCardImg}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className={styles.productImage}
                  />
                  <button
                    className={`${styles.likeButton} ${
                      likedProducts.has(product.id) ? styles.liked : ""
                    }`}
                    onClick={() => handleLikeToggle(product.id)}
                  >
                    <FontAwesomeIcon
                      icon={
                        likedProducts.has(product.id)
                          ? faHeartSolid
                          : faHeartRegular
                      }
                    />
                  </button>
                </div>
                <div className={styles.productCardBody}>
                  <p className={styles.productCategory}>{product.category}</p>
                  <h4 className={styles.productName}>{product.name}</h4>
                  <p className={styles.productPrice}>
                    <span className={styles.originalPrice}>
                      ${product.originalPrice.toFixed(2)}
                    </span>
                    <span className={styles.discountedPrice}>
                      ${product.discountedPrice.toFixed(2)}
                    </span>
                  </p>
                  <div className={styles.productActions}>
                    <button className={styles.addToCartButton}>
                      <FontAwesomeIcon icon={faShoppingCart} />
                      <span className={styles.buttonText}>Add to Cart</span>
                    </button>
                    <button
                      className={styles.quickViewButton}
                      onClick={() => handleQuickView(product)}
                    >
                      <FontAwesomeIcon icon={faEye} />
                      <span className={styles.buttonText}>View More</span>
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))
        ) : (
          <p>No new products available.</p>
        )}
      </Swiper>

      {selectedProduct && (
        <div className={styles.productDialog}>
          <h4>{selectedProduct.name}</h4>
          <button onClick={() => setSelectedProduct(null)}>Close</button>
        </div>
      )}
    </section>
  );
};

export default NewProducts;
