import { useRef, PropsWithChildren, useEffect, useState } from 'react'
import { Canvas as CanvasThree } from '@react-three/fiber'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import { OrbitControls } from '@react-three/drei'
import { Camera } from './Camera'
import { useCharacter } from '../context/CharacterProvider'

const Canvas = ({ children }: PropsWithChildren) => {
  const orbitControlsRef = useRef<OrbitControlsImpl>(null)
  const { setControlState, setDirection } = useCharacter()

  const [pressedKeys, setPressedKeys] = useState({
    KeyW: false,
    KeyA: false,
    KeyS: false,
    KeyD: false,
  })

  const updateDirection = () => {
    const direction: [number, number, number] = [0, 0, 0]
    if (pressedKeys.KeyW) direction[2] += 1
    if (pressedKeys.KeyS) direction[2] -= 1
    if (pressedKeys.KeyA) direction[0] += 1
    if (pressedKeys.KeyD) direction[0] -= 1

    setDirection(direction)
  }

  const onKeyDown = (event: KeyboardEvent) => {
    if (['KeyW', 'KeyA', 'KeyS', 'KeyD'].includes(event.code)) {
      setPressedKeys((prev) => ({ ...prev, [event.code]: true }))
    }

    switch (event.code) {
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
    if (['KeyW', 'KeyA', 'KeyS', 'KeyD'].includes(event.code)) {
      setPressedKeys((prev) => ({ ...prev, [event.code]: false }))
    }

    switch (event.code) {
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
    updateDirection()

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('keyup', onKeyUp)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('keyup', onKeyUp)
    }
  }, [pressedKeys])
  return (
    <CanvasThree dpr={2} shadows>
      <Camera />
      <OrbitControls ref={orbitControlsRef} />
      {children}
    </CanvasThree>
  )
}

export default Canvas
