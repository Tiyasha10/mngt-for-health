import { useState } from 'react';

const NewsCard = ({ article }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [votes, setVotes] = useState(0);

  const handleVote = (value) => {
    setVotes(prev => prev + value);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {article.urlToImage && (
        <img 
          src={article.urlToImage} 
          alt={article.title}
          className="w-full h-48 object-cover cursor-pointer"
          onClick={() => setIsOpen(true)}
        />
      )}
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 cursor-pointer" onClick={() => setIsOpen(true)}>
          {article.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4">{article.description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <button 
              onClick={() => handleVote(1)}
              className="flex items-center gap-1 text-green-600 hover:text-green-700"
            >
              ▲ {votes}
            </button>
            <button
              onClick={() => handleVote(-1)}
              className="flex items-center gap-1 text-red-600 hover:text-red-700"
            >
              ▼
            </button>
          </div>
          <span className="text-sm text-gray-500">{new Date(article.publishedAt).toLocaleDateString()}</span>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">{article.title}</h2>
            {article.urlToImage && (
              <img 
                src={article.urlToImage} 
                alt={article.title}
                className="w-full h-64 object-cover mb-4"
              />
            )}
            <p className="text-gray-700 mb-4">{article.content}</p>
            <div className="flex justify-between items-center">
              <a 
                href={article.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Read full article
              </a>
              <button 
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsCard;