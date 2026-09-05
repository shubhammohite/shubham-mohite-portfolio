import { FiGithub, FiLinkedin, FiMail, FiArrowUp } from 'react-icons/fi'
import { siteConfig } from '../../data/site.js'
import './Footer.css'

const QUICK_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]

const SOCIALS = [
  { icon: FiGithub, label: 'GitHub', href: siteConfig.githubUrl },
  { icon: FiLinkedin, label: 'LinkedIn', href: siteConfig.linkedinUrl },
  { icon: FiMail, label: 'Email', href: `mailto:${siteConfig.email}` },
]

export default function Footer() {
  const year = new Date().getFullYear()

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault()
                scrollTo('home')
              }}
            >
              <span className="footer-logo-bracket">&lt;</span>
              Shubham Mohite
              <span className="footer-logo-bracket">/&gt;</span>
            </a>
            <p>Building scalable, thoughtfully engineered software — one project at a time.
Focused on clean architecture, great user experiences, and the future of AI-powered applications.
</p>
          </div>

          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              {QUICK_LINKS.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={(e) => {
                      e.preventDefault()
                      scrollTo(link.id)
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-socials">
            <h4>Connect</h4>
            <div className="footer-social-icons">
              {SOCIALS.map(({ icon: Icon, label, href }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}>
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {year} Shubham Suresh Mohite. All rights reserved.</p>
          <button
            className="footer-top-btn"
            onClick={() => scrollTo('home')}
            aria-label="Back to top"
          >
            Back to top <FiArrowUp />
          </button>
        </div>
      </div>
    </footer>
  )
}
