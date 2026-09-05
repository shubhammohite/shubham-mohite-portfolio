import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiMail, FiPhone, FiMapPin, FiGithub, FiLinkedin, FiSend, FiCheck } from 'react-icons/fi'
import SectionEyebrow from '../SectionEyebrow/SectionEyebrow.jsx'
import AnimatedBlobs from '../AnimatedBlobs/AnimatedBlobs.jsx'
import CopyEmailButton from '../CopyEmailButton/CopyEmailButton.jsx'
import MagneticButton from '../MagneticButton/MagneticButton.jsx'
import { siteConfig } from '../../data/site.js'
import './Contact.css'

const CONTACT_INFO = [
  { icon: FiMail, label: 'Email', value: siteConfig.email, href: `mailto:${siteConfig.email}` },
  { icon: FiPhone, label: 'Phone', value: siteConfig.phone, href: siteConfig.phoneHref },
  { icon: FiMapPin, label: 'Location', value: siteConfig.location, href: '' },
  { icon: FiLinkedin, label: 'LinkedIn', value: siteConfig.linkedinUrl.replace('https://', ''), href: siteConfig.linkedinUrl },
  { icon: FiGithub, label: 'GitHub', value: siteConfig.githubUrl.replace('https://', ''), href: siteConfig.githubUrl },
]

const initialForm = { name: '', email: '', subject: '', message: '' }
const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY

export default function Contact() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = 'Please enter your name'
    if (!form.email.trim()) next.email = 'Please enter your email'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Enter a valid email address'
    if (!form.message.trim()) next.message = 'Please add a short message'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const handleSubmit = async (e) => {
  e.preventDefault()

  if (!validate()) return

  setStatus('sending')

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
       access_key: WEB3FORMS_ACCESS_KEY,
        name: form.name,
        email: form.email,
        subject:
          form.subject || `Portfolio message from ${form.name}`,
        message: form.message,
        from_name: form.name,
        replyto: form.email,
      }),
    })

    const result = await response.json()

    if (result.success) {
      setStatus('sent')
      setForm(initialForm)

      setTimeout(() => {
        setStatus('idle')
      }, 3500)
    } else {
      console.error('Web3Forms error:', result)
      setStatus('idle')
      alert('Unable to send the message. Please try again.')
    }
  } catch (error) {
    console.error('Submission error:', error)
    setStatus('idle')
    alert('Something went wrong. Please try again.')
  }
}

  return (
    <section id="contact" className="section contact">
      <AnimatedBlobs variant="tight" />
      <div className="container contact-inner">
        <div className="section-head">
          <SectionEyebrow>contact --send</SectionEyebrow>
          <h2 className="section-title">
            Let&apos;s <span className="gradient-text">Connect</span>
          </h2>
          <p className="section-sub">
            Have an opportunity, a project idea, or just want to say hi? My inbox is open.
          </p>
        </div>

        <div className="contact-grid">
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {CONTACT_INFO.map(({ icon: Icon, label, value, href }) => {
              const content = (
                <>
                  <span className="contact-info-icon">
                    <Icon />
                  </span>
                  <span>
                    <span className="contact-info-label">{label}</span>
                    <span className="contact-info-value">{value}</span>
                  </span>
                </>
              )
              return href ? (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  className="contact-info-item glass"
                >
                  {content}
                </a>
              ) : (
                <div key={label} className="contact-info-item glass">
                  {content}
                </div>
              )
            })}

            <CopyEmailButton />
          </motion.div>

          <motion.form
            className="contact-form glass"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  value={form.name}
                  onChange={handleChange}
                />
                {errors.name && <span className="form-error">{errors.name}</span>}
              </div>
              <div className="form-field">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                />
                {errors.email && <span className="form-error">{errors.email}</span>}
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="subject">Subject</label>
              <input
                id="subject"
                name="subject"
                type="text"
                placeholder="What's this about?"
                value={form.subject}
                onChange={handleChange}
              />
            </div>

            <div className="form-field">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Tell me a bit about the opportunity or idea..."
                value={form.message}
                onChange={handleChange}
              />
              {errors.message && <span className="form-error">{errors.message}</span>}
            </div>

            <MagneticButton
              type="submit"
              className="btn btn-primary contact-submit"
              disabled={status === 'sending'}
            >
              {status === 'sent' ? (
                <>
                  <FiCheck /> Message ready
                </>
              ) : status === 'sending' ? (
                'Opening mail client…'
              ) : (
                <>
                  <FiSend /> Send Message
                </>
              )}
            </MagneticButton>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
