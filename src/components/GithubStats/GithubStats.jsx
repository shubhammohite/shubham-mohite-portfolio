import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FiGithub, FiStar, FiUsers, FiFolder, FiExternalLink } from 'react-icons/fi'
import { siteConfig } from '../../data/site.js'
import { useSpotlight } from '../../hooks/useSpotlight.js'
import './GithubStats.css'

/**
 * Pulls live public-profile stats from the GitHub REST API (no auth
 * required for public data). Fails gracefully — if the username in
 * site.js doesn't exist yet or the API is unreachable, this quietly
 * falls back to a plain "view profile" card instead of showing an error.
 */
export default function GithubStats() {
  const [status, setStatus] = useState('loading') // loading | ready | error
  const [stats, setStats] = useState(null)
  const { ref, onMouseMove } = useSpotlight()

  useEffect(() => {
    let cancelled = false

    async function fetchStats() {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${siteConfig.githubUsername}`),
          fetch(`https://api.github.com/users/${siteConfig.githubUsername}/repos?per_page=100`),
        ])

        if (!userRes.ok || !reposRes.ok) throw new Error('GitHub API request failed')

        const user = await userRes.json()
        const repos = await reposRes.json()
        const totalStars = Array.isArray(repos)
          ? repos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0)
          : 0

        if (!cancelled) {
          setStats({
            publicRepos: user.public_repos ?? 0,
            followers: user.followers ?? 0,
            totalStars,
          })
          setStatus('ready')
        }
      } catch {
        if (!cancelled) setStatus('error')
      }
    }

    fetchStats()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <motion.a
      ref={ref}
      onMouseMove={onMouseMove}
      href={siteConfig.githubUrl}
      target="_blank"
      rel="noreferrer"
      className="github-stats glass spotlight"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
    >
      <div className="github-stats-head">
        <span className="github-stats-icon">
          <FiGithub />
        </span>
        <div>
          <h3>GitHub Activity</h3>
          <span className="github-stats-handle">@{siteConfig.githubUsername}</span>
        </div>
        <FiExternalLink className="github-stats-external" />
      </div>

      {status === 'ready' && stats && (
        <div className="github-stats-numbers">
          <div>
            <FiFolder />
            <span>{stats.publicRepos}</span>
            <small>Repositories</small>
          </div>
          <div>
            <FiStar />
            <span>{stats.totalStars}</span>
            <small>Stars earned</small>
          </div>
          <div>
            <FiUsers />
            <span>{stats.followers}</span>
            <small>Followers</small>
          </div>
        </div>
      )}

      {status === 'loading' && (
        <div className="github-stats-loading">
          <span className="github-stats-skeleton" />
          <span className="github-stats-skeleton" />
          <span className="github-stats-skeleton" />
        </div>
      )}

      {status === 'error' && (
        <p className="github-stats-fallback">
          Live stats aren&apos;t available right now — head over to the profile directly.
        </p>
      )}
    </motion.a>
  )
}
