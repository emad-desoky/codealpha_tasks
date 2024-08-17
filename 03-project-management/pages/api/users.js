import { db } from "@/firebase/clientApp";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  addDoc,
} from "firebase/firestore";

export default async function handler(req, res) {
  const colRef = collection(db, "users");

  if (req.method === "GET") {
    try {
      const snapshot = await getDocs(colRef);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      res.status(200).json(data);
    } catch (error) {
      console.error("GET Error:", error);
      res.status(500).json({ error: "Failed to read data" });
    }
  } else if (req.method === "POST") {
    try {
      const newElement = req.body;

      if (!newElement.id) {
        // Handle case where ID is not provided and use auto-generated ID
        const newDocRef = await addDoc(colRef, newElement);
        res.status(201).json({ id: newDocRef.id, ...newElement });
      } else {
        // Use provided ID
        const newDocRef = doc(colRef, newElement.id);
        await setDoc(newDocRef, newElement);
        res.status(201).json(newElement);
      }
    } catch (error) {
      console.error("POST Error:", error);
      res.status(500).json({ error: "Failed to write data" });
    }
  } else if (req.method === "PUT") {
    try {
      const updatedElement = req.body;
      const docRef = doc(colRef, updatedElement.id);

      if (updatedElement.id) {
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          await updateDoc(docRef, updatedElement);
          res.status(200).json(updatedElement);
        } else {
          res.status(404).json({ error: "Element not found" });
        }
      } else {
        res.status(400).json({ error: "ID must be provided for update" });
      }
    } catch (error) {
      console.error("PUT Error:", error);
      res.status(500).json({ error: "Failed to update data" });
    }
  } else if (req.method === "DELETE") {
    try {
      const { id } = req.query;
      const docRef = doc(colRef, id);

      if (id) {
        await deleteDoc(docRef);
        res.status(200).json({ message: "Document deleted" });
      } else {
        res.status(400).json({ error: "ID must be provided for delete" });
      }
    } catch (error) {
      console.error("DELETE Error:", error);
      res.status(500).json({ error: "Failed to delete data" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
