import { useEffect, useState } from 'react';
import NewsCard from './NewsCard';
//import { NEWS_API_CONFIG } from '../../constants';
import Loader from '../../components/Loader';

const NewsPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const NEWS_API_CONFIG = {
    url: 'https://newsapi.org/v2/top-headlines',
    params: {
      category: 'health',
      country: 'us',
      pageSize: 20,
      apiKey: '9216f223c40440229d82933768283e83'
    }
  };

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const params = new URLSearchParams(NEWS_API_CONFIG.params);
        const response = await fetch(`${NEWS_API_CONFIG.url}?${params}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        if (!data.articles) {
          throw new Error('No articles found in response');
        }

        setArticles(data.articles);
      } catch (error) {
        console.error('Error fetching news:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <Loader />;

  if (error) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen text-red-500">
        <h1 className="text-2xl font-bold mb-4">Error loading news</h1>
        <p>{error}</p>
        <p className="mt-4">Please check your API key and try again later.</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Latest Health News</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles?.length > 0 ? (
          articles.map((article, index) => (
            <NewsCard key={index} article={article} />
          ))
        ) : (
          <div className="text-gray-500 text-lg">
            No health news articles found at the moment.
          </div>
        )}
      </div>
      {/* NewsAPI attribution */}
      <div className="mt-8 text-center text-sm text-gray-500">
        Powered by <a href="https://newsapi.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
          NewsAPI.org
        </a>
      </div>
    </div>
  );
};

export default NewsPage;