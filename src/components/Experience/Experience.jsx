
import { motion } from 'framer-motion'
import {
  FiCheckCircle,
  FiFileText,
  FiExternalLink,
} from 'react-icons/fi'
import SectionEyebrow from '../SectionEyebrow/SectionEyebrow.jsx'
import { experience } from '../../data/achievements.js'
import './Experience.css'

const CERTIFICATES = [
  {
    title: 'Internship Completion Letter',
    description: 'Certificate of successful completion of internship.',
    file: '/certificates/internship-completion-letter.pdf',
  },
  {
    title: 'Internship Offer Letter',
    description: 'Official internship offer letter.',
    file: '/certificates/internship-offer-letter.pdf',
  },
  {
    title: 'LocalHands Project Completion Letter',
    description: 'Project completion letter for the LocalHands project.',
    file: '/certificates/localhands-project-completion-letter.pdf',
  },
]

export default function Experience() {
  return (
    <section id="experience" className="section">
            <div className="section-head">
                <SectionEyebrow>Experience --all</SectionEyebrow>
                <h2 className="section-title">
                <span className="gradient-text">Experience</span>
                </h2>
              </div>
      <div className="container">
        <SectionEyebrow icon="experience" label="Work Experience" />

        <div className="experience-timeline">
          {experience.map((item, index) => (
            <motion.div
              key={`${item.company}-${item.role}`}
              className="experience-card glass container-narrow"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{
                duration: 0.7,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div className="experience-marker" />

              <div className="experience-content">
                <div className="experience-heading">
                  <div>
                    <h3>{item.role}</h3>

                    <p className="experience-company">
                      {item.company}
                    </p>

                    <span className="experience-period">
                      {item.period}
                    </span>
                  </div>

                  <span className="experience-type">
                    Experience
                  </span>
                </div>

                <ul className="experience-points">
                  {item.points.map((point) => (
                    <li key={point}>
                      <FiCheckCircle />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

