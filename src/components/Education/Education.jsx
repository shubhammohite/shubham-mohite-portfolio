import { motion } from 'framer-motion'
import { FiBookOpen } from 'react-icons/fi'
import SectionEyebrow from '../SectionEyebrow/SectionEyebrow.jsx'
import { educationTimeline } from '../../data/education.js'
import './Education.css'

export default function Education() {
  return (
    <section id="education" className="section education">
      <div className="container">
        <div className="section-head">
          <SectionEyebrow>education --timeline</SectionEyebrow>
          <h2 className="section-title">
            Education <span className="gradient-text">Journey</span>
          </h2>
        </div>

        <div className="timeline container-narrow">
          {educationTimeline.map((item, i) => (
            <motion.div
              key={item.id}
              className="timeline-item"
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="timeline-node">
                <FiBookOpen />
              </div>
              <div className="timeline-card glass">
                <span className="timeline-period">{item.period}</span>
                <h3>{item.degree}</h3>
                {item.field && <p className="timeline-field">{item.field}</p>}
                {item.institute && <p className="timeline-institute">{item.institute}</p>}
                <span className="timeline-score">{item.score}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
