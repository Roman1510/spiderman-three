import { useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { AnimationClip, Group, Vector3 } from 'three'
import useAnimationMap from '../hooks/useAnimationMap' // Adjust path as necessary

const useCharacterControls = (
  groupRef: React.RefObject<Group>,
  animations: AnimationClip[]
) => {
  const { playAnimation } = useAnimationMap(animations, groupRef)

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

    const speed = dash ? 2 : 1 // adjust speed if dashing
    const direction = new Vector3()

    if (moveForward) direction.z -= 1
    if (moveBackward) direction.z += 1
    if (moveLeft) direction.x -= 1
    if (moveRight) direction.x += 1

    // normalize direction vector to have unit length, then scale by speed
    direction.normalize().multiplyScalar(speed)
    if (direction.length() > 0) {
      // update character position
      groupRef.current.position.add(direction)
      // rotate character to face direction of movement
      groupRef.current.rotation.y = Math.atan2(direction.x, direction.z)
      // play walk or dash animation based on the state
      playAnimation(dash ? 'dash' : 'walk', 0.1)
    } else {
      // when not moving, play the wait animation
      playAnimation('wait', 0.1)
    }
  })

  return {}
}

export default useCharacterControls
