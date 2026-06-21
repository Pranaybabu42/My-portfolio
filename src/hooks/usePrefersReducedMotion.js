import { useEffect, useState } from 'react'

const STORAGE_KEY = 'portfolio:reduce-motion'

export function usePrefersReducedMotion() {
  const [systemPrefersReduced, setSystemPrefersReduced] = useState(false)
  const [userPreference, setUserPreference] = useState('system')

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setSystemPrefersReduced(media.matches)

    update()
    media.addEventListener('change', update)

    return () => media.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === 'true' || stored === 'false' || stored === 'system') {
      setUserPreference(stored)
    }
  }, [])

  const reducedMotion = userPreference === 'system' ? systemPrefersReduced : userPreference === 'true'

  const setReducedMotion = (value) => {
    const normalized = value ? 'true' : 'false'
    setUserPreference(normalized)
    window.localStorage.setItem(STORAGE_KEY, normalized)
  }

  return {
    reducedMotion,
    systemPrefersReduced,
    userPreference,
    setReducedMotion,
  }
}