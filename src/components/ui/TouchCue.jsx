import { MousePointerClick } from 'lucide-react'

function TouchCue({ label = 'Tap to interact', className = '' }) {
  return (
    <div className={`mobile-touch-cue ${className}`} aria-hidden="true">
      <span className="mobile-touch-cue__pointer">
        <MousePointerClick size={18} strokeWidth={2.1} />
      </span>
      <span className="mobile-touch-cue__label">{label}</span>
    </div>
  )
}

export default TouchCue
