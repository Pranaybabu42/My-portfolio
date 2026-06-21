import { useEffect, useMemo } from 'react'

function SplitText({
  text = '',
  className = '',
  delay = 50,
  duration = 1.25,
  splitType = 'chars',
  from,
  to,
  textAlign = 'left',
  onLetterAnimationComplete,
}) {
  const units = useMemo(() => {
    if (splitType === 'words') {
      return text.split(' ').flatMap((word, index, array) => (index < array.length - 1 ? [word, ' '] : [word]))
    }

    return Array.from(text)
  }, [splitType, text])

  useEffect(() => {
    if (!units.length || typeof onLetterAnimationComplete !== 'function') {
      return undefined
    }

    const totalDelay = Math.max(units.length - 1, 0) * delay + duration * 1000
    const timer = window.setTimeout(() => {
      onLetterAnimationComplete()
    }, totalDelay)

    return () => window.clearTimeout(timer)
  }, [delay, duration, onLetterAnimationComplete, units.length])

  return (
    <div className={className} style={{ textAlign }}>
      {units.map((unit, index) => (
        <span
          key={`${unit}-${index}`}
          aria-hidden="true"
          style={{
            display: 'inline-block',
            whiteSpace: unit === ' ' ? 'pre' : 'normal',
            opacity: to?.opacity ?? 1,
            transform: `translateY(${to?.y ?? 0}px)`,
            animationName: 'split-text-rise',
            animationDuration: `${duration}s`,
            animationDelay: `${index * delay}ms`,
            animationTimingFunction: 'ease-out',
            animationFillMode: 'backwards',
            '--split-text-from-opacity': from?.opacity ?? 0,
            '--split-text-from-y': `${from?.y ?? 24}px`,
          }}
        >
          {unit}
        </span>
      ))}
    </div>
  )
}

export default SplitText
