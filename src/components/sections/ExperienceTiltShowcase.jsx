import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import './ExperienceTiltShowcase.css'

const MotionSection = motion.section

const designs = [
  {
    title: 'AI Neural Command Core',
    accent: 'AI-first systems',
    description: 'Models, agents, RAG, APIs, and production data systems connected around one command layer.',
    Component: AiNeuralCommandCore,
  },
  {
    title: 'Code City Architecture',
    accent: 'Full-stack architecture',
    description: 'A service-map view for UI, APIs, databases, auth, AI modules, and operations.',
    Component: CodeCityArchitecture,
  },
  {
    title: 'Developer Stack Orbit',
    accent: 'Skill ecosystem',
    description: 'A living orbit of frontend, backend, AI, cloud, database, and product craft.',
    Component: DeveloperStackOrbit,
  },
  {
    title: 'Project Vault Cube',
    accent: 'Selected work',
    description: 'A rotating project cube built for case studies, demos, impact, and repo links.',
    Component: ProjectVaultCube,
  },
  {
    title: 'Deployment Pipeline',
    accent: 'Shipping discipline',
    description: 'Code, test, build, and release as a polished DevOps credibility signal.',
    Component: DeploymentPipeline,
  },
  {
    title: 'Rotating 3D Moon View',
    accent: 'Futuristic hero visual',
    description: 'A dark portfolio hero concept with a rotating cratered moon, orbit rings, satellites, and neon HUD panels.',
    Component: RotatingMoonPortfolioView,
  },
]

function WindowDots() {
  return (
    <div className="dev3d-dots">
      <i />
      <i />
      <i />
    </div>
  )
}

function Chip({ children }) {
  return <span className="dev3d-chip">{children}</span>
}

function TopBar({ label, secondary }) {
  return (
    <div className="dev3d-topbar">
      <WindowDots />
      <span className="dev3d-chip-row">
        {secondary ? <Chip>{secondary}</Chip> : null}
        <Chip>{label}</Chip>
      </span>
    </div>
  )
}

function CodeLine({ children }) {
  return <span>{children}</span>
}

function GlassCard({ className = '', label, secondary, children }) {
  return (
    <article className={`dev3d-glass-card ${className}`}>
      <TopBar label={label} secondary={secondary} />
      <div className="dev3d-code">{children}</div>
    </article>
  )
}

function SceneCard({ design, index, reducedMotion }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const Visual = design.Component

  const handlePointerMove = (event) => {
    if (reducedMotion) return

    const rect = event.currentTarget.getBoundingClientRect()
    setTilt({
      x: ((event.clientX - rect.left) / rect.width - 0.5).toFixed(3),
      y: ((event.clientY - rect.top) / rect.height - 0.5).toFixed(3),
    })
  }

  return (
    <motion.article
      className="dev3d-card"
      style={{ '--mx': tilt.x, '--my': tilt.y }}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setTilt({ x: 0, y: 0 })}
      initial={reducedMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: reducedMotion ? 0 : 0.45, delay: reducedMotion ? 0 : index * 0.08 }}
    >
      <div className="dev3d-visual" aria-hidden="true">
        <Visual reducedMotion={reducedMotion} />
        <div className="dev3d-scanline" />
      </div>

      <div className="dev3d-copy">
        <p>{design.accent}</p>
        <h3>{design.title}</h3>
        <span>{design.description}</span>
      </div>
    </motion.article>
  )
}

function AiNeuralCommandCore() {
  return (
    <div className="dev3d-core-wrap">
      <div className="dev3d-core-orbit" />
      <div className="dev3d-core" />
      <div className="dev3d-node dev3d-node-1">LLM</div>
      <div className="dev3d-node dev3d-node-2">RAG</div>
      <div className="dev3d-node dev3d-node-3">API</div>
      <div className="dev3d-node dev3d-node-4">DB</div>

      <GlassCard className="dev3d-core-panel" label="agent.runtime">
        <CodeLine><em>const</em> agent = <strong>"portfolio-ai"</strong>;</CodeLine>
        <CodeLine>tools: ["RAG", "Vision", "API"]</CodeLine>
        <CodeLine>status: deployed - production</CodeLine>
      </GlassCard>
    </div>
  )
}

function Building({ className, label }) {
  return (
    <div className={`dev3d-building ${className}`}>
      <div className="dev3d-building-top"><span>{label}</span></div>
      <div className="dev3d-building-front" />
      <div className="dev3d-building-side" />
    </div>
  )
}

function CodeCityArchitecture() {
  return (
    <div className="dev3d-city-wrap">
      <div className="dev3d-city-grid" />
      <div className="dev3d-city-line dev3d-l1" />
      <div className="dev3d-city-line dev3d-l2" />
      <div className="dev3d-city-line dev3d-l3" />
      <Building className="dev3d-b1" label="UI" />
      <Building className="dev3d-b2" label="API" />
      <Building className="dev3d-b3" label="DB" />
      <Building className="dev3d-b4" label="AUTH" />
      <Building className="dev3d-b5" label="AI" />
      <Building className="dev3d-b6" label="OPS" />
      <GlassCard className="dev3d-city-window" label="system.map">
        <CodeLine><em>POST</em> /api/projects</CodeLine>
        <CodeLine><strong>200</strong> deployed services</CodeLine>
        <CodeLine>cache.hit = 98.2%</CodeLine>
      </GlassCard>
    </div>
  )
}

function DeveloperStackOrbit() {
  return (
    <div className="dev3d-orbit-wrap">
      <div className="dev3d-orbit-ring" />
      <div className="dev3d-orbit-ring dev3d-r2" />
      <article className="dev3d-terminal-core">
        <TopBar label="developer.stack" />
        <div className="dev3d-code">
          <CodeLine><em>export default</em> function Engineer() {'{'}</CodeLine>
          <CodeLine>&nbsp;&nbsp;return <strong>&lt;Products /&gt;</strong>;</CodeLine>
          <CodeLine>{'}'}</CodeLine>
          <CodeLine>// React - Node - AI - Cloud</CodeLine>
        </div>
      </article>
      {['React', 'Node', 'AI', 'AWS', 'DB', 'UX'].map((item, itemIndex) => (
        <div key={item} className={`dev3d-tech-card dev3d-t${itemIndex + 1}`}>{item}</div>
      ))}
      <div className="dev3d-orbit-badge">
        <b>Interactive stack map</b>
        Hover-ready tech orbit for skills sections.
      </div>
    </div>
  )
}

function ProjectVaultCube() {
  const faces = [
    ['dev3d-front', 'AI Chat', 'RAG assistant'],
    ['dev3d-back', 'FinTech', 'Dashboard'],
    ['dev3d-right', 'SaaS', 'Subscription app'],
    ['dev3d-left', 'DevTool', 'Code assistant'],
    ['dev3d-top', 'Cloud', 'AWS pipeline'],
    ['dev3d-bottom', 'UX', 'Case study'],
  ]

  return (
    <div className="dev3d-vault-wrap">
      <div className="dev3d-cube">
        {faces.map(([face, title, subtitle]) => (
          <div key={face} className={`dev3d-cube-face ${face}`}>
            <b>{title}</b>
            <small>{subtitle}</small>
          </div>
        ))}
      </div>
      <GlassCard className="dev3d-vault-card dev3d-c1" label="project.json">
        <CodeLine>{'{ "impact": '}<strong>"real"</strong>,</CodeLine>
        <CodeLine>&nbsp;&nbsp;"role": "full-stack" {'}'}</CodeLine>
      </GlassCard>
      <GlassCard className="dev3d-vault-card dev3d-c2" label="live" secondary="metrics">
        <CodeLine>latency down 42%</CodeLine>
        <CodeLine>conversion up 18%</CodeLine>
        <CodeLine>cost down $12k/mo</CodeLine>
      </GlassCard>
    </div>
  )
}

function DeploymentPipeline() {
  return (
    <div className="dev3d-pipeline-wrap">
      <div className="dev3d-pipe-line" />
      <div className="dev3d-pipe-node dev3d-p1">CODE</div>
      <div className="dev3d-pipe-node dev3d-p2">TEST</div>
      <div className="dev3d-pipe-node dev3d-p3">BUILD</div>
      <div className="dev3d-pipe-node dev3d-p4">SHIP</div>
      <GlassCard className="dev3d-pipeline-terminal" label="ci.yml">
        <CodeLine><em>run</em>: npm test && docker build</CodeLine>
        <CodeLine><strong>deploy</strong>: production</CodeLine>
        <CodeLine>healthcheck: passed</CodeLine>
      </GlassCard>
      <article className="dev3d-glass-card dev3d-pipeline-stats">
        <div className="dev3d-topbar">
          <Chip>release.health</Chip>
          <Chip>99.9%</Chip>
        </div>
        <div className="dev3d-stat-grid">
          <div><b>24</b><small>deploys</small></div>
          <div><b>0</b><small>rollbacks</small></div>
          <div><b>18s</b><small>build time</small></div>
          <div><b>4</b><small>regions</small></div>
        </div>
      </article>
    </div>
  )
}

export function RotatingMoonPortfolioView({ minimal = false, className = '' }) {
  const canvasRef = useRef(null)
  const loadingRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const loading = loadingRef.current
    const host = canvas?.parentElement

    if (!canvas || !host) return undefined

    const COLORS = {
      background: 0x020304,
      orange: 0xff5a2c,
      amber: 0xffb84d,
      teal: 0x2dd4bf,
      cyan: 0x22d3ee,
      purple: 0xa855f7,
      white: 0xffffff,
    }

    let seed = 1337
    let frameId = 0
    let firstFrame = true

    const random = () => {
      seed |= 0
      seed = (seed + 0x6d2b79f5) | 0
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296
    }

    const range = (min, max) => min + (max - min) * random()
    const clamp = (value, min, max) => Math.max(min, Math.min(max, value))

    const createMoonTextures = () => {
      const width = 1536
      const height = 768
      const colorCanvas = document.createElement('canvas')
      const bumpCanvas = document.createElement('canvas')

      colorCanvas.width = bumpCanvas.width = width
      colorCanvas.height = bumpCanvas.height = height

      const colorCtx = colorCanvas.getContext('2d')
      const bumpCtx = bumpCanvas.getContext('2d')
      const colorImage = colorCtx.createImageData(width, height)
      const bumpImage = bumpCtx.createImageData(width, height)

      for (let y = 0; y < height; y += 1) {
        const v = y / height
        const latitudeSoftness = 1 - Math.abs(v - 0.5) * 0.34

        for (let x = 0; x < width; x += 1) {
          const i = (y * width + x) * 4
          const tinyNoise = (random() - 0.5) * 24
          const wave = Math.sin(x * 0.018 + y * 0.014) * 5 + Math.sin(x * 0.043 - y * 0.021) * 4
          const base = clamp(142 * latitudeSoftness + tinyNoise + wave, 72, 196)
          const bump = clamp(132 + tinyNoise * 1.2 + wave * 1.4, 70, 210)

          colorImage.data[i] = base
          colorImage.data[i + 1] = base
          colorImage.data[i + 2] = base * 0.94
          colorImage.data[i + 3] = 255

          bumpImage.data[i] = bump
          bumpImage.data[i + 1] = bump
          bumpImage.data[i + 2] = bump
          bumpImage.data[i + 3] = 255
        }
      }

      colorCtx.putImageData(colorImage, 0, 0)
      bumpCtx.putImageData(bumpImage, 0, 0)

      const drawMare = (ctx, x, y, rx, ry, opacity) => {
        const grad = ctx.createRadialGradient(x, y, 0, x, y, Math.max(rx, ry))
        grad.addColorStop(0, `rgba(28, 28, 28, ${opacity})`)
        grad.addColorStop(0.52, `rgba(52, 52, 50, ${opacity * 0.75})`)
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)')

        ctx.save()
        ctx.translate(x, y)
        ctx.scale(rx / Math.max(rx, ry), ry / Math.max(rx, ry))
        ctx.translate(-x, -y)
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(x, y, Math.max(rx, ry), 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }

      const mareRegions = [
        [610, 280, 190, 130, 0.23],
        [820, 360, 160, 210, 0.19],
        [1050, 240, 130, 95, 0.16],
        [440, 440, 150, 105, 0.16],
        [1220, 470, 180, 120, 0.17],
      ]

      mareRegions.forEach((mare) => {
        drawMare(colorCtx, ...mare)
        drawMare(bumpCtx, mare[0], mare[1], mare[2], mare[3], mare[4] * 0.8)
      })

      const craters = Array.from({ length: 340 }, () => {
        const r = Math.pow(random(), 2.1) * 60 + 3.5
        const y = range(42, height - 42)
        const poleShrink = 1 - Math.abs(y / height - 0.5) * 0.45

        return {
          x: range(0, width),
          y,
          r: r * poleShrink,
          angle: range(0, Math.PI),
          squash: range(0.72, 1.18),
          alpha: range(0.2, 0.72),
        }
      })

      const drawCraterOn = (ctx, crater, mode, offsetX = 0) => {
        const { x, y, r, angle, squash, alpha } = crater
        const grad = ctx.createRadialGradient(-r * 0.16, -r * 0.18, r * 0.08, 0, 0, r)

        if (mode === 'color') {
          grad.addColorStop(0, `rgba(20, 20, 20, ${0.18 * alpha})`)
          grad.addColorStop(0.46, `rgba(34, 34, 32, ${0.28 * alpha})`)
          grad.addColorStop(0.63, `rgba(210, 208, 190, ${0.23 * alpha})`)
          grad.addColorStop(0.76, `rgba(245, 233, 190, ${0.3 * alpha})`)
          grad.addColorStop(0.86, `rgba(24, 24, 24, ${0.22 * alpha})`)
          grad.addColorStop(1, 'rgba(0, 0, 0, 0)')
        } else {
          grad.addColorStop(0, `rgba(42, 42, 42, ${0.65 * alpha})`)
          grad.addColorStop(0.5, `rgba(70, 70, 70, ${0.42 * alpha})`)
          grad.addColorStop(0.68, `rgba(245, 245, 245, ${0.55 * alpha})`)
          grad.addColorStop(0.81, `rgba(48, 48, 48, ${0.42 * alpha})`)
          grad.addColorStop(1, 'rgba(128, 128, 128, 0)')
        }

        ctx.save()
        ctx.translate(x + offsetX, y)
        ctx.rotate(angle)
        ctx.scale(1, squash)
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(0, 0, r, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }

      craters.forEach((crater) => {
        drawCraterOn(colorCtx, crater, 'color')
        drawCraterOn(bumpCtx, crater, 'bump')

        if (crater.x - crater.r < 0) {
          drawCraterOn(colorCtx, crater, 'color', width)
          drawCraterOn(bumpCtx, crater, 'bump', width)
        }

        if (crater.x + crater.r > width) {
          drawCraterOn(colorCtx, crater, 'color', -width)
          drawCraterOn(bumpCtx, crater, 'bump', -width)
        }
      })

      const colorTexture = new THREE.CanvasTexture(colorCanvas)
      colorTexture.colorSpace = THREE.SRGBColorSpace
      colorTexture.wrapS = THREE.RepeatWrapping
      colorTexture.wrapT = THREE.ClampToEdgeWrapping
      colorTexture.anisotropy = 12

      const bumpTexture = new THREE.CanvasTexture(bumpCanvas)
      bumpTexture.wrapS = THREE.RepeatWrapping
      bumpTexture.wrapT = THREE.ClampToEdgeWrapping
      bumpTexture.anisotropy = 12

      return { colorTexture, bumpTexture }
    }

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(COLORS.background)
    scene.fog = new THREE.FogExp2(COLORS.background, 0.028)

    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 180)
    camera.position.set(0, 0.2, 8.8)

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      powerPreference: 'high-performance',
      alpha: false,
    })

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.15

    const composer = new EffectComposer(renderer)
    composer.addPass(new RenderPass(scene, camera))
    const bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.95, 0.55, 0.08)
    composer.addPass(bloom)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.target.set(0, 0, 0)
    controls.minDistance = 5.2
    controls.maxDistance = 13
    controls.enablePan = false
    controls.autoRotate = false

    const ambient = new THREE.AmbientLight(0x4f5862, 0.68)
    const keyLight = new THREE.DirectionalLight(0xffffff, 4.2)
    keyLight.position.set(-3.4, 2.2, 4.6)
    const rimLight = new THREE.PointLight(COLORS.cyan, 5.2, 14)
    rimLight.position.set(4.4, 0.4, -3.6)
    const orangeFill = new THREE.PointLight(COLORS.orange, 3.8, 12)
    orangeFill.position.set(-4.6, -3.2, 2.6)
    scene.add(ambient, keyLight, rimLight, orangeFill)

    const moonGroup = new THREE.Group()
    scene.add(moonGroup)

    const { colorTexture, bumpTexture } = createMoonTextures()
    const moonRadius = 2.35
    const moonGeometry = new THREE.SphereGeometry(moonRadius, 192, 112)
    const moonMaterial = new THREE.MeshStandardMaterial({
      map: colorTexture,
      bumpMap: bumpTexture,
      bumpScale: 0.18,
      displacementMap: bumpTexture,
      displacementScale: 0.04,
      roughness: 1,
      metalness: 0,
      color: 0xf0eee4,
    })

    const moon = new THREE.Mesh(moonGeometry, moonMaterial)
    moon.rotation.y = -0.72
    moonGroup.add(moon)

    const atmosphere = new THREE.Mesh(
      new THREE.SphereGeometry(moonRadius * 1.018, 128, 80),
      new THREE.MeshBasicMaterial({
        color: 0x9fd4ff,
        transparent: true,
        opacity: 0.08,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide,
      }),
    )
    moonGroup.add(atmosphere)

    const latLonToVector = (latDeg, lonDeg, radius) => {
      const lat = THREE.MathUtils.degToRad(latDeg)
      const lon = THREE.MathUtils.degToRad(lonDeg)

      return new THREE.Vector3(
        radius * Math.cos(lat) * Math.sin(lon),
        radius * Math.sin(lat),
        radius * Math.cos(lat) * Math.cos(lon),
      )
    }

    const zAxis = new THREE.Vector3(0, 0, 1)
    for (let i = 0; i < 72; i += 1) {
      const lat = range(-62, 62)
      const lon = range(-180, 180)
      const size = range(0.045, 0.18) * (random() > 0.86 ? 1.8 : 1)
      const normal = latLonToVector(lat, lon, 1).normalize()
      const position = normal.clone().multiplyScalar(moonRadius + 0.018)

      const ring = new THREE.Mesh(
        new THREE.RingGeometry(size * 0.74, size, 52),
        new THREE.MeshBasicMaterial({
          color: random() > 0.65 ? COLORS.amber : 0xded8c5,
          transparent: true,
          opacity: range(0.08, 0.22),
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          side: THREE.DoubleSide,
        }),
      )

      ring.position.copy(position)
      ring.quaternion.setFromUnitVectors(zAxis, normal)
      moonGroup.add(ring)

      if (random() > 0.42) {
        const disk = new THREE.Mesh(
          new THREE.CircleGeometry(size * 0.68, 52),
          new THREE.MeshBasicMaterial({
            color: 0x050505,
            transparent: true,
            opacity: range(0.05, 0.13),
            depthWrite: false,
            side: THREE.DoubleSide,
          }),
        )

        disk.position.copy(normal.clone().multiplyScalar(moonRadius + 0.017))
        disk.quaternion.setFromUnitVectors(zAxis, normal)
        moonGroup.add(disk)
      }
    }

    const starCount = 1800
    const starPositions = new Float32Array(starCount * 3)
    const starColors = new Float32Array(starCount * 3)
    const color = new THREE.Color()

    for (let i = 0; i < starCount; i += 1) {
      const radius = range(16, 70)
      const theta = range(0, Math.PI * 2)
      const phi = Math.acos(range(-1, 1))
      const choice = random()

      starPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      starPositions[i * 3 + 1] = radius * Math.cos(phi)
      starPositions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta)

      if (choice > 0.86) color.setHex(COLORS.orange)
      else if (choice > 0.72) color.setHex(COLORS.teal)
      else color.setHex(COLORS.white)

      starColors[i * 3] = color.r
      starColors[i * 3 + 1] = color.g
      starColors[i * 3 + 2] = color.b
    }

    const starGeometry = new THREE.BufferGeometry()
    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3))
    starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3))
    const stars = new THREE.Points(
      starGeometry,
      new THREE.PointsMaterial({
        size: 0.045,
        vertexColors: true,
        transparent: true,
        opacity: 0.86,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    )
    scene.add(stars)

    const orbitGroup = new THREE.Group()
    scene.add(orbitGroup)

    const createOrbitRing = (radius, ringColor, rotation) => {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(radius, 0.006, 8, 220),
        new THREE.MeshBasicMaterial({
          color: ringColor,
          transparent: true,
          opacity: 0.48,
          blending: THREE.AdditiveBlending,
        }),
      )

      ring.rotation.set(rotation[0], rotation[1], rotation[2])
      orbitGroup.add(ring)
      return ring
    }

    const ringOne = createOrbitRing(3.05, COLORS.orange, [1.18, 0.2, -0.4])
    const ringTwo = createOrbitRing(3.42, COLORS.teal, [1.38, -0.2, 0.36])
    const ringThree = createOrbitRing(3.82, COLORS.purple, [1.5, 0.4, 0.92])
    const satellites = []

    for (let i = 0; i < 12; i += 1) {
      const sat = new THREE.Mesh(
        new THREE.SphereGeometry(0.055, 16, 16),
        new THREE.MeshBasicMaterial({
          color: i % 2 ? COLORS.orange : COLORS.teal,
          blending: THREE.AdditiveBlending,
        }),
      )

      satellites.push({
        mesh: sat,
        speed: range(0.28, 0.58),
        radius: range(3.0, 3.85),
        phase: range(0, Math.PI * 2),
        tilt: range(0.35, 0.9),
      })

      orbitGroup.add(sat)
    }

    const glowDot = new THREE.Mesh(
      new THREE.SphereGeometry(0.09, 24, 24),
      new THREE.MeshBasicMaterial({
        color: COLORS.amber,
        transparent: true,
        opacity: 0.95,
        blending: THREE.AdditiveBlending,
      }),
    )
    scene.add(glowDot)

    const resize = () => {
      const rect = host.getBoundingClientRect()
      const width = Math.max(1, rect.width)
      const height = Math.max(1, rect.height)

      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height, false)
      composer.setSize(width, height)
      bloom.setSize(width, height)
    }

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(host)
    resize()

    const animate = () => {
      frameId = requestAnimationFrame(animate)
      const time = performance.now() * 0.001

      moonGroup.rotation.y += 0.0021
      moonGroup.rotation.x = Math.sin(time * 0.22) * 0.035
      moonGroup.rotation.z = Math.sin(time * 0.18) * 0.018

      orbitGroup.rotation.y -= 0.0028
      orbitGroup.rotation.x = Math.sin(time * 0.25) * 0.08

      ringOne.rotation.z += 0.002
      ringTwo.rotation.z -= 0.0017
      ringThree.rotation.z += 0.0012

      satellites.forEach((sat) => {
        const angle = time * sat.speed + sat.phase
        sat.mesh.position.set(
          Math.cos(angle) * sat.radius,
          Math.sin(angle * sat.tilt) * 0.56,
          Math.sin(angle) * sat.radius,
        )
      })

      glowDot.position.set(
        Math.cos(time * 0.48) * 3.1,
        Math.sin(time * 0.63) * 0.8,
        Math.sin(time * 0.48) * 3.1,
      )

      stars.rotation.y += 0.0002
      stars.rotation.x = Math.sin(time * 0.08) * 0.015
      rimLight.intensity = 4.8 + Math.sin(time * 1.8) * 0.9
      orangeFill.intensity = 3.3 + Math.cos(time * 1.55) * 0.75

      controls.update()
      composer.render()

      if (firstFrame) {
        firstFrame = false
        loading?.classList.add('is-hidden')
      }
    }

    animate()

    return () => {
      cancelAnimationFrame(frameId)
      resizeObserver.disconnect()
      controls.dispose()
      composer.dispose()
      renderer.dispose()
      colorTexture.dispose()
      bumpTexture.dispose()
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose()

        if (object.material) {
          if (Array.isArray(object.material)) object.material.forEach((material) => material.dispose())
          else object.material.dispose()
        }
      })
    }
  }, [])

  return (
    <div className={`dev3d-moon-wrap ${minimal ? 'dev3d-moon-wrap--minimal' : ''} ${className}`.trim()}>
      <canvas ref={canvasRef} className="dev3d-moon-canvas" />
      {!minimal ? <div ref={loadingRef} className="dev3d-moon-loading">building procedural moon</div> : null}

      {!minimal ? (
        <div className="dev3d-moon-hud">
          <p>// 3D ROTATING MOON VIEW</p>
          <h4>
            Build in the <span>dark.</span>
            <br />
            Ship into orbit.
          </h4>
          <small>
            A real 3D moon hero visual with procedural craters, animated rotation, orbit controls, bloom glow, and portfolio-style neon glass UI.
          </small>
        </div>
      ) : null}

      {!minimal ? (
        <GlassCard className="dev3d-moon-code" label="moon.scene.ts">
          <CodeLine><em>const</em> moon = <strong>"procedural-3d"</strong>;</CodeLine>
          <CodeLine>texture: craters + bump map</CodeLine>
          <CodeLine>rotation: enabled</CodeLine>
          <CodeLine>view: orbit controls</CodeLine>
        </GlassCard>
      ) : null}

      {!minimal ? (
        <article className="dev3d-glass-card dev3d-moon-status">
          <b>Portfolio hero-ready visual</b>
          <p>Dark futuristic developer scene with orbit motion and neon glass UI.</p>
          <div className="dev3d-moon-status-row">
            <span />
            3D scene running
          </div>
        </article>
      ) : null}

      {!minimal ? (
        <div className="dev3d-moon-control-hint">
          <span>MOON</span>
          Drag to rotate - Scroll to zoom
        </div>
      ) : null}
    </div>
  )
}

function ExperienceTiltShowcase({ reducedMotion }) {
  return (
    <MotionSection
      className={`dev3d-section ${reducedMotion ? 'dev3d-reduced-motion' : ''}`}
      initial={reducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-120px' }}
      transition={{ duration: reducedMotion ? 0 : 0.45 }}
      aria-labelledby="developer-3d-views-title"
    >
      <div className="dev3d-header">
        <p>Experience extensions</p>
        <h2 id="developer-3d-views-title">Animated developer views for the portfolio.</h2>
      </div>

      <div className="dev3d-grid">
        {designs.map((design, index) => (
          <SceneCard key={design.title} design={design} index={index} reducedMotion={reducedMotion} />
        ))}
      </div>
    </MotionSection>
  )
}

export default ExperienceTiltShowcase
