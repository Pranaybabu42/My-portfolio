import { useRef, useState } from 'react'
import './QuoteSpotlight.css'

const portraitImage = new URL('../../../assets/my-images/Modern vision in grayscale elegance.png', import.meta.url).href
const quoteLines = [
  [
    { text: 'From ' },
    { text: 'circuits to code', accent: true },
    { text: ',' },
  ],
  [{ text: 'from hardware to software,' }],
  [{ text: 'from logic gates to AI agents' }],
  [{ text: 'my journey is not a switch;' }],
  [{ text: 'it is an evolution.' }],
]

function QuoteText({ alternate = false }) {
  return (
    <>
      {quoteLines.map((line, lineIndex) => {
        const visibleParts = line.map((part, partIndex) => {
          if (part.accent && !alternate) {
            return (
              <span key={`${lineIndex}-${partIndex}`} className="quoteSpotlightAccent">
                {part.text}
              </span>
            )
          }

          return <span key={`${lineIndex}-${partIndex}`}>{part.text}</span>
        })

        return (
          <span key={lineIndex} className="quoteSpotlightLine">
            {visibleParts}
          </span>
        )
      })}
    </>
  )
}

function QuoteSpotlight({ reducedMotion }) {
  const textRef = useRef(null)
  const [isHovering, setIsHovering] = useState(false)

  const updatePosition = (event) => {
    const text = textRef.current
    if (!text) return

    const rect = text.getBoundingClientRect()
    text.style.setProperty('--quote-x', `${event.clientX - rect.left}px`)
    text.style.setProperty('--quote-y', `${event.clientY - rect.top}px`)
  }

  return (
    <section id="journey-evolution" className="quoteSpotlightSection" aria-label="Journey evolution quote">
      <div className="quoteSpotlightImage" aria-hidden="true">
        <img src={portraitImage} alt="" loading="lazy" />
      </div>

      <div className="quoteSpotlightShade" aria-hidden="true" />

      <div className="quoteSpotlightInner">
        <p className="quoteSpotlightEyebrow">Evolution</p>

        <div
          ref={textRef}
          className={`quoteSpotlightTextWrap ${isHovering ? 'is-hovering' : ''}`}
          style={{ '--quote-radius': reducedMotion ? '108px' : '136px' }}
          tabIndex={0}
          onMouseEnter={(event) => {
            setIsHovering(true)
            updatePosition(event)
          }}
          onMouseMove={updatePosition}
          onMouseLeave={() => setIsHovering(false)}
          onFocus={() => {
            setIsHovering(true)
            const text = textRef.current
            if (!text) return
            text.style.setProperty('--quote-x', '260px')
            text.style.setProperty('--quote-y', '135px')
          }}
          onBlur={() => setIsHovering(false)}
        >
          <h2 className="quoteSpotlightText">
            <QuoteText />
          </h2>

          <div className="quoteSpotlightReveal" aria-hidden="true">
            <span className="quoteSpotlightDot" />
            <h2 className="quoteSpotlightText quoteSpotlightTextAlt">
              <QuoteText alternate />
            </h2>
          </div>
        </div>
      </div>
    </section>
  )
}

export default QuoteSpotlight
