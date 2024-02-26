import { useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { AnimationClip, Group, MathUtils, Vector3 } from 'three'
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
  const [lowAttack, setLowAttack] = useState(false)
  const [highAttack, setHighAttack] = useState(false)
  const [superAttack, setSuperAttack] = useState(false)

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
      case 'KeyJ':
        setLowAttack(true)
        break
      case 'KeyI':
        setHighAttack(true)
        break
      case 'KeyK':
        setSuperAttack(true)
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
      case 'KeyJ':
        setLowAttack(false)
        break
      case 'KeyI':
        setHighAttack(false)
        break
      case 'KeyK':
        setSuperAttack(false)
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

    const speed = dash ? 2.5 : 1.3
    const direction = new Vector3()

    if (moveForward) direction.z += 1
    if (moveBackward) direction.z -= 1
    if (moveLeft) direction.x += 1
    if (moveRight) direction.x -= 1

    direction.normalize().multiplyScalar(speed)

    if (direction.length() > 0) {
      groupRef.current.position.add(direction)

      // Calculate target rotation
      const targetRotationY = Math.atan2(direction.x, direction.z)

      // Smoothly interpolate rotation
      const rotationSpeed = 0.3 // Adjust this value to make the rotation faster or slower
      groupRef.current.rotation.y = MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotationY,
        rotationSpeed
      )

      setPosition(groupRef.current.position.toArray())

      if (!lowAttack && !highAttack && !superAttack) {
        playAnimation(dash ? 'dash' : 'walk', 0.1)
      }
    } else if (!lowAttack && !highAttack && !superAttack) {
      playAnimation('wait', 0.1, 2)
    }

    if (lowAttack) {
      playAnimation('atk-01', 0.1, 0.35)
    }
    if (highAttack) {
      playAnimation('atk-02', 0.1, 0.6)
    }

    if (superAttack) {
      playAnimation('stun', 1, 1.8)
    }
  })

  return {}
}

export default useCharacterControls
