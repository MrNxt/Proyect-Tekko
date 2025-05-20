import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import { Suspense, useEffect, useRef, useState } from 'react'
import { Group } from 'three'

function Model() {
  const gltf = useGLTF('/models/shiba_inu_astronaut.glb')
  const ref = useRef<Group>(null)

  const [scale, setScale] = useState(2.5)

  useEffect(() => {
    const handleResize = () => {
      setScale(window.innerWidth < 640 ? 1.9 : 2.5) 
    }

    handleResize() 
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.005
      ref.current.position.y = Math.sin(Date.now() * 0.001) * 0.1
    }
  })

  return <primitive ref={ref} object={gltf.scene} scale={scale} />
}

useGLTF.preload('/models/shiba_inu_astronaut.glb')

export default function CheesecakeModel() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: '100%',
        height: '80vh',
        margin: '0 auto',
        padding: '20px',
      }}
    >
      <Canvas camera={{ position: [0, 1, 3] }} style={{ width: '100%', height: '100%' }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[2, 5, 2]} intensity={1.2} />
        <Suspense fallback={null}>
          <Model />
        </Suspense>
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
      </Canvas>
    </div>
  )
}
