import { motion as Motion } from 'framer-motion'
import { useInViewAnimation } from '../../hooks/useInViewAnimation'
import './Experience.css'

function getExperienceMeta(item) {
  return [item.employmentType, item.duration, item.location, item.workMode].filter(Boolean)
}

function getExperienceCardClass(item) {
  return [
    'experienceCard',
    item.employmentType === 'Internship' ? 'experienceCard--foundation' : '',
  ]
    .filter(Boolean)
    .join(' ')
}

function getCareerLevelNumber(item) {
  const match = item.careerLevel?.match(/\d+/)
  return match ? Number(match[0]) : 0
}

function groupExperienceItems(items) {
  const groups = []

  items.forEach((item) => {
    if (!item.careerTrack) {
      groups.push({ type: 'single', item })
      return
    }

    const existingGroup = groups.find((group) => group.type === 'track' && group.title === item.careerTrack)

    if (existingGroup) {
      existingGroup.items.push(item)
      return
    }

    groups.push({
      type: 'track',
      title: item.careerTrack,
      summary: item.careerTrackSummary,
      items: [item],
    })
  })

  return groups.map((group) => {
    if (group.type !== 'track') return group

    return {
      ...group,
      items: [...group.items].sort((a, b) => getCareerLevelNumber(b) - getCareerLevelNumber(a)),
    }
  })
}

function ExperienceMeta({ item }) {
  const meta = getExperienceMeta(item)

  if (meta.length === 0) return null

  return (
    <p className="experienceMeta">
      {meta.map((value) => (
        <span key={value}>{value}</span>
      ))}
    </p>
  )
}

function PromotionTrack({ group }) {
  return (
    <div className="experienceCard experienceCard--track">
      <div className="experienceTrackIntro">
        <span className="experienceHierarchy">
          <span>Growth path</span>
          <strong>Promotions</strong>
        </span>
        <h3>{group.title}</h3>
        {group.summary ? <p>{group.summary}</p> : null}
      </div>

      <ol className="experiencePromotionList" aria-label={group.title}>
        {group.items.map((item) => (
          <li key={`${item.role}-${item.period}`} className="experiencePromotionItem">
            <span className="experiencePromotionLevel">{item.careerLevel}</span>
            <div>
              <h4>{item.role}</h4>
              <p>
                <span>{item.period.replace(' - ', ' \u2014 ')}</span>
                <span>{item.company}</span>
              </p>
              <ExperienceMeta item={item} />
              {item.description && item.description.length > 0 && (
                <ul className="experiencePromotionDescription">
                  {item.description.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              )}
              {item.tags && item.tags.length > 0 && (
                <div className="experiencePromotionTags">
                  {item.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

function Experience({ items, reducedMotion }) {
  const { ref, isInView } = useInViewAnimation({ threshold: 0.1, rootMargin: '0px 0px -50px 0px' })
  const experienceGroups = groupExperienceItems(items)

  return (
    <section id="experience" className="experienceSection">
      <div ref={ref} className="experienceInner">
        <Motion.header
          className="experienceHeader"
          initial={reducedMotion ? false : { opacity: 0, y: 30, filter: 'blur(10px)' }}
          animate={isInView || reducedMotion ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: reducedMotion ? 0 : 1.2, ease: [0.19, 1, 0.22, 1] }}
        >
          <h2>EXPERIENCE</h2>
          <p className="experienceSectionTitle">
            Hands-on delivery across research, product, and platform engineering.
          </p>
        </Motion.header>

        <div className="experienceTimeline">
          <div className="experienceTimelineAxis" aria-hidden="true">
            <span className="experienceTimelineDot" />
            <Motion.div
              className="experienceTimelineLine"
              initial={reducedMotion ? false : { scaleY: 0 }}
              animate={isInView || reducedMotion ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: reducedMotion ? 0 : 1.5, ease: [0.19, 1, 0.22, 1], delay: 0.3 }}
            />
          </div>

          <div className="experienceTimelineContent">
            {experienceGroups.map((group, index) => (
              <Motion.article
                key={group.type === 'track' ? group.title : `${group.item.company}-${group.item.period}`}
                className={group.type === 'track' ? 'experienceMotionWrap' : getExperienceCardClass(group.item)}
                initial={reducedMotion ? false : { opacity: 0, y: 30, filter: 'blur(10px)' }}
                animate={isInView || reducedMotion ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
                transition={{
                  duration: reducedMotion ? 0 : 1.2,
                  delay: reducedMotion ? 0 : index * 0.2,
                  ease: [0.19, 1, 0.22, 1],
                }}
                whileHover={reducedMotion ? {} : {
                  x: 12,
                  scale: 1.005,
                  transition: { duration: 0.5, ease: [0.19, 1, 0.22, 1] },
                }}
              >
                {group.type === 'single' && group.item.careerStage && (
                  <div className="experienceHierarchy">
                    <span>{group.item.careerStage}</span>
                    <strong>Early experience</strong>
                  </div>
                )}
                {group.type === 'track' ? (
                  <PromotionTrack group={group} />
                ) : (
                  <>
                    <div className="experienceCardHeader">
                      <span className={`experiencePeriod${/present/i.test(group.item.period) ? ' experiencePeriod--current' : ' experiencePeriod--past'}`}>
                        {group.item.period.replace(' - ', ' \u2014 ').toUpperCase()}
                      </span>
                      <div className="experienceTitleGroup">
                        <h3 className="experienceRole">
                          {group.item.role}{' '}
                          <span className="experienceRoleAt">at</span>{' '}
                          {group.item.company}
                        </h3>
                        <ExperienceMeta item={group.item} />
                      </div>
                    </div>

                    <ul className="experienceHighlights">
                      {group.item.highlights.map((point) => (
                        <li key={point} className="experienceHighlightItem">
                          <span className="experienceHighlightArrow" aria-hidden="true">&rarr;</span>
                          <p>{point}</p>
                        </li>
                      ))}
                    </ul>

                    {group.item.tags && group.item.tags.length > 0 && (
                      <div className="experienceTags">
                        {group.item.tags.map((tag) => (
                          <span key={tag} className="experienceTag">{tag}</span>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </Motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience
