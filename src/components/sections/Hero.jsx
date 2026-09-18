import { createElement } from 'react'
import { ArrowDownRight, ArrowRight, CloudUpload, Code2, GitMerge, Lightbulb, TrendingUp } from 'lucide-react'
import NeuralBackground from '../effects/NeuralBackground'
import { scrollToSection } from '../../utils/scrollToSection'
import './Hero.css'

const capabilities = [
  'Agentic AI Systems',
  'Multi-Agent Orchestration',
  'RAG Pipelines',
  'Responsible AI & Guardrails',
  'Full-Stack Applications',
]

const roadmap = [
  { label: 'Idea', detail: 'Discover the opportunity', icon: Lightbulb },
  { label: 'Build', detail: 'Engineer the solution', icon: Code2 },
  { label: 'Integrate', detail: 'Connect data and systems', icon: GitMerge },
  { label: 'Deploy', detail: 'Ship reliably at scale', icon: CloudUpload },
  { label: 'Impact', detail: 'Create measurable value', icon: TrendingUp },
]

function HeroLink({ children, className, reducedMotion, sectionId }) {
  return (
    <a
      href={`#${sectionId}`}
      className={className}
      onClick={(event) => {
        event.preventDefault()
        scrollToSection(sectionId, reducedMotion)
        window.history.replaceState(null, '', `#${sectionId}`)
      }}
    >
      {children}
    </a>
  )
}

function Hero({ profile, reducedMotion }) {
  const displayName = 'Pranay Babu Thaluri'

  return (
    <section
      id="hero"
      tabIndex={-1}
      className="hero-showcase"
      aria-label="Portfolio hero"
    >
      <div className="hero-showcase__shade" aria-hidden="true" />
      <div className="hero-showcase__neural" aria-hidden="true">
        <NeuralBackground reducedMotion={reducedMotion} />
      </div>
      <div className="hero-showcase__grain" aria-hidden="true" />

      <div
        className="hero-showcase__layout"
      >
        <div className="hero-showcase__content">
          <p className="hero-showcase__name">
            {displayName}
          </p>

          <p className="hero-showcase__principles">
            <span>Engineer</span><i>×</i><span>Innovate</span><i>×</i><span>Build</span>
          </p>

          <h1 className="hero-showcase__title">
            Building intelligent products for a <em>smarter tomorrow.</em>
          </h1>

          <p className="hero-showcase__summary">
            I design, build, and deploy AI-powered applications that solve real-world problems—from intelligent interfaces to scalable cloud systems.
          </p>

          <p className="hero-showcase__role">
            <span aria-hidden="true" />
            Machine Learning Engineer at <strong>Endava</strong>
          </p>

          <div className="hero-showcase__actions">
            <HeroLink className="hero-action hero-action--primary" sectionId="projects" reducedMotion={reducedMotion}>
              Explore my work <ArrowDownRight size={18} />
            </HeroLink>
            <HeroLink className="hero-action hero-action--secondary" sectionId="contact" reducedMotion={reducedMotion}>
              Contact me <ArrowRight size={18} />
            </HeroLink>
          </div>

          <ul className="hero-showcase__capabilities" aria-label="Core capabilities">
            {capabilities.map((capability) => <li key={capability}>{capability}</li>)}
          </ul>
        </div>

        <aside className="hero-roadmap" aria-label="Delivery roadmap">
          <div className="hero-roadmap__heading">
            <span>How I create value</span>
            <h2>From idea to impact</h2>
          </div>
          <div className="hero-roadmap__map">
            <svg className="hero-roadmap__road" viewBox="0 0 420 540" preserveAspectRatio="none" aria-hidden="true">
              <path className="hero-roadmap__road-edge" pathLength="100" d="M70 20 C70 90 350 75 350 145 S70 205 70 275 S350 335 350 410 S70 470 70 525" />
              <path className="hero-roadmap__road-surface" pathLength="100" d="M70 20 C70 90 350 75 350 145 S70 205 70 275 S350 335 350 410 S70 470 70 525" />
              <path className="hero-roadmap__road-center" pathLength="100" d="M70 20 C70 90 350 75 350 145 S70 205 70 275 S350 335 350 410 S70 470 70 525" />
              <path className="hero-roadmap__road-motion" pathLength="100" d="M70 20 C70 90 350 75 350 145 S70 205 70 275 S350 335 350 410 S70 470 70 525" />
            </svg>
            <ol className="hero-roadmap__steps">
              {roadmap.map(({ detail, icon: Icon, label }, index) => (
                <li key={label} style={{ '--roadmap-index': index }}>
                  <span className="hero-roadmap__node">
                    {createElement(Icon, { size: 19, strokeWidth: 1.7, 'aria-hidden': true })}
                  </span>
                  <span className="hero-roadmap__copy">
                    <strong>{label}</strong>
                    <span>{detail}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </aside>
      </div>

    </section>
  )
}

export default Hero

