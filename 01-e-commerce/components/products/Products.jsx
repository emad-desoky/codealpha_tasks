import React, { useState } from "react";
import styles from "./Products.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as faHeartRegular,
  faHeart as faHeartSolid,
  faEye,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";

const products = [
  {
    id: 1,
    image:
      "https://allegro.stati.pl/AllegroIMG/PRODUCENCI/ASUS/ProArt-StudioBook-Pro-17/02-wielozadaniowosc.jpg",
    category: "Category 1",
    name: "Product Short Name",
    originalPrice: 99.0,
    discountedPrice: 49.0,
  },
  {
    id: 2,
    image:
      "https://contents.mediadecathlon.com/p2606919/k$a531927e5c71c12f4d3edac227199f78/jogflow-5001-men-s-running-shoes-white-blue-red.jpg?format=auto&quality=40&f=452x452",
    category: "Category 2",
    name: "Product Short Name",
    originalPrice: 99.0,
    discountedPrice: 49.0,
  },
  {
    id: 2,
    image:
      "https://contents.mediadecathlon.com/p2606919/k$a531927e5c71c12f4d3edac227199f78/jogflow-5001-men-s-running-shoes-white-blue-red.jpg?format=auto&quality=40&f=452x452",
    category: "Category 2",
    name: "Product Short Name",
    originalPrice: 99.0,
    discountedPrice: 49.0,
  },
  {
    id: 2,
    image:
      "https://contents.mediadecathlon.com/p2606919/k$a531927e5c71c12f4d3edac227199f78/jogflow-5001-men-s-running-shoes-white-blue-red.jpg?format=auto&quality=40&f=452x452",
    category: "Category 2",
    name: "Product Short Name",
    originalPrice: 99.0,
    discountedPrice: 49.0,
  },
  {
    id: 2,
    image:
      "https://contents.mediadecathlon.com/p2606919/k$a531927e5c71c12f4d3edac227199f78/jogflow-5001-men-s-running-shoes-white-blue-red.jpg?format=auto&quality=40&f=452x452",
    category: "Category 2",
    name: "Product Short Name",
    originalPrice: 99.0,
    discountedPrice: 49.0,
  },
  {
    id: 2,
    image:
      "https://contents.mediadecathlon.com/p2606919/k$a531927e5c71c12f4d3edac227199f78/jogflow-5001-men-s-running-shoes-white-blue-red.jpg?format=auto&quality=40&f=452x452",
    category: "Category 2",
    name: "Product Short Name",
    originalPrice: 99.0,
    discountedPrice: 49.0,
  },
  {
    id: 2,
    image:
      "https://contents.mediadecathlon.com/p2606919/k$a531927e5c71c12f4d3edac227199f78/jogflow-5001-men-s-running-shoes-white-blue-red.jpg?format=auto&quality=40&f=452x452",
    category: "Category 2",
    name: "Product Short Name",
    originalPrice: 99.0,
    discountedPrice: 49.0,
  },
  {
    id: 2,
    image:
      "https://contents.mediadecathlon.com/p2606919/k$a531927e5c71c12f4d3edac227199f78/jogflow-5001-men-s-running-shoes-white-blue-red.jpg?format=auto&quality=40&f=452x452",
    category: "Category 2",
    name: "Product Short Name",
    originalPrice: 99.0,
    discountedPrice: 49.0,
  },
  // Add more products as needed
];

const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [likedProducts, setLikedProducts] = useState(new Set());

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
    <section className={styles.featuredProducts}>
      <h3>Featured Products</h3>
      <hr />
      <div className={styles.productsContainer}>
        {products.map((product) => (
          <div key={product.id} className={styles.productCard}>
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
        ))}
      </div>

      {/* Optional: Dialog Component for Quick View */}
      {selectedProduct && (
        <div className={styles.productDialog}>
          <h4>{selectedProduct.name}</h4>
          {/* Include more product details here */}
          <button onClick={() => setSelectedProduct(null)}>Close</button>
        </div>
      )}
    </section>
  );
};

export default Products;
