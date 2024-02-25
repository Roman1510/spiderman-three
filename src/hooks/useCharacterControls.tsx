import { useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { AnimationClip, Group, Vector3 } from 'three'
import getAnimationsMap from '../helpers/getAnimationsMap' // Adjust path as necessary
import { useCharacterPosition } from '../context/CharacterProvider'

const useCharacterControls = (
  groupRef: React.RefObject<Group>,
  animations: AnimationClip[]
) => {
  const { playAnimation } = getAnimationsMap(animations, groupRef)
  const { setPosition } = useCharacterPosition()

  const [moveForward, setMoveForward] = useState(false)
  const [moveBackward, setMoveBackward] = useState(false)
  const [moveLeft, setMoveLeft] = useState(false)
  const [moveRight, setMoveRight] = useState(false)
  const [dash, setDash] = useState(false)

  const onKeyDown = (event: KeyboardEvent) => {
    switch (event.code) {
      case 'KeyW':
        setMoveForward(true)
        break
      case 'KeyA':
        setMoveLeft(true)
        break
      case 'KeyS':
        setMoveBackward(true)
        break
      case 'KeyD':
        setMoveRight(true)
        break
      case 'ShiftLeft':
        setDash(true)
        break
    }
  }

  const onKeyUp = (event: KeyboardEvent) => {
    switch (event.code) {
      case 'KeyW':
        setMoveForward(false)
        break
      case 'KeyA':
        setMoveLeft(false)
        break
      case 'KeyS':
        setMoveBackward(false)
        break
      case 'KeyD':
        setMoveRight(false)
        break
      case 'ShiftLeft':
        setDash(false)
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

  useFrame(() => {
    if (!groupRef.current) return
    const speed = dash ? 2.5 : 1
    const direction = new Vector3()

    if (moveForward) direction.z += 1
    if (moveBackward) direction.z -= 1
    if (moveLeft) direction.x += 1
    if (moveRight) direction.x -= 1

    direction.normalize().multiplyScalar(speed)
    if (direction.length() > 0) {
      groupRef.current.position.add(direction)
      groupRef.current.rotation.y = Math.atan2(direction.x, direction.z)
      playAnimation(dash ? 'dash' : 'walk', 0.1)

      setPosition(groupRef.current.position.toArray())
    } else {
      playAnimation('wait', 0.1, 2)
    }
  })

  return {}
}

export default useCharacterControls
