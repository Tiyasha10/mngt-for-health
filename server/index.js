import express from "express";
import cors from "cors";
import postsRoutes from "./posts.js";

const app = express();

// Enhanced CORS configuration
const corsOptions = {
  origin: [
    'http://localhost:5173', // Vite dev server
    'https://gregarious-frangollo-e05687.netlify.app/' // Your production frontend URL
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
};

app.use(cors(corsOptions));
app.use(express.json());

// API routes
app.use("/api", postsRoutes);

// Get port from environment or use default
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});