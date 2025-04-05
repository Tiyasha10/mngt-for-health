import express from "express";
import cors from "cors";
import postsRoutes from "./posts.js";

const app = express();

// Configure CORS for production
const allowedOrigins = [
  "https://your-frontend-domain.netlify.app", // Replace with your frontend URL
  "http://localhost:3000" // For local development
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use(express.json());
app.use("/api", postsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});