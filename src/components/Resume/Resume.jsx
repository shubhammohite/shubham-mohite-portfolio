import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiDownload, FiFileText, FiCheckCircle, FiEye, FiEyeOff } from 'react-icons/fi'
import SectionEyebrow from '../SectionEyebrow/SectionEyebrow.jsx'
import GithubStats from '../GithubStats/GithubStats.jsx'
import MagneticButton from '../MagneticButton/MagneticButton.jsx'
import { siteConfig } from '../../data/site.js'
import './Resume.css'

const HIGHLIGHTS = [
  '5+ years of experience building scalable enterprise applications',
  'Advanced Angular, TypeScript, RxJS & NgRx development',
  '.NET Core, ASP.NET Web API & REST API integration',
  'Microservices, Azure & CI/CD development experience',
  'Performance optimization, lazy loading & code splitting',
  'Enterprise platform experience serving 2M+ users',
  'Reusable component architecture & scalable UI development',
  'Agile development, code reviews & mentoring junior developers',
  'AI-integrated application development',
]

export default function Resume() {
  const [showPreview, setShowPreview] = useState(false)
  const [resumeAvailable, setResumeAvailable] = useState(null) // null = checking

  useEffect(() => {
    let cancelled = false
    fetch(siteConfig.resumeUrl, { method: 'HEAD' })
      .then((res) => {
        if (!cancelled) setResumeAvailable(res.ok)
      })
      .catch(() => {
        if (!cancelled) setResumeAvailable(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <section id="resume" className="section resume">
      <div className="container">
        <div className="section-head">
          <SectionEyebrow>resume --view</SectionEyebrow>
          <h2 className="section-title">
            My <span className="gradient-text">Resume</span>
          </h2>
          <p className="section-sub">
            A quick snapshot of my experience — preview it inline or download the full PDF.
          </p>
        </div>

        <div className="resume-layout container-narrow">
          <motion.div
            className="resume-card glass"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="resume-card-top">
              <div className="resume-icon">
                <FiFileText />
              </div>

              <div className="resume-info">
                <h3>{siteConfig.name} — Resume</h3>
                <p>Software Engineer · Angular · React · .NET · TypeScript · JavaScript</p>

                <ul className="resume-highlights">
                  {HIGHLIGHTS.map((h) => (
                    <li key={h}>
                      <FiCheckCircle /> {h}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="resume-actions">
              <button
                className="btn btn-ghost"
                onClick={() => setShowPreview((v) => !v)}
                disabled={resumeAvailable === false}
              >
                {showPreview ? <FiEyeOff /> : <FiEye />}
                {showPreview ? 'Hide Preview' : 'Preview Resume'}
              </button>
              <MagneticButton
                as="a"
                href={siteConfig.resumeUrl}
                download
                className={`btn btn-primary ${resumeAvailable === false ? 'btn-disabled' : ''}`}
                aria-disabled={resumeAvailable === false}
                onClick={(e) => resumeAvailable === false && e.preventDefault()}
              >
                <FiDownload /> Download PDF
              </MagneticButton>
            </div>

            {resumeAvailable === false && (
              <p className="resume-missing-note">
                Resume PDF not found yet — add <code>resume-shubhammohite.pdf</code> to the{' '}
                <code>public/</code> folder to enable preview and download.
              </p>
            )}

            <AnimatePresence>
              {showPreview && resumeAvailable && (
                <motion.div
                  className="resume-preview"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <iframe
                    src={siteConfig.resumeUrl}
                    title="Resume preview"
                    className="resume-iframe"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <GithubStats />
        </div>
      </div>
    </section>
  )
}
