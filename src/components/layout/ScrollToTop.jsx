import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setIsVisible(window.scrollY > window.innerHeight * 0.8)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      type="button"
      className={`scroll-to-top ${isVisible ? 'is-visible' : ''}`}
      onClick={() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        window.history.replaceState(null, '', '#hero')
      }}
      aria-label="Move to top"
    >
      <ArrowUp size={19} strokeWidth={2.2} />
    </button>
  )
}

export default ScrollToTop
