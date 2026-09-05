import { motion } from 'framer-motion'
import { FiFileText, FiClock, FiExternalLink } from 'react-icons/fi'
import { certificates } from '../../data/education.js'
import './Certificates.css'

export default function Certificates() {
  return (
    <div>
      <h3 className="certificates-heading">Certificates</h3>

      <div className="certificates-list">
        {certificates.map((cert, i) => (
          <motion.a
            key={cert.id}
            href={cert.file}
            target="_blank"
            rel="noreferrer"
            className={`certificate-chip ${
              cert.status === 'upcoming'
                ? 'certificate-chip-upcoming'
                : ''
            }`}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.4,
              delay: i * 0.06,
            }}
            whileHover={{
              y: -4,
            }}
          >
            {cert.status === 'upcoming' ? (
              <FiClock />
            ) : (
              <FiFileText />
            )}

            <div>
              <span className="certificate-name">
                {cert.name}
              </span>

              <span className="certificate-issuer">
                {cert.issuer}
              </span>
            </div>

            {cert.status !== 'upcoming' && (
              <FiExternalLink className="certificate-external-icon" />
            )}
          </motion.a>
        ))}
      </div>
    </div>
  )
}