import express from "express";
import cors from "cors";
import postsRoutes from "./posts.js";
import axios from "axios";

const app = express();

// Configure CORS for production
const allowedOrigins = [
  "https://legendary-gaufre-347b90.netlify.app", // Replace with your frontend URL
  "http://localhost:3000",// For local development
  "https://localhost:3000"
];

app.options('*', cors());

app.use(cors({
  origin: [
    "https://legendary-gaufre-347b90.netlify.app",
    "http://localhost:3000",
    "https://localhost:3000"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Added OPTIONS
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use(express.json());
app.use("/api", postsRoutes);

const PORT = process.env.PORT || 5000;

// Change the environment variable name to something simpler
const apiKey = process.env.NEWS_API_KEY || process.env.VITE_RAPID_NEWORG_API_KEY;

if (!apiKey) {
  console.error('FATAL: NewsAPI key not found in environment variables');
  process.exit(1); // Crash the app if no API key
}

app.get('/api/news', async (req, res) => {
  try {
    console.log('Using NewsAPI key:', apiKey ? 'Exists' : 'Missing');
    
    const response = await axios.get('https://newsapi.org/v2/top-headlines', {
      params: {
        category: 'health',
        country: 'us',
        pageSize: 20,
        apiKey: apiKey
      }
    });

    if (!response.data.articles) {
      throw new Error('No articles in NewsAPI response');
    }

    res.json(response.data);
  } catch (error) {
    console.error('NewsAPI request failed:', {
      message: error.message,
      response: error.response?.data
    });
    
    res.status(500).json({ 
      error: 'Failed to fetch news',
      details: error.response?.data || error.message 
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});