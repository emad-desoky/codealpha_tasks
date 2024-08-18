import { db } from "@/firebase/clientApp";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const productsCollection = collection(db, "products");

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const querySnapshot = await getDocs(productsCollection);
      const products = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      res.status(200).json(products);
    } catch (error) {
      console.error("GET Error:", error);
      res.status(500).json({ error: "Failed to fetch data" });
    }
  } else if (req.method === "POST") {
    try {
      const newElement = req.body;
      const docRef = await addDoc(productsCollection, newElement);
      res.status(201).json({ id: docRef.id, ...newElement });
    } catch (error) {
      console.error("POST Error:", error);
      res.status(500).json({ error: "Failed to add data" });
    }
  } else if (req.method === "PUT") {
    try {
      const updatedElement = req.body;
      const productDoc = doc(db, "products", updatedElement.id);
      await updateDoc(productDoc, updatedElement);
      res.status(200).json(updatedElement);
    } catch (error) {
      console.error("PUT Error:", error);
      res.status(500).json({ error: "Failed to update data" });
    }
  } else if (req.method === "DELETE") {
    const { id } = req.query;
    try {
      const productDoc = doc(db, "products", id);
      await deleteDoc(productDoc);
      res.status(200).json({ message: "Element deleted successfully" });
    } catch (error) {
      console.error("DELETE Error:", error);
      res.status(500).json({ error: "Failed to delete data" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
