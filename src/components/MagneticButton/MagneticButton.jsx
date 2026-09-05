import { motion } from 'framer-motion'
import { useMagnetic } from '../../hooks/useMagnetic.js'

/**
 * Wraps a button or link with a magnetic hover pull. Use `as="a"` for
 * links (pass href/download/target as needed) or the default "button".
 * Reserved for a handful of primary CTAs — used everywhere it stops
 * feeling special and starts feeling gimmicky.
 */
export default function MagneticButton({ as = 'button', className = '', children, ...props }) {
  const { ref, style, onMouseMove, onMouseLeave } = useMagnetic()
  const Component = motion[as]

  return (
    <Component
      ref={ref}
      className={className}
      style={style}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      {...props}
    >
      {children}
    </Component>
  )
}
