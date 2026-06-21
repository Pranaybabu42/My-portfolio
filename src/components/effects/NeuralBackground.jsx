import { useEffect, useRef } from 'react'

function NeuralBackground({ reducedMotion }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (reducedMotion) return undefined

    const canvas = canvasRef.current
    if (!canvas) return undefined

    const ctx = canvas.getContext('2d')
    let animationId
    let width = 0
    let height = 0
    let particles = []

    const setSize = () => {
      width = canvas.parentElement?.offsetWidth ?? window.innerWidth
      height = canvas.parentElement?.offsetHeight ?? 420
      const dpr = window.devicePixelRatio || 1
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const createParticles = () => {
      const particleCount = Math.min(56, Math.max(28, Math.floor(window.innerWidth / 28)))
      particles = Array.from({ length: particleCount }).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.55,
        vy: (Math.random() - 0.5) * 0.55,
        radius: Math.random() * 1.4 + 0.6,
      }))
    }

    const lineDistance = 130

    const draw = () => {
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
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < lineDistance) {
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
    draw()

    const resizeObserver = new ResizeObserver(() => {
      setSize()
      createParticles()
    })
    resizeObserver.observe(canvas.parentElement)

    return () => {
      window.cancelAnimationFrame(animationId)
      resizeObserver.disconnect()
    }
  }, [reducedMotion])

  if (reducedMotion) return null

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
}

export default NeuralBackground