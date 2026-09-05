import { motion } from 'framer-motion'
import { FiCode, FiLayers,FiGlobe, FiCpu } from 'react-icons/fi'
import SectionEyebrow from '../SectionEyebrow/SectionEyebrow.jsx'
import { useCounter } from '../../hooks/useCounter.js'
import { useSpotlight } from '../../hooks/useSpotlight.js'
import './About.css'

const FOCUS_AREAS = [
  {
    icon: FiCode,
    title: 'Backend Development',
    desc: 'Building reliable APIs and backend services with .NET Core, ASP.NET Web API, Microservices and SQL Server.',
  },
  {
    icon: FiLayers,
    title: 'Full Stack Development',
    desc: 'Building scalable applications with Angular, React and REST API integration.',
  },
  {
    icon: FiGlobe,
    title: 'WordPress Development',
    desc: 'Creating SEO-friendly, responsive WordPress websites with optimized content and user experiences.',
  },
  {
    icon: FiCpu,
    title: 'AI Job Application Platform',
    desc: 'iApply is the world\'s first ever artificial Intelligence powered platform that applies jobs on behalf of the jobseekers.',
  },
]

const STATS = [
  { end: 5, suffix: '+', label: 'Years of experience' },
  { end: 10, suffix: '+', label: 'Projects shipped' },
  { end: 3, suffix: '', label: 'Companies worked' },
  { end: 1, suffix: '', label: 'Internship completed' },
  { end: 8, suffix: '', label: 'Core technologies', decimal: '.5' },

]

function StatCounter({ end, suffix, label, decimal }) {
  const [ref, count] = useCounter(end)
  return (
    <div className="about-stat" ref={ref}>
      <span className="about-stat-num gradient-text">
        {count}
        {decimal || ''}
        {suffix}
      </span>
      <span className="about-stat-label">{label}</span>
    </div>
  )
}

function FocusCard({ icon: Icon, title, desc }) {
  const { ref, onMouseMove } = useSpotlight()
  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      className="about-card glass spotlight"
      whileHover={{ y: -6, borderColor: 'var(--accent-violet)' }}
      transition={{ duration: 0.3 }}
    >
      <div className="about-card-icon">
        <Icon />
      </div>
      <h3>{title}</h3>
      <p>{desc}</p>
    </motion.div>
  )
}

export default function About() {
  return (
    <section id="about" className="section about">
      <div className="container">
        <div className="section-head">
          <SectionEyebrow>whoami</SectionEyebrow>
          <h2 className="section-title">
            About <span className="gradient-text">Me</span>
          </h2>
        </div>

        <div className="about-grid">
          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p>
              I&apos;m a Software Engineer and Senior Angular Developer with 5+ years of experience building scalable, high-performance enterprise applications. 
              My core expertise lies in <strong>Angular, TypeScript, JavaScript, RxJS, NgRx, .NET Core, 
              RESTful APIs, and modern frontend architecture.</strong>
            </p>
            <p>
             Throughout my career, I&apos;ve worked on business-critical applications across IoT, 
             Smart Metering, Energy & Utilities, CRM, Document Management, and Recruitment.
             I&apos;ve contributed to <strong>Enterprise Platforms serving more than 2 million users,</strong> 
             with a strong focus on performance, scalability, security, and maintainability.
            </p>
            <p>
             I enjoy solving complex engineering problems and turning business requirements into 
             clean, reusable, and user-centric software. I have hands-on experience with microservices, 
             Azure, CI/CD, Angular Signals, lazy loading, code splitting, reusable component architecture, and performance optimization.
            </p>
            <p>
            Beyond development, I actively contribute to technical discussions, code reviews, 
            architecture decisions, and mentoring junior developers. 
            I believe in continuous learning, clean engineering practices, 
            and building software that is not only functional but also scalable and easy to maintain.
            </p>
            <p>
            Currently, I&apos;m expanding my focus toward AI-powered applications 
            and exploring how modern AI capabilities can be integrated with enterprise software 
            to create smarter, more efficient user experiences.
            </p>

            <div className="about-stats">
              {STATS.map((s) => (
                <StatCounter key={s.label} {...s} />
              ))}
            </div>
          </motion.div>

          <motion.div
            className="about-cards"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {FOCUS_AREAS.map(({ icon: Icon, title, desc }) => (
              <FocusCard key={title} icon={Icon} title={title} desc={desc} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
