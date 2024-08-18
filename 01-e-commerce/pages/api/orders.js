import { db } from "@/firebase/clientApp";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const ordersCollection = collection(db, "orders");

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const querySnapshot = await getDocs(ordersCollection);
      const orders = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      res.status(200).json(orders);
    } catch (error) {
      console.error("GET Error:", error);
      res.status(500).json({ error: "Failed to fetch data" });
    }
  } else if (req.method === "POST") {
    try {
      const newElement = req.body;
      const docRef = await addDoc(ordersCollection, newElement);
      res.status(201).json({ id: docRef.id, ...newElement });
    } catch (error) {
      console.error("POST Error:", error);
      res.status(500).json({ error: "Failed to add data" });
    }
  } else if (req.method === "PUT") {
    try {
      const updatedElement = req.body;
      const orderDoc = doc(db, "orders", updatedElement.id);
      await updateDoc(orderDoc, updatedElement);
      res.status(200).json(updatedElement);
    } catch (error) {
      console.error("PUT Error:", error);
      res.status(500).json({ error: "Failed to update data" });
    }
  } else if (req.method === "DELETE") {
    const { id } = req.query;
    try {
      if (id === "all") {
        const querySnapshot = await getDocs(ordersCollection);
        querySnapshot.forEach(async (doc) => {
          await deleteDoc(doc.ref);
        });
        res.status(200).json({ message: "All orders deleted successfully" });
      } else {
        const orderDoc = doc(db, "orders", id);
        await deleteDoc(orderDoc);
        res.status(200).json({ message: "Element deleted successfully" });
      }
    } catch (error) {
      console.error("DELETE Error:", error);
      res.status(500).json({ error: "Failed to delete data" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
