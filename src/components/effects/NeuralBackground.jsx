import { useEffect, useRef } from 'react'

function NeuralBackground({ reducedMotion }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (reducedMotion) return undefined

    const canvas = canvasRef.current
    if (!canvas) return undefined

    const ctx = canvas.getContext('2d')
    if (!ctx) return undefined
    let animationId
    let width = 0
    let height = 0
    let particles = []
    let lastFrame = 0
    let isRunning = false
    let isVisible = false
    const frameInterval = 1000 / 30

    const setSize = () => {
      width = canvas.parentElement?.clientWidth || document.documentElement.clientWidth
      height = canvas.parentElement?.clientHeight || window.innerHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const createParticles = () => {
      const particleCount = window.innerWidth < 768 ? 18 : Math.min(32, Math.max(22, Math.floor(window.innerWidth / 55)))
      particles = Array.from({ length: particleCount }).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.55,
        vy: (Math.random() - 0.5) * 0.55,
        radius: Math.random() * 1.4 + 0.6,
      }))
    }

    const lineDistance = 130

    const draw = (timestamp) => {
      if (!isRunning) return
      if (timestamp - lastFrame < frameInterval) {
        animationId = window.requestAnimationFrame(draw)
        return
      }
      lastFrame = timestamp
      ctx.clearRect(0, 0, width, height)

      for (let index = 0; index < particles.length; index += 1) {
        const a = particles[index]
        a.x += a.vx
        a.y += a.vy

        if (a.x < -8) a.x = width + 8
        if (a.x > width + 8) a.x = -8
        if (a.y < -8) a.y = height + 8
        if (a.y > height + 8) a.y = -8

        ctx.beginPath()
        ctx.fillStyle = 'rgba(255, 68, 0, 0.55)'
        ctx.arc(a.x, a.y, a.radius, 0, Math.PI * 2)
        ctx.fill()

        for (let compare = index + 1; compare < particles.length; compare += 1) {
          const b = particles[compare]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const distanceSquared = dx * dx + dy * dy

          if (distanceSquared < lineDistance * lineDistance) {
            const dist = Math.sqrt(distanceSquared)
            const alpha = 1 - dist / lineDistance
            ctx.beginPath()
            ctx.strokeStyle = `rgba(153,160,171,${alpha * 0.28})`
            ctx.lineWidth = 1
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      animationId = window.requestAnimationFrame(draw)
    }

    setSize()
    createParticles()

    const handleResize = () => {
      setSize()
      createParticles()
    }

    const handleVisibilityChange = () => {
      const shouldRun = isVisible && !document.hidden
      if (shouldRun === isRunning) return
      isRunning = shouldRun
      if (isRunning) {
        lastFrame = 0
        animationId = window.requestAnimationFrame(draw)
      } else {
        window.cancelAnimationFrame(animationId)
      }
    }

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting
      handleVisibilityChange()
    })
    observer.observe(canvas)

    window.addEventListener('resize', handleResize, { passive: true })
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      isRunning = false
      observer.disconnect()
      window.cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [reducedMotion])

  if (reducedMotion) return null

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true" />
}

export default NeuralBackground
