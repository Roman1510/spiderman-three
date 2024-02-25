import { useRef, useEffect, PropsWithChildren } from 'react'
import { Canvas as CanvasThree } from '@react-three/fiber'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import { OrbitControls } from '@react-three/drei'
import { useCharacterPosition } from '../context/CharacterProvider'

const Canvas = ({ children }: PropsWithChildren) => {
  const { position } = useCharacterPosition()
  const orbitControlsRef = useRef<OrbitControlsImpl>(null)

  useEffect(() => {
    const [x, y, z] = position
    if (orbitControlsRef.current) {
      orbitControlsRef.current.target.set(x, y, z)
    }
  }, [position])

  return (
    <CanvasThree
      shadows
      orthographic
      camera={{
        zoom: 5,
        position: [0, 20, 20],
        near: -60,
        far: 300,
        left: -50,
        right: 50,
        top: 100,
        bottom: -50,
      }}
    >
      <OrbitControls ref={orbitControlsRef} />
      {children}
    </CanvasThree>
  )
}

export default Canvas
