import fs from "fs";
import path from "path";

// Path to the JSON file
const usersFilePath = path.join(process.cwd(), "data", "users.json");

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { username, password } = req.body;

    try {
      // Read the JSON file
      const fileContent = fs.readFileSync(usersFilePath);
      const users = JSON.parse(fileContent);

      // Find the user with the matching username and password
      const foundUser = users.find(
        (user) => user.username === username && user.password === password
      );

      if (!foundUser) {
        return res.status(200).json({ message: "Invalid Credentials" });
      }

      return res.status(200).json(foundUser);
    } catch (error) {
      console.error("Error reading user data from JSON file:", error);
      return res.status(500).json({ error: "Failed to retrieve user data" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
