import { motion, AnimatePresence } from 'framer-motion'
import './Loader.css'

export default function Loader({ isLoading }) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="loader-content">
            <span className="loader-bracket">{'<'}</span>
            <motion.span
              className="loader-name"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
            >
              Shubham<span className="loader-dot">.</span>Mohite
            </motion.span>
            <span className="loader-bracket">{'/>'}</span>
          </div>
          <div className="loader-bar-track">
            <motion.div
              className="loader-bar-fill"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
