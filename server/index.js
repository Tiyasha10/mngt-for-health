import express from "express";
import cors from "cors";
import postsRoutes from "./posts.js";
import axios from "axios";

const app = express();

// Configure CORS properly for production
const allowedOrigins = [
  "https://legendary-gaufre-347b90.netlify.app",
  "http://localhost:3000",
  "https://localhost:3000"
];

// Enhanced CORS configuration
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  exposedHeaders: ["Content-Length", "Authorization"]
}));

// Handle preflight requests
app.options('*', cors());

app.use(express.json());

// Add request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Your posts routes
app.use("/api", postsRoutes);

const PORT = process.env.PORT || 5000;

// News API configuration
const apiKey = process.env.NEWS_API_KEY || process.env.VITE_RAPID_NEWORG_API_KEY;

if (!apiKey) {
  console.error('NewsAPI key not found in environment variables');
  // Don't crash the app - just disable news functionality
} else {
  app.get('/api/news', async (req, res) => {
    try {
      const response = await axios.get('https://newsapi.org/v2/top-headlines', {
        params: {
          category: 'health',
          country: 'us',
          pageSize: 20,
          apiKey: apiKey
        },
        timeout: 5000 // 5 second timeout
      });

      if (!response.data.articles) {
        throw new Error('No articles in NewsAPI response');
      }

      res.json(response.data);
    } catch (error) {
      console.error('NewsAPI Error:', error.message);
      res.status(502).json({ 
        error: 'News service temporarily unavailable',
        details: error.message 
      });
    }
  });
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});