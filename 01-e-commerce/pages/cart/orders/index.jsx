import React, { useState } from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import styles from "./Orders.module.css";
import ordersData from "@/data/orders.json"; // Import JSON data

export default function Orders() {
  const [orders, setOrders] = useState(ordersData);

  // Calculate totals
  const subtotal = orders.reduce((acc, order) => acc + order.price, 0);
  const shipping = 10; // fixed shipping cost
  const total = subtotal + shipping;

  const handleCancelOrder = (id) => {
    // Handle cancel order logic here
    setOrders(orders.filter((order) => order.id !== id));
  };

  const statusLabels = {
    "Getting Order Ready": "🛠️ Getting Order Ready",
    "Delivering Order": "🚚 Delivering Order",
    Delivered: "✅ Delivered",
  };

  return (
    <div className={styles.ordersContainer}>
      <div className={styles.header}>
        <Typography variant="h1">Thanks For Your Order</Typography>
      </div>

      <div className={styles.productsContainer}>
        {orders.map((order) => (
          <Card key={order.id} className={styles.productCard}>
            <CardContent>
              <Typography variant="h6">{order.product}</Typography>
              <Typography>Price: ${order.price}</Typography>
              <Typography className={styles.status}>
                {statusLabels[order.status]}
              </Typography>
              <Button
                variant="contained"
                className={styles.cancelButton}
                onClick={() => handleCancelOrder(order.id)}
              >
                Cancel Order
              </Button>
            </CardContent>
          </Card>
        ))}
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
