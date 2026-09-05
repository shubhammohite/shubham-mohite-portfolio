import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiGithub, FiExternalLink, FiCheck } from 'react-icons/fi'
import './ProjectModal.css'

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])'

export default function ProjectModal({ project, onClose }) {
  const panelRef = useRef(null)
  const previouslyFocusedRef = useRef(null)

  // Open: remember what was focused, then move focus into the modal.
  useEffect(() => {
    if (!project) return

    previouslyFocusedRef.current = document.activeElement
    document.body.style.overflow = 'hidden'
    const panel = panelRef.current
    const focusable = panel?.querySelectorAll(FOCUSABLE_SELECTOR)
    focusable?.[0]?.focus()

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }

      if (e.key !== 'Tab' || !panel) return

      const items = Array.from(panel.querySelectorAll(FOCUSABLE_SELECTOR))
      if (items.length === 0) return

      const first = items[0]
      const last = items[items.length - 1]

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
      // Close: return focus to whatever triggered the modal.
      previouslyFocusedRef.current?.focus?.()
    }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          <motion.div
            className="modal-panel glass"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-project-title"
            ref={panelRef}
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close" onClick={onClose} aria-label="Close project details">
              <FiX />
            </button>

            <div className={`modal-cover project-cover-${project.image}`}>
              <span className="modal-cover-label">{project.title}</span>
            </div>

            <div className="modal-body">
              <div className="modal-heading">
                <h3 id="modal-project-title">{project.title}</h3>
                <span className="modal-year">{project.year}</span>
              </div>
              <p className="modal-tagline">{project.tagline}</p>
              <p className="modal-desc">{project.longDescription}</p>

              <div className="modal-features">
                <h4>Key features</h4>
                <ul>
                  {project.features.map((f) => (
                    <li key={f}>
                      <FiCheck /> {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="modal-tech">
                {project.tech.map((t) => (
                  <span key={t} className="chip">
                    {t}
                  </span>
                ))}
              </div>

              {/* <div className="modal-actions">
                <a href={project.github} target="_blank" rel="noreferrer" className="btn btn-ghost">
                  <FiGithub /> View Code
                </a>
                {project.demo && (
                  <a href={project.demo} target="_blank" rel="noreferrer" className="btn btn-primary">
                    <FiExternalLink /> Live Demo
                  </a>
                )}
              </div> */}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
