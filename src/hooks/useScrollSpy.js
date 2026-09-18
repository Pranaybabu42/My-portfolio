import { useEffect, useState } from 'react'

export function useScrollSpy(sectionIds = []) {
  const [activeSection, setActiveSection] = useState(sectionIds[0] ?? '')

  useEffect(() => {
    if (!sectionIds.length) return undefined

    const elements = sectionIds.map((id) => document.getElementById(id)).filter(Boolean)
    if (!elements.length) return undefined
    let frameId = 0

    const updateActiveSection = () => {
      frameId = 0
      const activationLine = window.innerHeight * 0.34
      let currentSection = elements[0].id

      for (const element of elements) {
        const rect = element.getBoundingClientRect()

        if (rect.top <= activationLine) {
          currentSection = element.id
        }

        if (rect.top <= activationLine && rect.bottom > activationLine) {
          currentSection = element.id
          break
        }
      }

      setActiveSection((current) => current === currentSection ? current : currentSection)
    }

    const requestUpdate = () => {
      if (!frameId) frameId = window.requestAnimationFrame(updateActiveSection)
    }

    updateActiveSection()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate, { passive: true })

    return () => {
      if (frameId) window.cancelAnimationFrame(frameId)
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
    }
  }, [sectionIds])

  return activeSection
}
