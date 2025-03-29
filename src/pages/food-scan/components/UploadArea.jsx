import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSearch } from 'react-icons/fi';

const UploadArea = ({ onAnalyze, isProcessing }) => {
  const [foodText, setFoodText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (foodText.trim() && !isProcessing) {
      onAnalyze(foodText);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative group">
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="relative flex flex-col sm:flex-row gap-4"
          >
            <input
              type="text"
              value={foodText}
              onChange={(e) => setFoodText(e.target.value)}
              placeholder="Enter food item (e.g., '200g grilled chicken breast')"
              className="flex-1 p-4 rounded-lg border dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-14"
              disabled={isProcessing}
            />
            
            <motion.button
              type="submit"
              disabled={!foodText.trim() || isProcessing}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 sm:w-auto w-full"
            >
              {isProcessing ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin">🌀</span>
                  Analyzing...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <FiSearch className="w-5 h-5" />
                  Analyze
                </span>
              )}
            </motion.button>
          </motion.div>
          
          <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Examples: "1 large banana", "2 cups cooked rice", "100g salmon fillet"
          </div>
        </div>
      </form>

      <motion.div 
        className="text-center text-gray-500 dark:text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <span className="hidden sm:inline">↓</span> Nutritional values will appear below
      </motion.div>
    </motion.div>
  );
};

export default UploadArea;