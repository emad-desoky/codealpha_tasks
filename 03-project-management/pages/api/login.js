import { db } from "@/firebase/clientApp";
import { collection, getDocs } from "firebase/firestore";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { username, password } = req.body;

    try {
      // Reference to the Firestore collection
      const colRef = collection(db, "users");

      // Fetch all documents from the 'users' collection
      const snapshot = await getDocs(colRef);
      const users = snapshot.docs.map((doc) => doc.data());

      // Find the user with the matching username and password
      const foundUser = users.find(
        (user) => user.username === username && user.password === password
      );

      if (!foundUser) {
        return res.status(200).json({ message: "Invalid Credentials" });
      }

      return res.status(200).json(foundUser);
    } catch (error) {
      console.error("Error retrieving user data from Firestore:", error);
      return res.status(500).json({ error: "Failed to retrieve user data" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
