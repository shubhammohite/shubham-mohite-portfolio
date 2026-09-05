import { motion } from 'framer-motion'
import { FiSun, FiMoon } from 'react-icons/fi'
import { useTheme } from '../../context/ThemeContext.jsx'
import './ThemeToggle.css'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label="Toggle color theme"
      aria-pressed={!isDark}
    >
      <motion.span
        className="theme-toggle-thumb"
        animate={{ x: isDark ? 0 : 24 }}
        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      >
        {isDark ? <FiMoon /> : <FiSun />}
      </motion.span>
    </button>
  )
}
