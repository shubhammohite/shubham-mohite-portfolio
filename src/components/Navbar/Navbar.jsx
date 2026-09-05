import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX } from 'react-icons/fi'
import { useActiveSection } from '../../hooks/useActiveSection.js'
import ThemeToggle from '../ThemeToggle/ThemeToggle.jsx'
import './Navbar.css'

const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'resume', label: 'Resume' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const activeId = useActiveSection(NAV_LINKS.map((l) => l.id))

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const handleNavClick = (id) => {
    setMenuOpen(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <nav className="navbar-inner glass container">
        <a
          href="#home"
          className="navbar-logo"
          onClick={(e) => {
            e.preventDefault()
            handleNavClick('home')
          }}
        >
          <span className="navbar-logo-bracket">&lt;</span>
          ShubhamMohite
          <span className="navbar-logo-bracket">/&gt;</span>
        </a>

        <ul className="navbar-links">
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className={activeId === link.id ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick(link.id)
                }}
              >
                {link.label}
                {activeId === link.id && (
                  <motion.span
                    layoutId="navbar-underline"
                    className="navbar-underline"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
              </a>
            </li>
          ))}
        </ul>

        <div className="navbar-actions">
          <button
            className="navbar-cmdk-hint"
            onClick={() => window.dispatchEvent(new CustomEvent('open-command-palette'))}
            aria-label="Open command palette"
          >
            <kbd>⌘</kbd><kbd>K</kbd>
          </button>
          <ThemeToggle />
          <button
            className="navbar-burger"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="navbar-mobile glass"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={activeId === link.id ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick(link.id)
                }}
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}