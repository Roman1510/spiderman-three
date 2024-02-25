import { useRef, PropsWithChildren } from 'react'
import { Canvas as CanvasThree } from '@react-three/fiber'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import { OrbitControls } from '@react-three/drei'
import { Camera } from './Camera'

const Canvas = ({ children }: PropsWithChildren) => {
  const orbitControlsRef = useRef<OrbitControlsImpl>(null)

  return (
    <CanvasThree shadows>
      <Camera />
      <OrbitControls ref={orbitControlsRef} />
      {children}
    </CanvasThree>
  )
}

export default Canvas
