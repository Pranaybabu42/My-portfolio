import { useLayoutEffect, useMemo, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './History.css'

gsap.registerPlugin(ScrollTrigger)
const curve = 'M300 190 C650 340 1050 430 1360 400'
const photoRegions = ['195 220 210 145', '415 295 205 155', '652 348 195 150', '858 385 220 180', '1345 423 285 225']
const referenceImage = `${import.meta.env.BASE_URL}history-reference.png`

const startYear = (period = '') => Number(period.match(/\d{4}/)?.[0] ?? 0)

function History({ profile, reducedMotion }) {
  const sectionRef = useRef(null)
  const rows = useMemo(() => [
    ...profile.education.map(item => ({ year: startYear(item.period), marker: String(startYear(item.period)), title: item.degree, place: item.institution.replace(/,\s*$/, ''), period: item.period, type: 'EDUCATION' })),
    ...profile.experience.map(item => ({ year: startYear(item.period), marker: /present/i.test(item.period) ? 'NOW' : String(startYear(item.period)), title: item.role, place: item.company, period: item.period, type: /present/i.test(item.period) ? 'CURRENT ROLE' : 'EXPERIENCE' })),
  ].sort((a, b) => a.year - b.year), [profile])

  useLayoutEffect(() => {
    const section = sectionRef.current
    const media = gsap.matchMedia()
    const context = gsap.context(() => {
      media.add({ reduce: '(prefers-reduced-motion: reduce)', mobile: '(max-width: 767px)', desktop: '(min-width: 768px)' }, ({ conditions }) => {
        if (reducedMotion || conditions.reduce) {
          section.classList.add('historyJourney--still')
          return () => section.classList.remove('historyJourney--still')
        }
        const stage = section.querySelector('.historyJourney__stage')
        const camera = section.querySelector('.historyJourney__camera')
        const path = section.querySelector('.historyJourney__track')
        const activePath = section.querySelector('.historyJourney__completed')
        const minuteHand = section.querySelector('.historyJourney__hand--minute')
        const hourHand = section.querySelector('.historyJourney__hand--hour')
        const stops = gsap.utils.toArray('.historyJourney__stop')
        const cards = gsap.utils.toArray('.historyJourney__card')
        const years = gsap.utils.toArray('.historyJourney__year')
        const counter = section.querySelector('.historyJourney__counter')
        const length = path.getTotalLength()
        const points = rows.map((_, i) => path.getPointAtLength(length * i / (rows.length - 1)))
        stops.forEach((stop, i) => gsap.set(stop, { left: `${points[i].x / 16}%`, top: `${points[i].y / 8.5}%` }))
        gsap.set(activePath, { strokeDasharray: length, strokeDashoffset: length })
        const progress = { value: 0 }
        let lastActive = -1
        let cameraWidth = camera.clientWidth
        let stageWidth = stage.clientWidth
        gsap.set(camera, { x: 0 })
        const setCameraX = gsap.quickSetter(camera, 'x', 'px')
        const cardSetters = cards.map((card, i) => {
          gsap.set(card, { rotation: conditions.mobile ? 0 : 9 - i * 2.5, filter: 'none', opacity: 1, scale: 1, y: 0, borderColor: 'rgba(240,138,104,0.45)' })
          gsap.set(years[i], { color: '#ffbc89', opacity: 1, scale: 1 })
          return {
            opacity: gsap.quickSetter(card, 'opacity'),
            scale: gsap.quickSetter(card, 'scale'),
            y: gsap.quickSetter(card, 'y', 'px'),
            border: gsap.quickSetter(card, 'borderColor'),
            yearOpacity: gsap.quickSetter(years[i], 'opacity'),
            yearScale: gsap.quickSetter(years[i], 'scale'),
          }
        })
        const render = () => {
          // Hold the opening and final cards before entering / leaving the journey.
          const travel = gsap.utils.clamp(0, 1, (progress.value - 0.12) / 0.76)
          const position = travel * (rows.length - 1)
          // The clock is the timeline cursor: the minute hand makes a broad
          // sweep while the hour hand advances more slowly through the years.
          // SVG rotations use the same viewBox center as the dial and hub.
          // CSS pixel origins would be offset from each hand's own bounds.
          minuteHand.setAttribute('transform', `rotate(${-42 + travel * 294} 250 250)`)
          hourHand.setAttribute('transform', `rotate(${48 + travel * 78} 250 250)`)
          activePath.style.strokeDashoffset = String(length * (1 - travel))
          if (conditions.mobile) {
            const point = path.getPointAtLength(length * travel)
            setCameraX(stageWidth * 0.5 - point.x / 1600 * cameraWidth)
          }
          cardSetters.forEach((set, i) => {
            const proximity = Math.max(0, 1 - Math.abs(position - i))
            const past = i < position
            set.opacity((past ? 0.82 : 0.78) + proximity * (past ? 0.18 : 0.22))
            set.scale(0.96 + proximity * 0.04)
            set.y(8 * (1 - proximity))
            set.border(`rgba(240,138,104,${0.45 + proximity * 0.4})`)
            set.yearOpacity(0.8 + proximity * 0.2)
            set.yearScale(1 + proximity * 0.08)
          })
          const active = Math.round(position)
          if (active !== lastActive) {
            lastActive = active
            section.dataset.activeYear = rows[active].marker
            counter.textContent = `${String(active + 1).padStart(2, '0')} / ${String(rows.length).padStart(2, '0')}`
            cards.forEach((card, i) => {
              card.classList.toggle('is-active', i === active)
              if (i === active) card.setAttribute('aria-current', 'step')
              else card.removeAttribute('aria-current')
            })
          }
        }
        const animation = gsap.to(progress, { value: 1, ease: 'none', onUpdate: render,
          scrollTrigger: {
            trigger: section, start: 'top top', end: () => `+=${window.innerHeight * 4}`,
            pin: stage, pinSpacing: true, scrub: 0.65, anticipatePin: 1, invalidateOnRefresh: true,
            onRefresh: () => { cameraWidth = camera.clientWidth; stageWidth = stage.clientWidth; render() },
          },
        })
        const trigger = animation.scrollTrigger
        render()
        // Bound oversized wheel deltas at the journey, preserving continuous
        // scrolling while preventing a single impulse from skipping the pin.
        const guardWheel = (event) => {
          if (event.ctrlKey || document.documentElement.dataset.entryStage !== 'page') return
          const delta = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1)
          const current = window.scrollY
          const next = current + delta
          const enters = delta > 0 && current < trigger.start && next >= trigger.start
          const inside = current >= trigger.start && current <= trigger.end
          if (!enters && !inside) return
          const limit = window.innerHeight * 0.45
          if (enters || Math.abs(delta) > limit) {
            event.preventDefault()
            const base = enters ? trigger.start : current
            window.scrollTo({ top: base + gsap.utils.clamp(-limit, limit, delta), behavior: 'instant' })
          }
        }
        const focusCard = event => {
          const index = cards.indexOf(event.target.closest('.historyJourney__card'))
          if (index < 0) return
          const fraction = 0.12 + index / (rows.length - 1) * 0.76
          window.scrollTo({ top: trigger.start + (trigger.end - trigger.start) * fraction, behavior: 'instant' })
        }
        window.addEventListener('wheel', guardWheel, { passive: false, capture: true })
        section.addEventListener('focusin', focusCard)
        return () => {
          window.removeEventListener('wheel', guardWheel, true)
          section.removeEventListener('focusin', focusCard)
          delete section.dataset.activeYear
          minuteHand.removeAttribute('transform')
          hourHand.removeAttribute('transform')
        }
      })
    }, section)
    return () => { media.revert(); context.revert() }
  }, [rows, reducedMotion])

  return <section id="history" ref={sectionRef} className={`historyJourney${reducedMotion ? ' historyJourney--still' : ''}`} style={{ position: 'relative', contentVisibility: 'visible', contain: 'none', containIntrinsicSize: 'none' }} aria-labelledby="history-title">
    <div className="historyJourney__stage">
      <header className="historyJourney__header">
        <h2 id="history-title">HISTORY</h2>
      </header>
      <svg className="historyJourney__clock" viewBox="0 0 500 500" fill="none" aria-hidden="true">
        <circle cx="250" cy="250" r="218" /><circle cx="250" cy="250" r="230" /><circle cx="250" cy="250" r="204" />
        {Array.from({ length: 120 }, (_, i) => {
          const angle = i * Math.PI / 60
          return <line key={i} x1={250 + Math.cos(angle) * 205} y1={250 + Math.sin(angle) * 205} x2={250 + Math.cos(angle) * (i % 5 ? 217 : 223)} y2={250 + Math.sin(angle) * (i % 5 ? 217 : 223)} />
        })}
        <g className="historyJourney__hands">
          <path className="historyJourney__hand historyJourney__hand--minute" d="M250 270 L250 75" />
          <path className="historyJourney__hand historyJourney__hand--hour" d="M250 265 L250 125" />
          <circle cx="250" cy="250" r="8" />
        </g>
      </svg>
      <div className="historyJourney__viewport">
        <div className="historyJourney__camera">
          <svg className="historyJourney__arc" viewBox="0 0 1600 850" preserveAspectRatio="none" fill="none" aria-hidden="true">
            <path className="historyJourney__track" d={curve} />
            <path className="historyJourney__completed" d={curve} />
            <path className="historyJourney__ruler" d={curve} pathLength="100" />
          </svg>
          <ol className="historyJourney__milestones">
            {rows.map((item, i) => <li className="historyJourney__stop" key={`${item.marker}-${item.title}`}>
              <span className="historyJourney__year" aria-hidden="true">{item.marker}</span>
              <span className="historyJourney__stem" aria-hidden="true" />
              <article className="historyJourney__card" tabIndex={0} aria-label={`${item.marker}: ${item.title}, ${item.place}`}>
                <svg className={`historyJourney__photo${i === rows.length - 1 ? ' historyJourney__photo--current' : ''}`} viewBox={photoRegions[i % photoRegions.length]} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                  <image href={referenceImage} width="1778" height="885" />
                </svg>
                <div className="historyJourney__card-copy">
                <div className="historyJourney__card-top"><span>{item.type}</span><span>{String(i + 1).padStart(2, '0')}</span></div>
                <p className="historyJourney__card-year">{item.marker}</p>
                <h3>{item.title}</h3>
                <p className="historyJourney__place">{item.place}</p>
                <p className="historyJourney__period">{item.period}</p>
                </div>
              </article>
            </li>)}
          </ol>
        </div>
      </div>
      <footer className="historyJourney__footer"><span>SAME CURIOSITY.<br />A BIGGER TOMORROW.</span><span className="historyJourney__instruction">SCROLL THROUGH THE YEARS <span aria-hidden="true">↓</span></span><span className="historyJourney__counter" aria-hidden="true">01 / 05</span></footer>
    </div>
  </section>
}

export default History



