import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import { Suspense, useEffect, useRef, useState } from 'react'
import { Group } from 'three'

const MODEL_URL = '/models/shiba_inu_astronaut.glb'

function Model() {
  const gltf = useGLTF(MODEL_URL)
  const ref = useRef<Group>(null)

  const [scale, setScale] = useState(2.5)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)')
    const update = () => setScale(mq.matches ? 1.9 : 2.5)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.005
      ref.current.position.y = Math.sin(Date.now() * 0.001) * 0.1
    }
  })

  return <primitive ref={ref} object={gltf.scene} scale={scale} />
}

useGLTF.preload(MODEL_URL)

/**
 * Escena 3D. Se carga bajo demanda (dynamic import) para que three.js
 * no esté en el bundle inicial. `active` pausa el render cuando no se ve.
 */
export default function ModelScene({ active }: { active: boolean }) {
  return (
    <Canvas
      className="model-canvas"
      camera={{ position: [0, 1, 3] }}
      style={{ width: '100%', height: '100%' }}
      frameloop={active ? 'always' : 'never'}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[2, 5, 2]} intensity={1.2} />
      <Suspense fallback={null}>
        <Model />
      </Suspense>
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
    </Canvas>
  )
}
