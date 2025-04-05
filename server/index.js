import express from "express";
import cors from "cors";
import postsRoutes from "./posts.js";
import axios from "axios";

const app = express();

// Configure allowed origins
const allowedOrigins = [
  "https://legendary-gaufre-347b90.netlify.app",
  "http://localhost:3000",
  "https://localhost:3000"
];

// Enhanced CORS middleware
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["Authorization"]
};

app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

app.use(express.json());

// Request logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Routes
app.use("/api", postsRoutes);

// News API endpoint
const apiKey = process.env.NEWS_API_KEY || process.env.VITE_RAPID_NEWORG_API_KEY;
if (apiKey) {
  app.get('/api/news', async (req, res) => {
    try {
      const response = await axios.get('https://newsapi.org/v2/top-headlines', {
        params: {
          category: 'health',
          country: 'us',
          pageSize: 20,
          apiKey: apiKey
        },
        timeout: 5000
      });
      res.json(response.data);
    } catch (error) {
      console.error('NewsAPI Error:', error);
      res.status(502).json({ error: 'News service unavailable' });
    }
  });
}

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});