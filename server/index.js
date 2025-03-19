import express from "express";
import cors from "cors";
import postsRoutes from "./posts.js";  // ✅ Ensure correct path
import bmiRecords from "./bmiRecords.js";

const app = express();
app.use(cors());
app.use(express.json());  // ✅ Required to parse JSON in requests

app.use("/api", postsRoutes);// ✅ This exposes "/api/posts"
app.use("/api/bmi", bmiRecords);


app.listen(5000, () => {
  console.log("Server running on port 5000");
});