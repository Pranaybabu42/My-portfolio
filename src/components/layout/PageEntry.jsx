import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { Observer } from 'gsap/Observer'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './PageEntry.css'

gsap.registerPlugin(Observer, ScrollTrigger)

export default function PageEntry({ children, reducedMotion }) {
  const rootRef = useRef(null)
  const motionRef = useRef(reducedMotion)
  useLayoutEffect(() => { motionRef.current = reducedMotion }, [reducedMotion])

  useLayoutEffect(() => {
    const root = rootRef.current
    const portfolio = root.querySelector('.entry-portfolio')
    const intro = root.querySelector('.page-intro')
    const loading = root.querySelector('.page-loader')
    const html = document.documentElement
    const previousRestoration = history.scrollRestoration
    history.scrollRestoration = 'manual'
    const setStage = (stage) => {
      root.dataset.stage = stage
      html.dataset.entryStage = stage
    }
    setStage('intro')
    root.dataset.loading = 'true'
    portfolio.inert = true
    window.scrollTo({ top: 0, behavior: 'instant' })
    let stage = 'intro'
    let finished = false
    let touching = false
    let quietTimer
    let timeline
    let ready = false
    const quotes = [
      'Good systems feel inevitable.',
      'There is no cloud, only someone else\'s computer.',
      'Ship small. Learn fast. Build beautifully.',
      'The best interface is the one that gets out of the way.',
    ]
    const quoteTimer = window.setInterval(() => {
      const quote = loading.querySelector('.page-loader__quote')
      if (!quote || !ready) return
      quote.classList.remove('is-visible')
      window.setTimeout(() => {
        quote.textContent = quotes[Math.floor(Math.random() * quotes.length)]
        quote.classList.add('is-visible')
      }, 220)
    }, 1800)
    const preloadImages = async () => {
      const sources = [...root.querySelectorAll('img[src]')].map(image => image.currentSrc || image.src).filter(Boolean)
      await Promise.all(sources.map(src => new Promise(resolve => {
        const image = new Image()
        image.onload = image.onerror = () => resolve()
        image.src = src
        if (image.decode) image.decode().catch(() => {}).finally(resolve)
      })))
      ready = true
      root.dataset.loading = 'false'
      root.dataset.ready = 'true'
      window.setTimeout(() => { root.dataset.open = 'true' }, motionRef.current ? 0 : 1300)
    }
    preloadImages()
    const unlock = () => {
      if (!finished || touching) return
      stage = 'page'
      setStage('page')
      portfolio.inert = false
      intro.hidden = true
      observer.disable()
      window.scrollTo({ top: 0, behavior: 'instant' })
      ScrollTrigger.refresh()
      if (intro.contains(document.activeElement)) root.querySelector('.tech-orbit__footer a').focus({ preventScroll: true })
    }
    // Wait for both animation completion and a quiet input window. A long
    // momentum tail keeps extending this window, even after the reveal ends.
    const noteInput = () => {
      clearTimeout(quietTimer)
      if (finished) quietTimer = setTimeout(unlock, 350)
    }
    const complete = () => {
      if (finished) return
      finished = true
      root.dataset.complete = 'true'
      context.add(() => {
        gsap.fromTo(chrome, { autoAlpha: 0 }, { autoAlpha: 1, duration: motionRef.current ? 0 : 0.35 })
      })
      noteInput()
    }
    const chrome = '.nav-signature-wrap, .entry-navbar nav, .social-left-dock'
    const context = gsap.context(() => {}, root)
    let consumed = false
    let gestureTimer
    const gesture = () => {
      clearTimeout(gestureTimer)
      gestureTimer = setTimeout(() => { consumed = false }, 350)
      noteInput()
    }
    const enter = () => {
      if (!ready || root.dataset.open !== 'true' || stage === 'page' || finished || consumed) return
      consumed = true
      gesture()
      if (stage === 'intro') {
        stage = 'universe'
        setStage('universe')
        window.scrollTo({ top: 0, behavior: 'instant' })
        context.add(() => {
          timeline = gsap.to(intro, { autoAlpha: 0, duration: motionRef.current ? 0 : 0.35 })
        })
      }
      window.dispatchEvent(new Event('universe:advance'))
    }
    const observer = Observer.create({
      target: window, type: 'touch', preventDefault: true,
      tolerance: 12, allowClicks: true, lockAxis: true,
      onUp: enter,
      onPress: () => { touching = true; gesture() },
      onChangeY: gesture,
      onRelease: () => { touching = false; gesture() },
    })
    // Use the browser's raw wheel delta for desktop scrolling. This avoids
    // depending on wheelSpeed/onUp normalization, which differs in some Edge
    // input paths while Chrome consistently reports the reversed direction.
    const wheel = (event) => {
      if (stage === 'page') return
      event.preventDefault()
      if (event.deltaY > 0) enter()
      else gesture()
    }
    const keydown = (event) => {
      if (stage === 'page') return
      if (['ArrowDown', 'PageDown', ' ', 'Enter', 'ArrowUp', 'PageUp', 'Home', 'End'].includes(event.key)) {
        event.preventDefault()
        if (['ArrowDown', 'PageDown', ' ', 'Enter'].includes(event.key)) enter()
        gesture()
      }
    }
    const keepAtTop = () => {
      if (stage !== 'page' && window.scrollY !== 0) window.scrollTo({ top: 0, behavior: 'instant' })
    }
    window.addEventListener('universe:complete', complete)
    intro.addEventListener('click', enter)
    window.addEventListener('wheel', wheel, { passive: false })
    window.addEventListener('keydown', keydown)
    window.addEventListener('scroll', keepAtTop, { passive: true })
    return () => {
      clearTimeout(gestureTimer)
      clearTimeout(quietTimer)
      clearInterval(quoteTimer)
      observer.kill()
      timeline?.kill()
      context.revert()
      window.removeEventListener('universe:complete', complete)
      intro.removeEventListener('click', enter)
      window.removeEventListener('wheel', wheel)
      window.removeEventListener('keydown', keydown)
      window.removeEventListener('scroll', keepAtTop)
      delete html.dataset.entryStage
      history.scrollRestoration = previousRestoration
    }
  }, [])

  return <div ref={rootRef} className="page-entry" data-stage="intro">
    <div className="page-loader" aria-live="polite">
      <span className="page-loader__eyebrow">INITIALIZING THE ENGINEERING UNIVERSE</span>
      <span className="page-loader__quote is-visible">Good systems feel inevitable.</span>
      <span className="page-loader__signal" aria-hidden="true" />
      <div className="page-loader__doors" aria-hidden="true"><i /><i /></div>
    </div>
    <div className="page-intro">
      <button type="button" className="page-intro__enter" aria-label="Enter portfolio. Scroll down or press Enter.">
        <span>SCROLL TO ENTER</span><span className="page-intro__arrow" style={reducedMotion ? { animation: 'none' } : undefined} aria-hidden="true">↓</span>
      </button>
    </div>
    <div className="entry-portfolio" inert>{children}</div>
  </div>
}

