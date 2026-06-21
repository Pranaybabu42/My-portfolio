import { useEffect, useRef, useState } from 'react'
import './WhatIDo.css'

const planetImage = new URL('../../../assets/Example_Protfolio/planet-1-1.png', import.meta.url).href

function WhatIDo() {
  const sectionRef = useRef(null)
  const [isActive, setIsActive] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(null)

  const items = [
    {
      label: 'Full-Stack',
      shortLabel: 'Stack',
      hoverLabel: 'FS',
      description:
        'I build end-to-end applications with FastAPI, Spring Boot, React.js, microservices, REST APIs, and production-ready integrations.',
    },
    {
      label: 'Machine Learning',
      shortLabel: 'Machine',
      hoverLabel: 'ML',
      description:
        'I create ML workflows from data preparation to model training, evaluation, tuning, and serving models for real product use.',
    },
    {
      label: 'Artificial Intelligence',
      shortLabel: 'AI',
      hoverLabel: 'AI',
      description:
        'I develop GenAI and LLM features with RAG, agents, LangChain, OpenAI APIs, prompt flows, and practical automation.',
    },
    {
      label: 'Deployment',
      shortLabel: 'Deploy',
      hoverLabel: 'DEP',
      description:
        'I ship applications and AI services with CI/CD, containers, cloud deployment, monitoring, and scalable release practices.',
    },
    {
      label: 'Version Control',
      shortLabel: 'Control',
      hoverLabel: 'VC',
      description:
        'I work with Git-based collaboration, branching strategies, pull requests, code reviews, and clean release history.',
    },
  ]

  useEffect(() => {
    const section = sectionRef.current

    if (!section || isActive) {
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsActive(true)
          observer.disconnect()
        }
      },
      { threshold: 0.28 }
    )

    observer.observe(section)

    return () => observer.disconnect()
  }, [isActive])

  return (
    <section
      id="what-i-do"
      ref={sectionRef}
      className={`whatIDoSection${isActive ? ' whatIDoSectionActive' : ''}`}
      style={{ '--what-i-do-bg': `url(${planetImage})` }}
      aria-label="What I do"
    >
      <div className="whatIDoInner">
        <p className="whatIDoKicker">
          <span>WHAT I DO</span>
        </p>
        <div className="whatIDoHeadline" role="heading" aria-level="2">
          {items.map((item, index) => (
            <div
              className={`whatIDoWord${selectedIndex === index ? ' is-selected' : ''}`}
              key={item.label}
              tabIndex={0}
              aria-label={`${item.label}. ${item.description}`}
              onClick={() => setSelectedIndex((current) => (current === index ? null : index))}
            >
              <span className="whatIDoIndex" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="whatIDoWordMark" aria-hidden="true">
                <span className="whatIDoWordText">{item.label}</span>
                <span className="whatIDoWordCode">{item.hoverLabel}</span>
              </span>
              <span className="whatIDoShortLabel" aria-hidden="true">
                {item.shortLabel}
              </span>
              <span className="whatIDoWordTextHover" aria-hidden="true">
                {item.description}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhatIDo
