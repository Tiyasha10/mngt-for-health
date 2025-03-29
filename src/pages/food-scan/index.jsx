import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import NutritionResults from './components/NutritionResults';
import Loader from '@/components/Loader';

const FoodScanPage = () => {
  const [nutritionData, setNutritionData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [foodText, setFoodText] = useState('');

  const analyzeFood = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      setNutritionData(null);

      if (!foodText.trim()) {
        throw new Error('Please enter a food item');
      }

      const response = await fetch(
        `https://api.api-ninjas.com/v1/nutrition?query=${encodeURIComponent(foodText)}`,
        {
          method: 'GET',
          headers: {
            'X-Api-Key': '2Ohe/R1YlLsGou+voNcmVw==gjr15YgoxstVMUZy',
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);
      
      const data = await response.json();
      
      if (!data.length) {
        throw new Error('No nutrition data found for this food item');
      }

      setNutritionData({
        foodName: foodText,
        ...data[0] // API-Ninjas returns array of results
      });

    } catch (err) {
      setError(err.message || 'Failed to analyze food');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 max-w-4xl mx-auto dark:bg-gray-900">
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent"
      >
        Nutrition Analyzer 
      </motion.h1>

      <motion.form 
        onSubmit={analyzeFood}
        className="mb-8 space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            value={foodText}
            onChange={(e) => setFoodText(e.target.value)}
            placeholder="Enter food item (e.g., '1 large apple')"
            className="flex-1 p-4 rounded-lg border dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader className="w-5 h-5" />
                <span>Analyzing...</span>
              </>
            ) : 'Analyze'}
          </button>
        </div>
        
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
          Example: "200g grilled chicken breast", "1 medium banana", "2 slices pizza"
        </p>
      </motion.form>

      <AnimatePresence mode="wait">
        {error && (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="p-4 mb-4 text-red-700 bg-red-100 dark:bg-red-900/20 dark:text-red-400 rounded-lg"
          >
            ⚠️ {error}
          </motion.div>
        )}

        {nutritionData && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="space-y-6"
          >
            <NutritionResults data={nutritionData} />
            <button
              onClick={() => {
                setNutritionData(null);
                setFoodText('');
              }}
              className="w-full sm:w-auto px-6 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors"
            >
              ← Analyze another item
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FoodScanPage;