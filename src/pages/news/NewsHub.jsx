import { useEffect, useState } from 'react';
import { Loader, MetricsCard } from '../../components';

const NewsHub = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('/api/health-news');
        const data = await response.json();
        setNews(data);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Health News Hub</h1>
      {loading ? (
        <Loader />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {news.map((article) => (
            <MetricsCard key={article.url} className="hover:shadow-lg h-full">
              {article.image && (
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              )}
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{article.title}</h3>
                <p className="text-gray-600 mb-4">{article.description}</p>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener"
                  className="text-blue-600 hover:underline text-sm"
                >
                  Read Full Article
                </a>
              </div>
            </MetricsCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsHub;