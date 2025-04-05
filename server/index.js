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

// Add this route before app.listen()
app.get('/api/news', async (req, res) => {
  try {
    // Debug: Log the API key being used
    console.log('Using NewsAPI key:', process.env.VITE_RAPID_NEWORG_API_KEY ? 'Exists' : 'Missing');
    
    const apiKey = process.env.VITE_RAPID_NEWORG_API_KEY;
    if (!apiKey) {
      throw new Error('NewsAPI key not configured in environment variables');
    }

    const response = await axios.get('https://newsapi.org/v2/top-headlines', {
      params: {
        category: 'health',
        country: 'us',
        pageSize: 20,
        apiKey: apiKey // Add as query parameter
      },
      headers: {
        'X-Api-Key': apiKey // Also include in headers
      }
    });

    if (!response.data.articles) {
      throw new Error('No articles in NewsAPI response');
    }

    res.json(response.data);
  } catch (error) {
    console.error('Detailed NewsAPI error:', {
      message: error.message,
      config: error.config,
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