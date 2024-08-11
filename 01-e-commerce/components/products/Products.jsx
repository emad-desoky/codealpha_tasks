import React, { useState, useEffect } from "react";
import styles from "./Products.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as faHeartRegular,
  faHeart as faHeartSolid,
  faEye,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import Dialog from "../dialog/Dialog"; // Import the Dialog component

const Products = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [likedProducts, setLikedProducts] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    fetch("/api/products")
      .then((response) => response.json())
      .then((data) => {
        const filteredProducts = data.filter(
          (product) => product.category !== "newProduct"
        );
        setProducts(filteredProducts);
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

  const handleAddToCart = (product) => {
    try {
      // Get the current cart from localStorage
      const cart = JSON.parse(localStorage.getItem("cart")) || [];

      // Add the new product to the cart
      const updatedCart = [...cart, { ...product, quantity: 1 }];

      // Save the updated cart back to localStorage
      localStorage.setItem("cart", JSON.stringify(updatedCart));

      alert("Product added to cart");
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(products.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <section className={styles.featuredProducts}>
      <h3>Featured Products</h3>
      <hr />
      <div className={styles.productsContainer}>
        {currentProducts.map((product) => (
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
                <span className={styles.price}>
                  ${product.price.toFixed(2)}
                </span>
              </p>
              <div className={styles.productActions}>
                <button
                  className={styles.addToCartButton}
                  onClick={() => handleAddToCart(product)}
                >
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

      <div className={styles.pagination}>
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => setCurrentPage(number)}
            className={currentPage === number ? styles.active : ""}
          >
            {number}
          </button>
        ))}
      </div>

      <Dialog
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  );
};

export default Products;
