import React, { useState, useEffect } from "react";
import styles from "./Cart.module.css";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Fetch cart items from the backend when the component mounts
    fetch("/api/cart")
      .then((response) => response.json())
      .then((data) => {
        // Ensure the cart is initially empty or populated correctly
        setCartItems(data);
      })
      .catch((error) => console.error("Error fetching cart items:", error));
  }, []);

  const handleRemove = (id) => {
    fetch(`/api/cart?id=${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          // Remove the item from the local state
          setCartItems((prevItems) =>
            prevItems.filter((item) => item.id !== id)
          );
        } else {
          throw new Error("Failed to remove item");
        }
      })
      .catch((error) => console.error("Error removing item:", error));
  };

  const calculateTotal = () => {
    return cartItems
      .reduce(
        (total, item) => total + parseFloat(item.price) * item.quantity,
        0
      )
      .toFixed(2);
  };

  return (
    <>
      <Navbar />
      <Container className={styles.cartContainer}>
        <Row className="justify-content-center">
          <Col md={10}>
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <Card className={styles.cartItem} key={item.id}>
                  <Row>
                    <Col md={4} className={styles.imageCol}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className={styles.productImage}
                      />
                    </Col>
                    <Col md={8} className={styles.detailsCol}>
                      <Card.Body>
                        <Card.Title>{item.name}</Card.Title>
                        <Card.Text>
                          <strong>Price:</strong> $
                          {parseFloat(item.price).toFixed(2)}
                        </Card.Text>
                        <Card.Text>
                          <strong>Quantity:</strong> {item.quantity}
                        </Card.Text>
                        <Card.Text>
                          <strong>Total:</strong> $
                          {(parseFloat(item.price) * item.quantity).toFixed(2)}
                        </Card.Text>
                        <Button
                          variant="danger"
                          onClick={() => handleRemove(item.id)}
                          className={styles.removeButton}
                        >
                          <FontAwesomeIcon icon={faTrashAlt} /> Remove
                        </Button>
                      </Card.Body>
                    </Col>
                  </Row>
                </Card>
              ))
            ) : (
              <p>No items in the cart.</p>
            )}
            {cartItems.length > 0 && (
              <Card className={styles.summaryCard}>
                <Card.Body>
                  <Card.Title>Order Summary</Card.Title>
                  <Card.Text>
                    <strong>Items:</strong> {cartItems.length}
                  </Card.Text>
                  <Card.Text>
                    <strong>Total:</strong> ${calculateTotal()}
                  </Card.Text>
                  <Button variant="success" className={styles.checkoutButton}>
                    Proceed to Checkout
                  </Button>
                </Card.Body>
              </Card>
            )}
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default Cart;
