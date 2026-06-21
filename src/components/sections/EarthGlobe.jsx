import { useRef } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import * as THREE from 'three'

const EARTH_TEXTURES = {
  day: '/textures/earth/earth-day.jpg',
  normal: '/textures/earth/earth-normal.jpg',
  clouds: '/textures/earth/earth-clouds.png',
}

const NORMAL_SCALE = new THREE.Vector2(0.45, 0.45)

function GlobeMesh() {
  const earthRef = useRef(null)
  const cloudsRef = useRef(null)
  const [earthTexture, normalTexture, cloudTexture] = useLoader(THREE.TextureLoader, [
    EARTH_TEXTURES.day,
    EARTH_TEXTURES.normal,
    EARTH_TEXTURES.clouds,
  ])

  useFrame((_, delta) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += delta * 0.055
      earthRef.current.rotation.x = -0.23
    }

    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += delta * 0.075
      cloudsRef.current.rotation.x = -0.23
    }
  })

  return (
    <group rotation={[0, -0.45, -0.11]}>
      <mesh ref={earthRef}>
        <sphereGeometry args={[2, 128, 128]} />
        <meshStandardMaterial
          map={earthTexture}
          normalMap={normalTexture}
          normalScale={NORMAL_SCALE}
          roughness={0.85}
          metalness={0}
          transparent={false}
          opacity={1}
        />
      </mesh>

      <mesh ref={cloudsRef}>
        <sphereGeometry args={[2.018, 128, 128]} />
        <meshStandardMaterial
          map={cloudTexture}
          transparent
          opacity={0.42}
          depthWrite={false}
          roughness={1}
          metalness={0}
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[2.06, 128, 128]} />
        <meshBasicMaterial color="#6ecfff" transparent opacity={0.11} side={THREE.BackSide} />
      </mesh>
    </group>
  )
}

function EarthGlobe({ className = '' }) {
  return (
    <div className={`earthGlobe ${className}`.trim()} aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 6.2], fov: 36 }} dpr={[1, 2]}>
        <ambientLight intensity={0.38} />
        <directionalLight position={[4, 2, 4]} intensity={3.15} color="#fff7ed" />
        <pointLight position={[-3.5, -2, 2.2]} intensity={0.9} color="#69cfff" />
        <GlobeMesh />
      </Canvas>
    </div>
  )
}

export default EarthGlobe
