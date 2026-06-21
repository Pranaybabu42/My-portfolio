import { useEffect, useRef } from 'react'

function CursorDiffusion({ reducedMotion }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (reducedMotion) return undefined

    const canvas = canvasRef.current
    if (!canvas) return undefined

    const ctx = canvas.getContext('2d')
    let animationId
    let width = window.innerWidth
    let height = window.innerHeight
    let pointerX = width * 0.5
    let pointerY = height * 0.5
    let lastPointerX = pointerX
    let lastPointerY = pointerY
    let pointerActive = false
    let lastSpawn = 0
    const webNodes = []

    const setSize = () => {
      width = window.innerWidth
      height = window.innerHeight
      const dpr = window.devicePixelRatio || 1
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const spawnWebNode = (x, y) => {
      webNodes.push({
        x: x + (Math.random() - 0.5) * 10,
        y: y + (Math.random() - 0.5) * 10,
        vx: (Math.random() - 0.5) * 0.04,
        vy: (Math.random() - 0.5) * 0.04,
        radius: 0.9 + Math.random() * 0.7,
        life: 1,
        decay: 0.011 + Math.random() * 0.005,
      })

      if (webNodes.length > 10) {
        webNodes.splice(0, webNodes.length - 10)
      }
    }

    const onPointerMove = (event) => {
      pointerX = event.clientX
      pointerY = event.clientY
      pointerActive = true

      const dx = pointerX - lastPointerX
      const dy = pointerY - lastPointerY
      const movement = Math.sqrt(dx * dx + dy * dy)
      lastPointerX = pointerX
      lastPointerY = pointerY

      const now = performance.now()
      const minInterval = movement < 6 ? 125 : movement < 14 ? 80 : 40
      if (now - lastSpawn < minInterval) return
      lastSpawn = now
      spawnWebNode(pointerX, pointerY)
    }

    const onPointerLeave = () => {
      pointerActive = false
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      for (let index = webNodes.length - 1; index >= 0; index -= 1) {
        const node = webNodes[index]
        node.x += node.vx
        node.y += node.vy
        node.life -= node.decay

        if (node.life <= 0) {
          webNodes.splice(index, 1)
        }
      }

      if (webNodes.length > 2) {
        for (let index = 0; index < webNodes.length; index += 1) {
          const a = webNodes[index]
          let links = 0
          for (let compare = index + 1; compare < webNodes.length; compare += 1) {
            const b = webNodes[compare]
            const dx = a.x - b.x
            const dy = a.y - b.y
            const distance = Math.sqrt(dx * dx + dy * dy)
            const maxDistance = 62

            if (distance < maxDistance) {
              const alpha = Math.min((1 - distance / maxDistance) * ((a.life + b.life) * 0.35), 0.22)
              if (alpha > 0.025) {
                ctx.beginPath()
                ctx.strokeStyle = `rgba(173,178,188,${alpha})`
                ctx.lineWidth = 0.9
                ctx.moveTo(a.x, a.y)
                ctx.lineTo(b.x, b.y)
                ctx.stroke()
                links += 1
                if (links >= 3) break
              }
            }
          }
        }
      }

      for (let index = 0; index < webNodes.length; index += 1) {
        const node = webNodes[index]
        ctx.beginPath()
        ctx.fillStyle = `rgba(230,80,27,${0.14 + node.life * 0.5})`
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        ctx.fill()
      }

      if (pointerActive) {
        ctx.beginPath()
        ctx.fillStyle = '#eb5939'
        ctx.arc(pointerX, pointerY, 10, 0, Math.PI * 2)
        ctx.fill()
      }

      animationId = window.requestAnimationFrame(draw)
    }

    setSize()
    draw()

    window.addEventListener('resize', setSize)
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerleave', onPointerLeave)

    return () => {
      window.cancelAnimationFrame(animationId)
      window.removeEventListener('resize', setSize)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerleave', onPointerLeave)
    }
  }, [reducedMotion])

  if (reducedMotion) return null

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-[25] h-full w-full " aria-hidden="true"  />
}

export default CursorDiffusion