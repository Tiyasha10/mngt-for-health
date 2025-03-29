import { motion } from 'framer-motion'
import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'

const AnimatedProgressBar = ({ 
  value, 
  max, 
  label, 
  unit, 
  colorIndex = 0,
  barHeight = 'h-2',
  duration = 0.8,
  showMax = true
}) => {
  const [progress, setProgress] = useState(0)
  const safeMax = max <= 0 ? 1 : max
  const percentage = Math.min((value / safeMax) * 100, 100)

  // Animation colors based on Tailwind theme
  const colors = [
    'bg-blue-500',    // Blue
    'bg-emerald-500', // Green
    'bg-amber-500',   // Orange
    'bg-rose-500',    // Red
    'bg-violet-500'   // Purple
  ]

  useEffect(() => {
    setProgress(percentage)
  }, [percentage])

  return (
    <div className="space-y-2 w-full">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {new Intl.NumberFormat().format(value.toFixed(1))}
          {unit}
          {showMax && ` / ${new Intl.NumberFormat().format(safeMax)}${unit}`}
        </span>
      </div>
      
      <div 
        className={`${barHeight} bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden`}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={safeMax}
        aria-valuetext={`${percentage.toFixed(1)}%`}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ 
            duration: duration,
            type: 'spring',
            stiffness: 100,
            damping: 15
          }}
          className={`${colors[colorIndex % colors.length]} ${barHeight} relative rounded-full`}
        >
          <motion.div
            className="absolute inset-0 bg-white opacity-0"
            animate={{ 
              opacity: [0, 0.3, 0],
              x: ['-100%', '100%', '100%']
            }}
            transition={{ 
              duration: duration * 1.5,
              times: [0, 0.5, 1]
            }}
          />
        </motion.div>
      </div>
    </div>
  )
}

AnimatedProgressBar.propTypes = {
  value: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  unit: PropTypes.string,
  colorIndex: PropTypes.number,
  barHeight: PropTypes.string,
  duration: PropTypes.number,
  showMax: PropTypes.bool
}

export default AnimatedProgressBar