import { ReactNode } from 'react'
import { Canvas as CanvasThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

interface ICanvasProps {
  children?: ReactNode
}

const Canvas = ({ children }: ICanvasProps) => {
  return (
    <CanvasThree>
      <OrbitControls />
      {children}
    </CanvasThree>
  )
}

export default Canvas
