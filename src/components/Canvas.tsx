import { useRef, PropsWithChildren, useEffect } from 'react'
import { Canvas as CanvasThree } from '@react-three/fiber'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import { OrbitControls } from '@react-three/drei'
import { Camera } from './Camera'
import { useCharacter } from '../context/CharacterProvider'

const Canvas = ({ children }: PropsWithChildren) => {
  const orbitControlsRef = useRef<OrbitControlsImpl>(null)
  const { setControlState } = useCharacter()

  const onKeyDown = (event: KeyboardEvent) => {
    switch (event.code) {
      case 'KeyW':
        setControlState('moveForward', true)

        break
      case 'KeyA':
        setControlState('moveLeft', true)

        break
      case 'KeyS':
        setControlState('moveBackward', true)
        break
      case 'KeyD':
        setControlState('moveRight', true)
        break
      case 'KeyJ':
        setControlState('lowAttack', true)
        break
      case 'KeyI':
        setControlState('highAttack', true)
        break
      case 'KeyK':
        setControlState('animationPlaying', true)
        break
      case 'Space':
        setControlState('evading', true)
        break
      case 'ShiftLeft':
        setControlState('dash', true)
        break
    }
  }

  const onKeyUp = (event: KeyboardEvent) => {
    switch (event.code) {
      case 'KeyW':
        setControlState('moveForward', false)
        break
      case 'KeyA':
        setControlState('moveLeft', false)
        break
      case 'KeyS':
        setControlState('moveBackward', false)
        break
      case 'KeyD':
        setControlState('moveRight', false)
        break
      case 'KeyJ':
        setControlState('lowAttack', false)
        break
      case 'KeyI':
        setControlState('highAttack', false)
        break

      case 'Space':
        setControlState('evading', false)
        break
      case 'ShiftLeft':
        setControlState('dash', false)
        break
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('keyup', onKeyUp)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('keyup', onKeyUp)
    }
  }, [])
  return (
    <CanvasThree shadows>
      <Camera />
      <OrbitControls ref={orbitControlsRef} />
      {children}
    </CanvasThree>
  )
}

export default Canvas
