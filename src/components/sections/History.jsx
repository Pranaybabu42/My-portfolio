import { useMemo } from 'react'
import { useInViewAnimation } from '../../hooks/useInViewAnimation'
import './History.css'

const cupsImage = new URL('../../../assets/Example_Protfolio/cups.png', import.meta.url).href
const keyboardImage = new URL('../../../assets/Example_Protfolio/keyboard.png', import.meta.url).href

function getStartYear(period = '') {
  const match = period.match(/\d{4}/)
  return match ? match[0] : period
}

function getHistoryRows(profile) {
  const experienceRows = profile.experience.map((item) => {
    const isCurrent = /present/i.test(item.period)

    return {
      type: 'experience',
      marker: isCurrent ? 'NOW' : getStartYear(item.period),
      title: item.role,
      place: item.company,
      code: isCurrent ? 'CURRENT' : getStartYear(item.period),
    }
  })

  const educationRows = profile.education.map((item) => ({
    type: 'education',
    marker: getStartYear(item.period),
    title: item.degree,
    place: item.institution,
    code: 'STUDY',
    summary: item.period,
  }))

  return [...experienceRows, ...educationRows]
}

function History({ profile, reducedMotion }) {
  const { ref, isInView } = useInViewAnimation({ threshold: 0.18 })
  const rows = useMemo(() => getHistoryRows(profile), [profile])

  return (
    <section
      id="history"
      ref={ref}
      className={`historySection${isInView || reducedMotion ? ' historySectionActive' : ''}`}
      style={{
        '--history-bg': `url(${profile.heroImage})`,
        '--history-cups-bg': `url(${cupsImage})`,
        '--history-keyboard-bg': `url(${keyboardImage})`,
      }}
      aria-label="History"
    >
      <div className="historyInner">
        <p className="historyKicker">History</p>

        <div className="historyRows">
          {rows.map((item) => (
            <article
              className="historyRow"
              key={`${item.marker}-${item.title}-${item.place}`}
              tabIndex={0}
              aria-label={`${item.marker}. ${item.title} at ${item.place}${item.summary ? `. ${item.summary}` : ''}`}
            >
              <span className="historyYear" aria-hidden="true">
                {item.marker}
              </span>
              <span className="historyRoleWrap">
                <span className="historyRole">{item.title}</span>
                <span className="historyCode" aria-hidden="true">
                  {item.code}
                </span>
                <span className="historyPlace">{item.place}</span>
              </span>
              {item.summary ? (
                <span className="historySummary" aria-hidden="true">
                  {item.summary}
                </span>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default History
