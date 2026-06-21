import { useEffect, useRef, useState } from 'react'
import { useInViewAnimation } from '../../hooks/useInViewAnimation'
import './About.css'

function About() {
  const headlineRef = useRef(null)
  const introText = "I'm a "
  const accentText = 'selectively skilled'
  const outroText = ' product on AI engineer with strong focus producing high quality & impactful digital experience.'
  const fullHeadline = `${introText}${accentText}${outroText}`

  const { ref, isInView } = useInViewAnimation({ threshold: 0.45, rootMargin: '0px', once: false })
  const [visibleChars, setVisibleChars] = useState(0)
  const [hasStartedTyping, setHasStartedTyping] = useState(false)
  const [hasCompletedTyping, setHasCompletedTyping] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    if (!isInView || hasCompletedTyping) return undefined

    const timeoutId = window.setTimeout(() => {
      setHasStartedTyping(true)
      setVisibleChars(0)
    }, 0)

    return () => window.clearTimeout(timeoutId)
  }, [hasCompletedTyping, isInView])

  useEffect(() => {
    if (!hasStartedTyping || visibleChars >= fullHeadline.length) return undefined

    const timeoutId = window.setTimeout(() => {
      setVisibleChars((prev) => Math.min(prev + 3, fullHeadline.length))
    }, 18)

    return () => window.clearTimeout(timeoutId)
  }, [fullHeadline.length, hasStartedTyping, visibleChars])

  useEffect(() => {
    if (!hasStartedTyping || visibleChars < fullHeadline.length) return undefined

    const timeoutId = window.setTimeout(() => {
      setHasStartedTyping(false)
      setHasCompletedTyping(true)
    }, 0)

    return () => window.clearTimeout(timeoutId)
  }, [fullHeadline.length, hasStartedTyping, visibleChars])

  const typedText = fullHeadline.slice(0, hasCompletedTyping ? fullHeadline.length : visibleChars)
  const shownIntro = typedText.slice(0, introText.length)
  const shownAccent = typedText.slice(introText.length, introText.length + accentText.length)
  const shownOutro = typedText.slice(introText.length + accentText.length)
  const isTyping = hasStartedTyping && visibleChars < fullHeadline.length

  const updateHoverPosition = (event) => {
    const headline = headlineRef.current
    if (!headline) return

    const rect = headline.getBoundingClientRect()
    headline.style.setProperty('--about-x', `${event.clientX - rect.left}px`)
    headline.style.setProperty('--about-y', `${event.clientY - rect.top}px`)
  }

  const renderHeadline = ({ alternate = false } = {}) => (
    <>
      {shownIntro}
      {shownAccent ? <span className={alternate ? undefined : 'aboutHeroAccent'}>{shownAccent}</span> : null}
      {shownOutro}
      {isTyping && !alternate ? <span className="aboutTypingCaret" aria-hidden="true" /> : null}
    </>
  )

  return (
    <section id="about" className="aboutHeroSection">
      <div className="aboutSafeRight" ref={ref}>
        <div className="aboutHero">
          <p className="aboutHeroKicker">ABOUT ME</p>

          <div
            ref={headlineRef}
            className={`aboutHeroHeadlineWrap ${isHovering ? 'is-hovering' : ''}`}
            tabIndex={0}
            onMouseEnter={(event) => {
              setIsHovering(true)
              updateHoverPosition(event)
            }}
            onMouseMove={updateHoverPosition}
            onMouseLeave={() => setIsHovering(false)}
            onFocus={() => {
              setIsHovering(true)
              const headline = headlineRef.current
              if (!headline) return
              headline.style.setProperty('--about-x', '280px')
              headline.style.setProperty('--about-y', '145px')
            }}
            onBlur={() => setIsHovering(false)}
          >
            <h2 className="aboutHeroHeadline" aria-label={fullHeadline}>
              {renderHeadline()}
            </h2>

            <div className="aboutHeroReveal" aria-hidden="true">
              <span className="aboutHeroRevealDot" />
              <h2 className="aboutHeroHeadline aboutHeroHeadlineAlt">
                {renderHeadline({ alternate: true })}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
