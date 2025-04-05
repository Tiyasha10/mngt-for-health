import express from "express";
import cors from "cors";
import postsRoutes from "./posts.js";

const app = express();

// Configure CORS for production
const allowedOrigins = [
  "https://legendary-gaufre-347b90.netlify.app", // Replace with your frontend URL
  "http://localhost:3000" // For local development
];

app.options('*', cors());

app.use(cors({
  origin: [
    "https://legendary-gaufre-347b90.netlify.app",
    "http://localhost:3000"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Added OPTIONS
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use(express.json());
app.use("/api", postsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});