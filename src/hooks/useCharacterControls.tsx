import { useState, useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { AnimationClip, Group, MathUtils, Vector3 } from 'three'
import getAnimationsMap from '../helpers/getAnimationsMap' // Adjust path as necessary
import { useCharacterPosition } from '../context/CharacterProvider'

const useCharacterControls = (
  groupRef: React.RefObject<Group>,
  animations: AnimationClip[]
) => {
  const { playAnimation, stopAllAnimations } = getAnimationsMap(
    animations,
    groupRef
  )
  const { setPosition } = useCharacterPosition()

  const [moveForward, setMoveForward] = useState(false)
  const [moveBackward, setMoveBackward] = useState(false)
  const [moveLeft, setMoveLeft] = useState(false)
  const [moveRight, setMoveRight] = useState(false)
  const [dash, setDash] = useState(false)
  const [lowAttack, setLowAttack] = useState(false)
  const [highAttack, setHighAttack] = useState(false)
  const [superAttack, setSuperAttack] = useState(false)
  const [evading, setEvading] = useState(false)

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
      case 'Space':
        setEvading(true)
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
      case 'Space':
        setEvading(false)
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

      const targetRotationY = Math.atan2(direction.x, direction.z)

      const rotationSpeed = 0.3
      groupRef.current.rotation.y = MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotationY,
        rotationSpeed
      )

      setPosition(groupRef.current.position.toArray())
    }

    const isMoving = moveForward || moveBackward || moveLeft || moveRight
    const isAttacking = lowAttack || highAttack || superAttack || evading

    if (isMoving && !isAttacking) {
      playAnimation(dash ? 'dash' : 'walk', 0.1)
    } else if (!isMoving && !isAttacking) {
      playAnimation('wait', 0.1)
    }

    if (!dash) {
      if (lowAttack) {
        playAnimation('atk01', 0.1)
      } else if (highAttack) {
        playAnimation('atk02', 0.1)
      } else if (superAttack) {
        playAnimation('atk03', 0.1)
      } else if (evading) {
        const evadeDirection = new Vector3(0, 0, 1)
          .applyQuaternion(groupRef.current.quaternion)
          .multiplyScalar(-0.5)
        groupRef.current.position.add(evadeDirection)
        setPosition(groupRef.current.position.toArray())
        playAnimation('skill02-shortversion', 0.15, 1, false)
      }
    } else if (dash && lowAttack) {
      playAnimation('skill05-03', 0)
    }
    if (highAttack) {
      playAnimation('atk02', 0.1, 0.5, false)
    }
  })

  return {}
}

export default useCharacterControls
