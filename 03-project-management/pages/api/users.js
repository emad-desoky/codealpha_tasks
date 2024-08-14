import fs from "fs";
import path from "path";

const readFile = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        reject("Failed to read data");
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
};

const writeFile = (filePath, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
      if (err) {
        reject("Failed to write data");
      } else {
        resolve();
      }
    });
  });
};

export default async function handler(req, res) {
  const filePath = path.join(process.cwd(), "data", "users.json");
  const postsPath = path.join(process.cwd(), "data", "posts.json");

  if (req.method === "GET") {
    try {
      const data = await readFile(filePath);
      if (req.query.username) {
        res
          .status(200)
          .json(data.find((d) => d.username == req.query.username));
      } else {
        res.status(200).json(data);
      }
    } catch (error) {
      console.error("GET Error:", error);
      res.status(500).json({ error: "Failed to read data" });
    }
  } else if (req.method === "POST") {
    let newElement;
    try {
      newElement = req.body;
    } catch (error) {
      console.error("POST JSON Error:", error);
      res.status(400).json({ error: "Invalid JSON" });
      return;
    }

    try {
      const data = await readFile(filePath);
      if (data.find((user) => user.username == newElement.username)) {
        res.status(201).json({ message: "Username Already Exists" });
      } else {
        data.push({
          ...newElement,
          likedReceived: 0,
          likesGiven: 0,
          likedPosts: [],
          friends: [],
          following: [],
          followers: [],
        });
        await writeFile(filePath, data);
        res.status(201).json(newElement);
      }
    } catch (error) {
      console.error("POST Error:", error);
      res.status(500).json({ error: "Failed to write data" });
    }
  } else if (req.method === "PUT") {
    let updatedElement;
    try {
      updatedElement = req.body;
    } catch (error) {
      console.error("PUT JSON Error:", error);
      res.status(400).json({ error: "Invalid JSON" });
      return;
    }

    try {
      const users = await readFile(filePath);
      const posts = await readFile(postsPath);
      const index = users.findIndex(
        (item) => item.username === updatedElement.username
      );
      if (index !== -1) {
        users[index] = updatedElement;

        const likedPosts = users.map((u) => u.likedPosts).flat();
        posts.forEach(
          (post) =>
            (post.likes = likedPosts.filter((lp) => lp == post.id).length)
        );

        await writeFile(filePath, users);
        await writeFile(postsPath, posts);
        res.status(200).json(updatedElement);
      } else {
        res.status(404).json({ error: "Element not found" });
      }
    } catch (error) {
      console.error("PUT Error:", error);
      res.status(500).json({ error: "Failed to update users" });
    }
  } else if (req.method === "DELETE") {
    try {
      const data = await readFile(filePath);
      const newData = data.filter((item) => item.username !== username);
      if (data.length === newData.length) {
        res.status(404).json({ error: "Element not found" });
      } else {
        await writeFile(filePath, newData);
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
