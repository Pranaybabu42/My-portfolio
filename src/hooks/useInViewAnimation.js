import { useEffect, useRef, useState } from 'react'

export function useInViewAnimation(options = {}) {
  const { threshold = 0.25, rootMargin = '0px 0px -10% 0px', once = true } = options
  const ref = useRef(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined

    let frame = 0
    const checkPosition = () => {
      frame = 0
      const rect = node.getBoundingClientRect()
      const visible = rect.top < window.innerHeight * (1 - 0.1)
        && rect.bottom > window.innerHeight * 0.12
      if (visible) {
        setIsInView(true)
        if (once) window.removeEventListener('scroll', scheduleCheck)
      } else if (!once) {
        setIsInView(false)
      }
    }
    const scheduleCheck = () => {
      if (!frame) frame = window.requestAnimationFrame(checkPosition)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          if (once) observer.unobserve(node)
        } else if (!once) {
          setIsInView(false)
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(node)
    // IntersectionObserver is normally sufficient, but this position check
    // keeps scroll reveals working in Edge when an observer misses a layout
    // update after a sticky scene or viewport resize.
    window.addEventListener('scroll', scheduleCheck, { passive: true })
    window.addEventListener('resize', scheduleCheck, { passive: true })
    scheduleCheck()
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', scheduleCheck)
      window.removeEventListener('resize', scheduleCheck)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [threshold, rootMargin, once])

  return { ref, isInView }
}
