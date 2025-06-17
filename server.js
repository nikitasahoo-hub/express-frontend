// server.js (Node 18+, ES module style)
import express from "express";
import path from "path";
import fetch from "node-fetch";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = 3000;

// Serve static HTML / JS / CSS from /public
app.use(express.static(path.join(__dirname, "public")));

// Proxy‑style route that calls Flask
app.get("/data", async (_req, res) => {
  try {
    const response = await fetch("http://localhost:5000/api/message");
    const data = await response.json();
    res.json(data);                 // → { "message": "Hello from Flask backend!" }
  } catch (err) {
    res.status(500).json({ error: "Backend unreachable" });
  }
});

app.listen(PORT, () => {
  console.log(`Express listening on http://localhost:${PORT}`);
});
