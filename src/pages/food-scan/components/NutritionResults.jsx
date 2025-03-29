import { motion } from 'framer-motion'

const NutritionResults = ({ data }) => {
  if (!data) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
    >
      <div className="mb-6 border-b dark:border-gray-700 pb-4">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
        {data.foodName}
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { label: 'Calories', value: data.calories, unit: 'kcal' },
          { label: 'Protein', value: data.protein_g, unit: 'g' },
          { label: 'Total Fat', value: data.fat_total_g, unit: 'g' },
          { label: 'Carbs', value: data.carbohydrates_total_g, unit: 'g' },
          { label: 'Sugar', value: data.sugar_g, unit: 'g' },
          { label: 'Fiber', value: data.fiber_g, unit: 'g' },
          { label: 'Sodium', value: data.sodium_mg, unit: 'mg' },
          { label: 'Cholesterol', value: data.cholesterol_mg, unit: 'mg' },
        ].map((nutrient, index) => (
          <NutritionCard 
            key={nutrient.label}
            label={nutrient.label}
            value={Math.round(nutrient.value || 0)}
            unit={nutrient.unit}
            index={index}
          />
        ))}
      </div>
    </motion.div>
  )
}

const NutritionCard = ({ label, value, unit, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg hover:shadow-md transition-shadow"
  >
    <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
      {label}
    </h3>
    <div className="flex items-baseline gap-2">
      <span className="text-2xl font-bold text-gray-900 dark:text-white">
        {value > 0 ? value : 'N/A'}
      </span>
      {value > 0 && (
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {unit}
        </span>
      )}
    </div>
  </motion.div>
)

export default NutritionResults