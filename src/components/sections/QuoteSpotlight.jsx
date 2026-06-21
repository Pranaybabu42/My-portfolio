import { useEffect, useRef, useState } from 'react'
import { useInViewAnimation } from '../../hooks/useInViewAnimation'
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
const quoteLineTexts = quoteLines.map((line) => line.map((part) => part.text).join(''))
const quoteText = quoteLineTexts.join('')
const quoteLineMeta = quoteLines.map((parts, index) => {
  const start = quoteLineTexts.slice(0, index).join('').length
  return {
    parts,
    start,
    end: start + quoteLineTexts[index].length,
  }
})

function QuoteText({ alternate = false, visibleChars = quoteText.length, showCaret = false }) {
  return (
    <>
      {quoteLineMeta.map((line, lineIndex) => {
        const visibleInLine = Math.max(0, Math.min(visibleChars - line.start, line.end - line.start))
        const caretBelongsHere =
          showCaret &&
          visibleChars >= line.start &&
          (visibleChars < line.end || (visibleChars === quoteText.length && lineIndex === quoteLineMeta.length - 1))

        const visibleParts = line.parts.map((part, partIndex) => {
          const partStart = line.parts.slice(0, partIndex).map((item) => item.text).join('').length
          const visibleText = part.text.slice(0, Math.max(0, Math.min(visibleInLine - partStart, part.text.length)))

          if (!visibleText) return null
          if (part.accent && !alternate) {
            return (
              <span key={`${lineIndex}-${partIndex}`} className="quoteSpotlightAccent">
                {visibleText}
              </span>
            )
          }

          return <span key={`${lineIndex}-${partIndex}`}>{visibleText}</span>
        })

        return (
          <span key={lineIndex} className="quoteSpotlightLine">
            {visibleParts}
            {caretBelongsHere ? <span className="quoteSpotlightCaret" aria-hidden="true" /> : null}
          </span>
        )
      })}
    </>
  )
}

function QuoteSpotlight({ reducedMotion }) {
  const textRef = useRef(null)
  const { ref: inViewRef, isInView } = useInViewAnimation({ threshold: 0.35, rootMargin: '0px', once: false })
  const [isHovering, setIsHovering] = useState(false)
  const [visibleChars, setVisibleChars] = useState(0)
  const [hasStartedTyping, setHasStartedTyping] = useState(false)
  const [hasCompletedTyping, setHasCompletedTyping] = useState(false)
  const visibleQuoteChars = reducedMotion || hasCompletedTyping ? quoteText.length : visibleChars

  useEffect(() => {
    if (reducedMotion || !isInView || hasCompletedTyping) return undefined

    const timeoutId = window.setTimeout(() => {
      setHasStartedTyping(true)
      setVisibleChars(0)
    }, 0)

    return () => window.clearTimeout(timeoutId)
  }, [hasCompletedTyping, isInView, reducedMotion])

  useEffect(() => {
    if (reducedMotion || !hasStartedTyping || visibleChars >= quoteText.length) return undefined

    const timeoutId = window.setTimeout(() => {
      setVisibleChars((prev) => Math.min(prev + 1, quoteText.length))
    }, 24)

    return () => window.clearTimeout(timeoutId)
  }, [hasStartedTyping, reducedMotion, visibleChars])

  useEffect(() => {
    if (reducedMotion || !hasStartedTyping || visibleChars < quoteText.length) return undefined

    const timeoutId = window.setTimeout(() => {
      setHasStartedTyping(false)
      setHasCompletedTyping(true)
    }, 0)

    return () => window.clearTimeout(timeoutId)
  }, [hasStartedTyping, reducedMotion, visibleChars])

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

      <div ref={inViewRef} className="quoteSpotlightInner">
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
            <QuoteText visibleChars={visibleQuoteChars} showCaret={hasStartedTyping && visibleQuoteChars < quoteText.length} />
          </h2>

          <div className="quoteSpotlightReveal" aria-hidden="true">
            <span className="quoteSpotlightDot" />
            <h2 className="quoteSpotlightText quoteSpotlightTextAlt">
              <QuoteText alternate visibleChars={visibleQuoteChars} />
            </h2>
          </div>
        </div>
      </div>
    </section>
  )
}

export default QuoteSpotlight
