import { useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { AnimationClip, Group, Vector3 } from 'three'
import useAnimationMap from '../hooks/useAnimationMap' // Ensure this path matches your project structure

const useCharacterControls = (
  groupRef: React.RefObject<Group>,
  animations: AnimationClip[]
) => {
  const { getAnimation } = useAnimationMap(animations, groupRef)
  const walkAnimation = getAnimation('walk')
  const dashAnimation = getAnimation('dash')
  const waitAnimation = getAnimation('wait')

  // Movement states
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

    const speed = dash ? 2 : 1 // Adjust speed if dashing
    const direction = new Vector3()

    if (moveForward) direction.z -= speed
    if (moveBackward) direction.z += speed
    if (moveLeft) direction.x -= speed
    if (moveRight) direction.x += speed

    // Normalize direction vector to have unit length, then scale by speed
    direction.normalize().multiplyScalar(speed)

    if (direction.length() > 0) {
      // Update character position
      groupRef.current.position.add(direction)

      // Rotate character to face direction of movement
      groupRef.current.rotation.y = Math.atan2(direction.x, direction.z)

      // Play walk or dash animation
      if (dash) {
        walkAnimation.stop()
        dashAnimation.play()
        waitAnimation.stop()
      } else {
        dashAnimation.stop()
        walkAnimation.play()
        waitAnimation.stop()
      }
    } else {
      // Stop animations if not moving
      walkAnimation.stop()
      dashAnimation.stop()
      waitAnimation.play()
    }
  })

  return {}
}

export default useCharacterControls
