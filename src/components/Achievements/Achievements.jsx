import { motion } from 'framer-motion'
import { FiAward } from 'react-icons/fi'
import SectionEyebrow from '../SectionEyebrow/SectionEyebrow.jsx'
import Certificates from '../Certificates/Certificates.jsx'
import { useSpotlight } from '../../hooks/useSpotlight.js'
import { achievements } from '../../data/achievements.js'
import './Achievements.css'

function AchievementCard({ item, index }) {
  const { ref, onMouseMove } = useSpotlight()
  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      className="achievement-card glass spotlight"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6, borderColor: 'var(--accent-violet)' }}
    >
      <div className="achievement-icon">
        <FiAward />
      </div>
      <h3>{item.title}</h3>
      <span className="achievement-org">{item.org}</span>
      <p>{item.description}</p>
      <a href={item.link} target="_blank" rel="noreferrer" className="achievement-link">
        View Details
      </a>
    </motion.div>
  )
}

export default function Achievements() {
  return (
    <section id="achievements" className="section achievements">
      <div className="container">
        <div className="section-head">
          <SectionEyebrow>achievements --print</SectionEyebrow>
          <h2 className="section-title">
            Achievements <span className="gradient-text">& Certificates</span>
          </h2>
        </div>

        <div className="achievements-grid">
          {achievements.map((item, i) => (
            <AchievementCard key={item.id} item={item} index={i} />
          ))}
        </div>

        <Certificates />
      </div>
    </section>
  )
}
