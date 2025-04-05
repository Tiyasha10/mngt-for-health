import express from "express";
import cors from "cors";
import postsRoutes from "./posts.js";

const app = express();

// Configure CORS for production
const allowedOrigins = [
  "https://legendary-gaufre-347b90.netlify.app", // Replace with your frontend URL
  "http://localhost:3000" // For local development
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());
app.use("/api", postsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});