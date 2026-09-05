


import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiCopy, FiCheck } from 'react-icons/fi'
import { siteConfig } from '../../data/site.js'
import './CopyEmailButton.css'

/**
 * A small "copy email" affordance for recruiters who'd rather not open
 * their mail client — click to copy, with a friendly confirmation and a
 * clipboard-API fallback for older browsers.
 */
export default function CopyEmailButton({ variant = 'pill' }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(siteConfig.email)
      } else {
        const textarea = document.createElement('textarea')
        textarea.value = siteConfig.email
        textarea.style.position = 'fixed'
        textarea.style.opacity = '0'
        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand('copy')
        document.body.removeChild(textarea)
      }
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard access denied or unavailable — the email is still visible
      // and selectable, so this fails silently rather than showing an error.
    }
  }

  return (
    <button
      className={`copy-email copy-email-${variant}`}
      onClick={handleCopy}
      aria-label={copied ? 'Email address copied' : 'Copy email address'}
      type="button"
    >
      <span className="copy-email-text">{siteConfig.email}</span>
      <span className="copy-email-icon">
        <AnimatePresence mode="wait" initial={false}>
          {copied ? (
            <motion.span
              key="check"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.18 }}
            >
              <FiCheck />
            </motion.span>
          ) : (
            <motion.span
              key="copy"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.18 }}
            >
              <FiCopy />
            </motion.span>
          )}
        </AnimatePresence>
      </span>
      <AnimatePresence>
        {copied && (
          <motion.span
            className="copy-email-tooltip"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.2 }}
          >
            Copied!
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  )
}
