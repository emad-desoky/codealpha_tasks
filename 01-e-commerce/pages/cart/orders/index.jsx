import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import { useRouter } from "next/router";
import axios from "axios";
import styles from "./Orders.module.css";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch orders from Firestore API endpoint
        const { data: ordersFromAPI } = await axios.get("/api/orders");
        const localProducts =
          JSON.parse(localStorage.getItem("products")) || [];
        setProducts(localProducts);

        const mergedOrders = ordersFromAPI.map((order) => ({
          ...order,
          items: order.items.map((item) => {
            const product = localProducts.find((p) => p.id === item.id);
            return {
              ...item,
              ...product,
            };
          }),
        }));

        const statusLabels = [
          "Getting Order Ready",
          "Delivering Order",
          "Delivered",
        ];
        const updatedOrders = mergedOrders.map((order) => ({
          ...order,
          status: statusLabels[Math.floor(Math.random() * statusLabels.length)],
        }));
        setOrders(updatedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchData();
  }, []);

  const handleCancelOrder = async () => {
    try {
      await axios.delete("/api/orders?id=all");
      setOrders([]);
    } catch (error) {
      console.error("Error canceling all orders:", error);
    }
  };

  const handleNavigate = () => {
    router.push("/"); // Navigate to /
  };

  const subtotal = orders.reduce(
    (acc, order) =>
      acc +
      order.items.reduce((itemAcc, item) => itemAcc + (item.price || 0), 0),
    0
  );
  const shipping = 10;
  const total = subtotal + shipping;

  const statusLabels = {
    "Getting Order Ready": "🛠️ Getting Order Ready",
    "Delivering Order": "🚚 Delivering Order",
    Delivered: "✅ Delivered",
  };

  return (
    <div className={styles.ordersContainer}>
      <div className={styles.header}>
        <Typography variant="h4" className={styles.title}>
          Thanks For Your Order
        </Typography>
        <Button
          variant="contained"
          color="error"
          className={styles.cancelAllButton}
          onClick={handleCancelOrder}
        >
          Cancel All Orders
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={styles.navigateButton}
          onClick={handleNavigate}
        >
          Go back
        </Button>
      </div>

      <div className={styles.productsContainer}>
        {orders.length > 0 ? (
          orders.map((order) => (
            <div key={order.id} className={styles.orderSection}>
              {order.items.map((item) => (
                <Card key={item.id} className={styles.productCard}>
                  <CardContent>
                    <Typography variant="h6" className={styles.productName}>
                      {item.name || "Unnamed Product"}
                    </Typography>
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name || "Product Image"}
                        className={styles.productImage}
                      />
                    ) : (
                      <Typography>No Image Available</Typography>
                    )}
                    <Typography>Category: {item.category || "N/A"}</Typography>
                    <Typography>
                      Price: ${item.price?.toFixed(2) || "0.00"}
                    </Typography>
                    <Typography>Quantity: {item.quantity || 0}</Typography>
                  </CardContent>
                </Card>
              ))}
              <Typography className={styles.status}>
                {statusLabels[order.status] || "Status Unknown"}
              </Typography>
            </div>
          ))
        ) : (
          <Typography>No orders found</Typography>
        )}
      </div>

      <Card className={styles.totalsCard}>
        <CardContent>
          <Typography className={styles.totalsHeader}>Totals</Typography>
          <div className={styles.totalsItem}>
            <Typography>Subtotal:</Typography>
            <Typography>${subtotal.toFixed(2)}</Typography>
          </div>
          <div className={styles.totalsItem}>
            <Typography>Shipping:</Typography>
            <Typography>${shipping.toFixed(2)}</Typography>
          </div>
          <div className={styles.totalsItem}>
            <Typography className={styles.subTotal}>Total:</Typography>
            <Typography>${total.toFixed(2)}</Typography>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
