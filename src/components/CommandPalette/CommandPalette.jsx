
import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiHome, FiUser, FiCode, FiFolder, FiBriefcase, FiBookOpen,
  FiAward, FiFileText, FiMail, FiSun, FiMoon, FiCopy,
  FiGithub, FiLinkedin, FiDownload, FiSearch,
} from 'react-icons/fi'
import { useTheme } from '../../context/ThemeContext.jsx'
import { siteConfig } from '../../data/site.js'
import './CommandPalette.css'

const SECTIONS = [
  { id: 'home', label: 'Go to Home', icon: FiHome },
  { id: 'about', label: 'Go to About', icon: FiUser },
  { id: 'skills', label: 'Go to Skills', icon: FiCode },
  { id: 'projects', label: 'Go to Projects', icon: FiFolder },
  { id: 'experience', label: 'Go to Experience', icon: FiBriefcase },
  { id: 'education', label: 'Go to Education', icon: FiBookOpen },
  { id: 'achievements', label: 'Go to Achievements', icon: FiAward },
  { id: 'resume', label: 'Go to Resume', icon: FiFileText },
  { id: 'contact', label: 'Go to Contact', icon: FiMail },
]

/**
 * A Ctrl/Cmd+K command palette for quick navigation and actions.
 * Opens via keyboard shortcut, or by dispatching a
 * `window.dispatchEvent(new CustomEvent('open-command-palette'))`
 * from anywhere (e.g. a visible "⌘K" hint button in the navbar).
 */
export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef(null)
  const { theme, toggleTheme } = useTheme()

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.email)
    } catch {
      // Clipboard unavailable — fail silently, nothing else to do here.
    }
  }

  const commands = useMemo(() => {
    const navCommands = SECTIONS.map((s) => ({
      id: `nav-${s.id}`,
      label: s.label,
      icon: s.icon,
      action: () => scrollTo(s.id),
    }))

    return [
      ...navCommands,
      {
        id: 'theme',
        label: theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode',
        icon: theme === 'dark' ? FiSun : FiMoon,
        action: toggleTheme,
      },
      { id: 'copy-email', label: 'Copy email address', icon: FiCopy, action: copyEmail },
      {
        id: 'download-resume',
        label: 'Download resume',
        icon: FiDownload,
        action: () => {
          const link = document.createElement('a')
          link.href = siteConfig.resumeUrl
          link.download = ''
          link.click()
        },
      },
      {
        id: 'github',
        label: 'Open GitHub profile',
        icon: FiGithub,
        action: () => window.open(siteConfig.githubUrl, '_blank', 'noreferrer'),
      },
      {
        id: 'linkedin',
        label: 'Open LinkedIn profile',
        icon: FiLinkedin,
        action: () => window.open(siteConfig.linkedinUrl, '_blank', 'noreferrer'),
      },
    ]
  }, [theme])

  const filtered = useMemo(() => {
    if (!query.trim()) return commands
    const q = query.toLowerCase()
    return commands.filter((c) => c.label.toLowerCase().includes(q))
  }, [commands, query])

  const closePalette = () => {
    setIsOpen(false)
    setQuery('')
    setActiveIndex(0)
  }

  const runCommand = (cmd) => {
    if (!cmd) return
    cmd.action()
    closePalette()
  }

  // Ctrl/Cmd+K toggles the palette from anywhere on the page.
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setIsOpen((v) => !v)
      }
    }
    document.addEventListener('keydown', handleGlobalKeyDown)
    return () => document.removeEventListener('keydown', handleGlobalKeyDown)
  }, [])

  // Optional: let other components (e.g. a navbar hint button) open it too.
  useEffect(() => {
    const openHandler = () => setIsOpen(true)
    window.addEventListener('open-command-palette', openHandler)
    return () => window.removeEventListener('open-command-palette', openHandler)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      setTimeout(() => inputRef.current?.focus(), 10)
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    setActiveIndex(0)
  }, [query])

  const handleListKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      runCommand(filtered[activeIndex])
    } else if (e.key === 'Escape') {
      closePalette()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="cmdk-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={closePalette}
        >
          <motion.div
            className="cmdk-panel glass"
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={handleListKeyDown}
          >
            <div className="cmdk-input-row">
              <FiSearch className="cmdk-search-icon" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command or search..."
                aria-label="Search commands"
              />
              <kbd className="cmdk-esc">Esc</kbd>
            </div>

            <ul className="cmdk-list">
              {filtered.length === 0 && <li className="cmdk-empty">No matching commands</li>}
              {filtered.map((cmd, i) => {
                const Icon = cmd.icon
                return (
                  <li key={cmd.id}>
                    <button
                      className={i === activeIndex ? 'cmdk-item cmdk-item-active' : 'cmdk-item'}
                      onMouseEnter={() => setActiveIndex(i)}
                      onClick={() => runCommand(cmd)}
                    >
                      <Icon /> {cmd.label}
                    </button>
                  </li>
                )
              })}
            </ul>

            <div className="cmdk-footer">
              <span><kbd>↑</kbd><kbd>↓</kbd> Navigate</span>
              <span><kbd>Enter</kbd> Select</span>
              <span><kbd>Esc</kbd> Close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
