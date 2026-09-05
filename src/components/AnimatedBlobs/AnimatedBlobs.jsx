import './AnimatedBlobs.css'

/**
 * Ambient gradient blobs used behind hero/section content for depth.
 * `variant` lets each section offset the blob positions slightly.
 */
export default function AnimatedBlobs({ variant = 'default' }) {
  return (
    <div className={`blobs blobs-${variant}`} aria-hidden="true">
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />
    </div>
  )
}
