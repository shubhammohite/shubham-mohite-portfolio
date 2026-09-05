import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiGithub, FiExternalLink, FiArrowUpRight } from 'react-icons/fi'
import SectionEyebrow from '../SectionEyebrow/SectionEyebrow.jsx'
import ProjectModal from './ProjectModal.jsx'
import { projects } from '../../data/projects.js'
import './Projects.css'

export default function Projects() {
  const [activeProject, setActiveProject] = useState(null)

  return (
    <section id="projects" className="section projects">
      <div className="container">
        <div className="section-head">
          <SectionEyebrow>projects --all</SectionEyebrow>
          <h2 className="section-title">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="section-sub">
            A selection of things I&apos;ve designed and built — from a JavaFX desktop app to full-stack and Flutter products.
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((project, i) => (
            <motion.article
              key={project.id}
              className="project-card glass"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8 }}
            >
              <button
                className={`project-cover project-cover-${project.image}`}
                onClick={() => setActiveProject(project)}
                aria-label={`View details for ${project.title}`}
              >
                <span className="project-cover-glyph">{project.title.slice(0, 2).toUpperCase()}</span>
                <span className="project-cover-expand">
                  <FiArrowUpRight />
                </span>
              </button>

              <div className="project-body">
                {project.featured && <span className="project-badge">Featured</span>}
                <h3>{project.title}</h3>
                <p className="project-tagline">{project.tagline}</p>
                <p className="project-desc">{project.description}</p>

                <div className="project-chips">
                  {project.tech.slice(0, 4).map((t) => (
                    <span key={t} className="chip">
                      {t}
                    </span>
                  ))}
                  {project.tech.length > 4 && (
                    <span className="chip chip-muted">+{project.tech.length - 4}</span>
                  )}
                </div>

                <div className="project-actions">
                  {/* <a href={project.github} target="_blank" rel="noreferrer" className="project-link">
                    <FiGithub /> Code
                  </a>
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noreferrer" className="project-link">
                      <FiExternalLink /> Live Demo
                    </a>
                  )} */}
                  <button className="project-link project-link-details" onClick={() => setActiveProject(project)}>
                    Details
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  )
}
