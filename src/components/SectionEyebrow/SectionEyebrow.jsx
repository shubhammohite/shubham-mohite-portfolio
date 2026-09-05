import { motion } from 'framer-motion'
import './SectionEyebrow.css'

/**
 * A small terminal-style label used above section headings,
 * e.g. "$ whoami", "$ skills --list" — ties every section back
 * to the developer/terminal motif established in the hero.
 */
export default function SectionEyebrow({ children }) {
  return (
    <motion.span
      className="eyebrow"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <span className="eyebrow-prompt">$</span> {children}
    </motion.span>
  )
}
