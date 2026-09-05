import { motion } from 'framer-motion'
import SectionEyebrow from '../SectionEyebrow/SectionEyebrow.jsx'
import { skillCategories } from '../../data/skills.js'
import './Skills.css'

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 18, scale: 0.94 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
}

export default function Skills() {
  return (
    <section id="skills" className="section skills">
      <div className="container">
        <div className="section-head">
          <SectionEyebrow>skills --list</SectionEyebrow>
          <h2 className="section-title">
            Technical <span className="gradient-text">Skills</span>
          </h2>
          <p className="section-sub">
            The languages, frameworks and tools I reach for when turning an idea into shipped software.
          </p>
        </div>

        <div className="skills-categories">
          {skillCategories.map((cat, catIndex) => (
            <motion.div
              key={cat.id}
              className="skills-category"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: catIndex * 0.05, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="skills-category-head">
                <h3>{cat.title}</h3>
                <span className="skills-category-tag">{cat.tag}</span>
              </div>

              <motion.div
                className="skills-grid"
                variants={gridVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
              >
                {cat.skills.map((skill) => {
                  const Icon = skill.icon
                  return (
                    <motion.div
                      key={skill.name}
                      className="skill-card glass"
                      variants={itemVariants}
                      whileHover={{ y: -6, scale: 1.03 }}
                    >
                      <Icon className="skill-icon" style={{ color: skill.color }} />
                      <span>{skill.name}</span>
                    </motion.div>
                  )
                })}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
