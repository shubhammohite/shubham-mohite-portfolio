import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiMail, FiDownload, FiArrowDown, FiZap } from 'react-icons/fi'
import { useTypingEffect } from '../../hooks/useTypingEffect.js'
import { siteConfig } from '../../data/site.js'
import AnimatedBlobs from '../AnimatedBlobs/AnimatedBlobs.jsx'
import ParticlesBackground from '../ParticlesBackground/ParticlesBackground.jsx'
import MagneticButton from '../MagneticButton/MagneticButton.jsx'
import './Hero.css'

const ROLES = [
  'Software Engineer',
  'Frontend Developer',
  'Full Stack Developer',
  'Angular Developer',
  'Wordpress Developer',
  'React Developer',
  '.NET Developer'
]

const SOCIALS = [
  { icon: FiGithub, label: 'GitHub', href: siteConfig.githubUrl },
  { icon: FiLinkedin, label: 'LinkedIn', href: siteConfig.linkedinUrl },
  {
  icon: FiMail,
  label: 'Email',
  href: 'https://mail.google.com/mail/?view=cm&fs=1&to=shubhammohite9081@gmail.com',
},
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 * i, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  }),
}

export default function Hero() {
  const typed = useTypingEffect(ROLES)

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="home" className="hero">
      <AnimatedBlobs />
      <ParticlesBackground count={26} />

      <div className="container hero-inner">
        <motion.p
          className="hero-eyebrow"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={0}
        >
          <span className="hero-dot" /> Open to New Opportunities
        </motion.p>

        <motion.h1
          className="hero-name"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={1}
        >
          Hi, I&apos;m <span className="gradient-text">Shubham Suresh Mohite</span>
        </motion.h1>

        <motion.div
          className="hero-role"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={2}
        >
          <span className="hero-role-prompt">&gt;</span>
          <span className="hero-role-text">{typed}</span>
          <span className="hero-cursor" />
        </motion.div>

        <motion.p
          className="hero-desc"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={3}
        >
         Software Engineer specializing in scalable frontend and full-stack applications. 
         I design and build high-performance enterprise systems using Angular, TypeScript, 
         .NET Core, microservices, and modern cloud technologies — with a growing focus on 
         AI-powered applications and intelligent software experiences.

        </motion.p>

      
        <motion.div
          className="hero-cta"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={4}
        >
          <MagneticButton
            as="a"
            href={siteConfig.resumeUrl}
            download
            className="btn btn-primary"
          >
            <FiDownload /> Download Resume
          </MagneticButton>
          <MagneticButton className="btn btn-ghost" onClick={() => scrollTo('projects')}>
            View Projects
          </MagneticButton>
        </motion.div>

        <motion.div
          className="hero-socials"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={5}
        >
          {SOCIALS.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="hero-social-icon"
            >
              <Icon />
            </a>
          ))}
        </motion.div>
      </div>

      <motion.button
        className="hero-scroll-indicator"
        onClick={() => scrollTo('about')}
        aria-label="Scroll to About section"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <FiArrowDown />
      </motion.button>
    </section>
  )
}
