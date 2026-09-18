import { useRef, useState } from 'react'
import './About.css'

const introText = "I'm a "
const accentText = 'selectively skilled'
const firstQuoteOutro = ' Full Stack AI Engineer with a strong focus on building high-quality, impactful digital experiences.'
const firstQuote = `${introText}${accentText}${firstQuoteOutro}`

function About() {
  const headlineRef = useRef(null)
  const [isHovering, setIsHovering] = useState(false)

  const updateLensPosition = (event) => {
    const headline = headlineRef.current
    if (!headline) return

    const rect = headline.getBoundingClientRect()
    headline.style.setProperty('--about-x', `${event.clientX - rect.left}px`)
    headline.style.setProperty('--about-y', `${event.clientY - rect.top}px`)
  }

  const renderQuote = (alternate = false) => (
    <>
      {introText}
      <span className={alternate ? undefined : 'aboutHeroAccent'}>{accentText}</span>
      {firstQuoteOutro}
    </>
  )

  return (
    <section id="about" className="aboutHeroSection">
      <div className="aboutSafeRight">
        <div className="aboutHero">
          <p className="aboutHeroKicker">ABOUT ME</p>

          <div
            ref={headlineRef}
            className={`aboutHeroHeadlineWrap ${isHovering ? 'is-hovering' : ''}`}
            tabIndex={0}
            onPointerEnter={(event) => {
              setIsHovering(true)
              updateLensPosition(event)
            }}
            onPointerMove={updateLensPosition}
            onPointerLeave={() => setIsHovering(false)}
            onFocus={() => {
              setIsHovering(true)
              const headline = headlineRef.current
              if (!headline) return
              headline.style.setProperty('--about-x', '50%')
              headline.style.setProperty('--about-y', '50%')
            }}
            onBlur={() => setIsHovering(false)}
            aria-label={firstQuote}
          >
            <h2 className="aboutHeroHeadline">
              {renderQuote()}
            </h2>

            <div className="aboutHeroReveal" aria-hidden="true">
              <span className="aboutHeroRevealDot" />
              <h2 className="aboutHeroHeadline aboutHeroHeadlineAlt">
                {renderQuote(true)}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
