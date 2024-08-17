import { db } from "@/firebase/clientApp";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";

// Reference to the Firestore collection
const colRef = collection(db, "tasks");

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      // Fetch all documents from the 'tasks' collection
      const snapshot = await getDocs(colRef);
      const tasks = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      res.status(200).json(tasks);
    } catch (error) {
      console.error("GET Error:", error);
      res.status(500).json({ error: "Failed to read data" });
    }
  } else if (req.method === "POST") {
    const newElement = req.body;

    try {
      // Add a new document to the 'tasks' collection
      const docRef = await addDoc(colRef, newElement);
      res.status(201).json({ id: docRef.id, ...newElement });
    } catch (error) {
      console.error("POST Error:", error);
      res.status(500).json({ error: "Failed to write data" });
    }
  } else if (req.method === "PUT") {
    const updatedElement = req.body;

    try {
      // Update the specific document in the 'tasks' collection
      const docRef = doc(db, "tasks", updatedElement.id);
      await setDoc(docRef, updatedElement, { merge: true });
      res.status(200).json(updatedElement);
    } catch (error) {
      console.error("PUT Error:", error);
      res.status(500).json({ error: "Failed to update data" });
    }
  } else if (req.method === "DELETE") {
    const { id } = req.query;

    try {
      // Delete the specific document from the 'tasks' collection
      const docRef = doc(db, "tasks", id);
      await deleteDoc(docRef);
      res.status(200).json({ message: "Element deleted successfully" });
    } catch (error) {
      console.error("DELETE Error:", error);
      res.status(500).json({ error: "Failed to delete data" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
