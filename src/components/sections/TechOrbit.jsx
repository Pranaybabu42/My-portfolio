import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import './TechOrbit.css'


const logo = (file) => `${import.meta.env.BASE_URL}tech-logos/${file}.svg`
const skills = [
  { name: 'OpenAI', image: logo('openai'), x: 15, y: 29, size: 148, tilt: -12, depth: 'near', mx: 13, my: 34 },
  { name: 'Claude', mark: 'claude', x: 77, y: 34, size: 132, tilt: 11, depth: 'near', mx: 72, my: 27 },
  { name: 'Python', image: logo('python'), x: 33, y: 34, size: 87, tilt: 9, depth: 'far', mx: 32, my: 24 },
  { name: 'React', mark: 'react', x: 85, y: 53, size: 124, tilt: -13, depth: 'near', mx: 76, my: 43 },
  { name: 'Spring Boot', image: logo('springboot'), x: 28, y: 53, size: 108, tilt: 13, depth: 'middle', mx: 9, my: 47 },
  { name: 'Redis', image: logo('redis'), x: 65, y: 42, size: 83, tilt: -9, depth: 'far', mx: 65, my: 32 },
  { name: 'AWS', mark: 'aws', x: 72, y: 74, size: 139, tilt: 10, depth: 'near', mx: 69, my: 72 },
  { name: 'Azure', image: logo('microsoftazure'), x: 13, y: 77, size: 104, tilt: -9, depth: 'middle', mx: 8, my: 73 },
  { name: 'Java', image: logo('openjdk'), x: 36, y: 83, size: 81, tilt: 8, depth: 'far', mx: 32, my: 82 },
  { name: 'PostgreSQL', image: logo('postgresql'), x: 89, y: 81, size: 87, tilt: -10, depth: 'far', mx: 77, my: 87 },
]

function TechMark({ mark }) {
  if (mark === 'claude') return <svg viewBox="0 0 64 64" className="tech-orbit__mark tech-orbit__mark--claude" aria-hidden="true">{Array.from({ length: 12 }, (_, i) => <path key={i} d="M32 6 L33.5 24 L31 24 Z" transform={`rotate(${i * 30} 32 32)`} fill="currentColor" />)}<circle cx="32" cy="32" r="8" fill="currentColor" /></svg>
  if (mark === 'react') return <svg viewBox="0 0 80 70" className="tech-orbit__mark tech-orbit__mark--react" aria-hidden="true">{[0, 60, 120].map((angle) => <ellipse key={angle} cx="40" cy="35" rx="35" ry="13" transform={`rotate(${angle} 40 35)`} stroke="currentColor" strokeWidth="2.5" fill="none" />)}<circle cx="40" cy="35" r="5" fill="currentColor" /></svg>
  if (mark === 'aws') return <svg viewBox="0 0 90 65" className="tech-orbit__mark tech-orbit__mark--aws" aria-hidden="true"><text x="45" y="36" textAnchor="middle" fill="currentColor" fontSize="37" fontFamily="Arial, sans-serif">aws</text><path d="M13 46 Q44 66 76 43 M65 43 L77 42 L74 54" fill="none" stroke="#f5a547" strokeWidth="3.5" strokeLinecap="round" /></svg>
  return null
}

const approachPath = 'M-60 530 C120 570 160 320 340 300 C530 275 720 250 850 350 C960 440 860 610 710 570 C550 540 320 650 200 520 C70 365 190 210 350 220 C540 230 680 375 500 470'
const infinityPath = 'M500 470 C405 355 250 340 250 470 C250 600 405 585 500 470 C595 355 750 340 750 470 C750 600 595 585 500 470'
const energyPath = approachPath + infinityPath.replace('M500 470', '')
function EnergyTrail() {
  // Complementary clips split the same stroke at the portrait's depth plane.
  return ['back', 'front'].map((depth) => <div key={depth} className={`tech-orbit__energy tech-orbit__energy--single tech-orbit__energy--${depth}`} aria-hidden="true">
    <svg viewBox="0 0 1000 700" preserveAspectRatio="none" fill="none">
      <path className="tech-orbit__single-line" d={infinityPath} pathLength="100" />
    </svg>
  </div>)
}

export default function TechOrbit({ reducedMotion }) {
  const sectionRef = useRef(null)
  const revealedStep = useRef(0)

  useLayoutEffect(() => {
    const section = sectionRef.current
    const responsive = gsap.matchMedia()
    responsive.add({ mobile: '(max-width: 767px)', tablet: '(min-width: 768px) and (max-width: 1100px)', desktop: '(min-width: 1101px)' }, ({ conditions }) => {
      if (reducedMotion) {
        section.classList.add('tech-orbit--still')
        const finish = () => {
          revealedStep.current = 3
          section.dataset.step = '3'
          window.dispatchEvent(new Event('universe:complete'))
        }
        window.addEventListener('universe:advance', finish)
        if (document.documentElement.dataset.entryStage === 'universe') finish()
        return () => {
          window.removeEventListener('universe:advance', finish)
          section.classList.remove('tech-orbit--still')
        }
      }
      const movement = conditions.mobile ? 0.4 : conditions.tablet ? 0.65 : 1
      const cards = gsap.utils.toArray('.tech-orbit__skill')
      // Each gesture plays exactly one paused segment; page distance does not scrub it.
      const timeline = gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } })
      timeline.fromTo('.tech-orbit__heading > *',
        { autoAlpha: 0, y: 50 * movement },
        { autoAlpha: 1, y: 0, duration: 0.65, stagger: 0.1 }, 0)
      const order = ['OpenAI', 'Python', 'Claude', 'Spring Boot', 'Redis', 'React', 'Azure', 'Java', 'AWS', 'PostgreSQL']
      const visibleOrder = order.filter((name) => !conditions.mobile || !['Redis', 'Java', 'PostgreSQL'].includes(name))
      cards.forEach((card, index) => {
        const rank = visibleOrder.indexOf(skills[index].name)
        if (rank < 0) return
        const brightness = skills[index].depth === 'far' ? 0.72 : 1
        gsap.set(card, { filter: brightness === 1 ? 'none' : `brightness(${brightness})` })
        timeline.fromTo(card,
          { autoAlpha: 0, y: 35 * movement, scale: 0.8, rotation: index % 2 ? 4 : -4 },
          { autoAlpha: 1, y: 0, scale: 1, rotation: 0, duration: 0.55 }, 0.85 + rank * 0.055)
      })
      timeline.fromTo('.tech-orbit__fragments', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6 }, 0.85)
      timeline.fromTo('.tech-orbit__portrait',
        { autoAlpha: 0, y: 100 * movement, scale: 0.94 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 1.3 }, 1.9)
      timeline.fromTo('.tech-orbit__energy', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.18 }, 2.05)
      // One brief pair of lightning streaks accompanies the portrait; no idle flashes.
      timeline.fromTo('.tech-orbit__thunder',
        { autoAlpha: 0, strokeDashoffset: 100 },
        { autoAlpha: 1, strokeDashoffset: 0, duration: 0.18, ease: 'power2.out' }, 1.98)
      timeline.to('.tech-orbit__thunder', { autoAlpha: 0, duration: 0.42 }, 2.16)
      // Move one dash along an open approach, then extend its head around infinity.
      // The tail stops exactly at the join, leaving no approach line in the final scene.
      const measure = section.querySelector('.tech-orbit__single-line').cloneNode()
      measure.setAttribute('d', approachPath)
      // Hidden SVG geometry can throw in older Edge builds. A stable fallback
      // keeps the timeline alive; the visual path still draws normally.
      let approachLength = 1000
      try {
        const measured = measure.getTotalLength()
        if (Number.isFinite(measured) && measured > 0) approachLength = measured
      } catch {
        // Use the deterministic fallback above.
      }
      measure.setAttribute('d', energyPath)
      let totalLength = approachLength * 2
      try {
        const measured = measure.getTotalLength()
        if (Number.isFinite(measured) && measured > 0) totalLength = measured
      } catch {
        // Use the deterministic fallback above.
      }
      const join = Math.min(85, Math.max(15, approachLength / totalLength * 100))
      timeline.fromTo('.tech-orbit__single-line',
        { attr: { d: energyPath }, strokeDasharray: '8 100', strokeDashoffset: 8, filter: 'drop-shadow(0 0 5px rgba(240, 138, 104, 1)) drop-shadow(0 0 14px rgba(240, 138, 104, 0.85))' },
        { strokeDashoffset: -(join - 8), autoRound: false, duration: 0.85, ease: 'power2.inOut' }, 2.05)
      timeline.to('.tech-orbit__single-line',
        { strokeDasharray: `${100 - join} 100`, strokeDashoffset: -join, autoRound: false, duration: 0.4, ease: 'power1.inOut' }, 2.9)
      // Once drawn, use the closed infinity directly: no normalized dash seam.
      timeline.set('.tech-orbit__single-line', { attr: { d: infinityPath }, strokeDasharray: 'none', strokeDashoffset: 0 }, 3.3)
      timeline.to('.tech-orbit__energy', { autoAlpha: 0.9, duration: 0.2 }, 3.3)
      timeline.to('.tech-orbit__single-line', { filter: 'drop-shadow(0 0 4px rgba(240, 138, 104, 0.8)) drop-shadow(0 0 6px rgba(240, 138, 104, 0))', duration: 0.2 }, 3.3)
      timeline.fromTo('.tech-orbit__footer, .tech-orbit__side-note', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.35 }, 3.15)

      const stops = [0, 0.85, 1.9, 3.5]
      let step = revealedStep.current
      let busy = false
      let transition
      const setIdleMotion = () => {
        cards.forEach((card) => card.classList.toggle('is-floating', step >= 2))
        section.classList.toggle('is-energized', step === 3)
        section.dataset.step = String(step)
      }
      timeline.pause(stops[step])
      setIdleMotion()
      const advance = () => {
        if (busy || step === 3) return
        busy = true
        transition = timeline.tweenTo(stops[step + 1], {
          ease: 'none',
          onComplete: () => {
            step += 1
            revealedStep.current = step
            busy = false
            setIdleMotion()
            if (step === 3) window.dispatchEvent(new Event('universe:complete'))
          },
        })
      }
      window.addEventListener('universe:advance', advance)
      const media = gsap.matchMedia()
      media.add('(min-width: 768px) and (hover: hover) and (pointer: fine)', () => {
        const portrait = section.querySelector('.tech-orbit__portrait-parallax')
        const portraitX = gsap.quickTo(portrait, 'x', { duration: 1.2, ease: 'power3.out' })
        const portraitY = gsap.quickTo(portrait, 'y', { duration: 1.2, ease: 'power3.out' })
        const move = (event) => {
          const bounds = section.querySelector('.tech-orbit__stage').getBoundingClientRect()
          portraitX(((event.clientX - bounds.left) / bounds.width - 0.5) * 12 * movement)
          portraitY(((event.clientY - bounds.top) / bounds.height - 0.5) * 8 * movement)
        }
        const leave = () => { portraitX(0); portraitY(0) }
        section.addEventListener('pointermove', move)
        section.addEventListener('pointerleave', leave)
        const cleanups = cards.map((card) => {
          const surface = card.querySelector('.tech-orbit__surface')
          const rx = gsap.quickTo(surface, 'rotationX', { duration: 0.7 })
          const ry = gsap.quickTo(surface, 'rotationY', { duration: 0.7 })
          const tilt = (event) => {
            const bounds = card.getBoundingClientRect()
            rx(-((event.clientY - bounds.top) / bounds.height - 0.5) * 18)
            ry(((event.clientX - bounds.left) / bounds.width - 0.5) * 20)
          }
          const reset = () => { rx(0); ry(0) }
          card.addEventListener('pointermove', tilt)
          card.addEventListener('pointerleave', reset)
          return () => { card.removeEventListener('pointermove', tilt); card.removeEventListener('pointerleave', reset) }
        })
        return () => {
          section.removeEventListener('pointermove', move)
          section.removeEventListener('pointerleave', leave)
          cleanups.forEach((cleanup) => cleanup())
        }
      })
      return () => {
        transition?.kill()
        window.removeEventListener('universe:advance', advance)
        delete section.dataset.step
        media.revert()
        cards.forEach((card) => card.classList.remove('is-floating'))
        section.classList.remove('is-energized')
      }
    }, section)
    const observer = new IntersectionObserver(([entry]) => section.classList.toggle('is-in-view', entry.isIntersecting))
    observer.observe(section.querySelector('.tech-orbit__stage'))
    return () => { observer.disconnect(); responsive.revert(); section.classList.remove('is-in-view', 'is-energized') }
  }, [reducedMotion])

  return <section id="tech-universe" ref={sectionRef} className={`tech-orbit${reducedMotion ? ' tech-orbit--still' : ''}`}>
    <div className="tech-orbit__stage">
      <div className="tech-orbit__atmosphere" aria-hidden="true" />
      <header className="tech-orbit__heading">
        <p>THE ENGINEERING UNIVERSE</p>
        <small className="tech-orbit__scroll-cue">Scroll to explore <b aria-hidden="true">↓</b></small>
      </header>
      <div className="tech-orbit__scene">
        <div className="tech-orbit__portrait">
          <div className="tech-orbit__portrait-parallax"><img src={`${import.meta.env.BASE_URL}tech-universe-portrait.png`} alt="Pranay, in a black suit, looking upward into his technology universe" width="1024" height="1536" decoding="async" /></div>
        </div>
        <EnergyTrail />
        <svg className="tech-orbit__thunder" viewBox="0 0 1000 700" preserveAspectRatio="none" fill="none" aria-hidden="true">
          <path pathLength="100" d="M170 410 L275 365 L252 399 L366 343 L344 382 L432 348" />
          <path pathLength="100" d="M826 351 L742 391 L758 361 L668 416 L688 379 L592 428" />
        </svg>
        <ul className="tech-orbit__skills" aria-label="My engineering ecosystem">
          {skills.map((skill, index) => <li key={skill.name} className={`tech-orbit__skill tech-orbit__skill--${skill.depth}`} style={{ '--x': `${skill.x}%`, '--y': `${skill.y}%`, '--mx': `${skill.mx}%`, '--my': `${skill.my}%`, '--size': `${skill.size}px`, '--tilt': `${skill.tilt}deg`, '--delay': `${-index * 0.71}s` }}>
            <div className="tech-orbit__depth"><div className="tech-orbit__float"><div className="tech-orbit__tile"><div className="tech-orbit__surface">
              {skill.image ? <img src={skill.image} alt="" width="72" height="72" /> : <TechMark mark={skill.mark} />}
              <strong>{skill.name}</strong>
              <span className="tech-orbit__tile-edge" aria-hidden="true" />
            </div></div></div></div>
          </li>)}
        </ul>
        <div className="tech-orbit__fragments" aria-hidden="true">{Array.from({ length: 12 }, (_, i) => <i key={i} style={{ '--fx': `${(i * 29 + 7) % 96}%`, '--fy': `${(i * 17 + 13) % 91}%`, '--angle': `${i * 37}deg`, '--delay': `${-i}s` }} />)}</div>
      </div>
      <div className="tech-orbit__side-note" aria-hidden="true">BUILT ON CURIOSITY<br />CONNECTED BY CODE</div>
      <footer className="tech-orbit__footer">
        <span>IDEAS INTO INTELLIGENCE.</span>
        <a href="#hero">Keep exploring <span aria-hidden="true">↘</span></a>
      </footer>
    </div>
  </section>
}










