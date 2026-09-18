import { useEffect, useState } from 'react'

const STORAGE_KEY = 'portfolio:reduce-motion'

export function usePrefersReducedMotion() {
  const [systemPrefersReduced, setSystemPrefersReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const [userPreference, setUserPreference] = useState(() => {
    if (typeof window === 'undefined') return 'system'
    const stored = window.localStorage.getItem(STORAGE_KEY)
    return stored === 'true' || stored === 'false' || stored === 'system' ? stored : 'system'
  })

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setSystemPrefersReduced(media.matches)

    media.addEventListener('change', update)

    return () => media.removeEventListener('change', update)
  }, [])

  // Do not let browser-specific OS mappings silently change the portfolio
  // experience. Edge may report `prefers-reduced-motion` differently from
  // Chrome on the same machine, which previously skipped the staged universe
  // animation entirely. Full motion is the default; an explicit saved choice
  // still provides the accessible reduced-motion mode.
  const reducedMotion = userPreference === 'true'

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
