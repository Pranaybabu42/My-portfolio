import { createElement } from 'react'
import { motion } from 'framer-motion' // eslint-disable-line no-unused-vars
import {
  BrainCircuit,
  Code2,
  Database,
  Layers3,
  MapPin,
  Network,
  Rocket,
  Sparkles,
  Workflow,
} from 'lucide-react'
import NeuralBackground from '../effects/NeuralBackground'
import './Hero.css'

const heroBackgroundImage = new URL('../../../assets/my-images/Pranay_sketch.png', import.meta.url).href


const roleCards = [
  { label: 'Fullstack Engineer', icon: Code2 },
  { label: 'AI Engineering', icon: BrainCircuit },
  { label: 'Problem Solver', icon: Layers3 },
  { label: 'Always Learning', icon: Rocket },
]

const topMeta = [
  { label: 'Fullstack Engineer', icon: Code2 },
  { label: 'AI Engineering', icon: BrainCircuit },
  { label: 'Based in Bengaluru', icon: MapPin },
]

const techStack = [
  { label: 'Java', icon: Code2 },
  { label: 'Python', icon: Code2 },
  { label: 'Spring Boot', icon: Layers3 },
  { label: 'FastAPI', icon: Workflow },
  { label: 'TensorFlow', icon: BrainCircuit },
  { label: 'PyTorch', icon: BrainCircuit },
  { label: 'LangChain', icon: Network },
  { label: 'OpenAI', icon: Sparkles },
  { label: 'PostgreSQL', icon: Database },
]

const item = {
  hidden: { opacity: 0, y: 24 },
  show: (reducedMotion) => ({
    opacity: 1,
    y: 0,
    transition: { duration: reducedMotion ? 0 : 0.55, ease: 'easeOut' },
  }),
}

function Hero({ profile, reducedMotion }) {
  const nameParts = String(profile?.name ?? 'Pranay Thalluri').split(' ').filter(Boolean)
  const firstName = nameParts[0] ?? 'Pranay'
  const displayLastName = nameParts.slice(1).join(' ').replace(/^Babu\s*/i, '') || 'Thalluri'
  const location = profile?.location ?? 'India'
  const city = location.split(',')[0] || location

  return (
    <section
      id="hero"
      className="hero-showcase position-relative overflow-hidden"
      aria-label="Portfolio hero"
      style={{ '--hero-bg-image': `url("${heroBackgroundImage}")` }}
    >
      <div className="hero-showcase__shade" aria-hidden="true" />
      <div className="hero-showcase__neural" aria-hidden="true">
        <NeuralBackground reducedMotion={reducedMotion} />
      </div>
      <div className="hero-showcase__grain" aria-hidden="true" />

      <div className="hero-showcase__topbar" aria-hidden="true">
        {topMeta.map(({ label, icon }) => (
          <span className="hero-showcase__topbar-item" key={label}>
            {createElement(icon, { size: 18, strokeWidth: 1.45 })}
            {label === 'Based in India' ? `Based in ${city}` : label}
          </span>
        ))}
      </div>

      <motion.div
        className="hero-showcase__content position-relative z-1"
        initial={reducedMotion ? false : 'hidden'}
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: reducedMotion ? 0 : 0.12 } },
        }}
      >
        <motion.p custom={reducedMotion} variants={item} className="hero-showcase__eyebrow">
          Hi, I'm
        </motion.p>

        <motion.h1 custom={reducedMotion} variants={item} className="hero-showcase__title">
          <span>{firstName}</span>
          <span>{displayLastName}</span>
        </motion.h1>

        <motion.p custom={reducedMotion} variants={item} className="hero-showcase__summary">
          Building intelligent, scalable, and impactful digital experiences.
        </motion.p>

        <motion.div custom={reducedMotion} variants={item} className="hero-showcase__roles">
          {roleCards.map(({ label, icon }) => (
            <span className="hero-showcase__role" key={label}>
              {createElement(icon, { size: 27, strokeWidth: 1.45, 'aria-hidden': true })}
              {label}
            </span>
          ))}
        </motion.div>

      </motion.div>

      <aside className="hero-showcase__stack" aria-label="Technology stack">
        <p>I build with</p>
        <div className="hero-showcase__stack-rule" aria-hidden="true" />
        <div className="hero-showcase__tech-grid">
          {techStack.map(({ label, icon }) => (
            <span className="hero-showcase__tech" key={label}>
              {createElement(icon, { size: 26, strokeWidth: 1.5, 'aria-hidden': true })}
              <span>{label}</span>
            </span>
          ))}
        </div>
      </aside>

      <motion.div
        custom={reducedMotion}
        variants={item}
        className="hero-showcase__code-wrap hero-showcase__code-wrap--floating"
      >
        <pre className="hero-showcase__code" aria-label="Builder values">
{`const builder = {
  passion: "Code",
  focus: ["AI", "System Design", "User Impact"],
  goal: "Build products that make a difference"
};`}
        </pre>
      </motion.div>

      <div className="hero-showcase__scroll" aria-hidden="true">
        <span>Scroll to explore</span>
        <i />
      </div>

      <p className="hero-showcase__future">Let's build the future.</p>
    </section>
  )
}

export default Hero
