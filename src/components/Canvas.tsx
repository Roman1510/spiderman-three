import { ReactNode } from 'react'
import { Canvas as CanvasThree } from '@react-three/fiber'

interface ICanvasProps {
  children?: ReactNode
}

const Canvas = ({ children }: ICanvasProps) => {
  return (
    <CanvasThree>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      {children}
    </CanvasThree>
  )
}

export default Canvas
