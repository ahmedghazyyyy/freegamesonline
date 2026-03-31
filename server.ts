import express from "express";
import cors from "cors";
import axios from "axios";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GAMEMONETIZE_FEED_URL = 'https://gamemonetize.com/feed.php?format=0';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // API route to proxy GameMonetize feed
  app.get("/api/games", async (req, res) => {
    try {
      console.log("Fetching games from GameMonetize...");
      const response = await axios.get(GAMEMONETIZE_FEED_URL, {
        timeout: 10000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'application/json'
        }
      });
      
      if (Array.isArray(response.data)) {
        console.log(`Successfully fetched ${response.data.length} games.`);
        res.json(response.data);
      } else {
        console.warn("GameMonetize feed is not an array:", response.data);
        res.status(500).json({ error: "Invalid feed format" });
      }
    } catch (error: any) {
      console.error("Failed to fetch games from GameMonetize:", error.message);
      res.status(500).json({ error: "Failed to fetch games", details: error.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
