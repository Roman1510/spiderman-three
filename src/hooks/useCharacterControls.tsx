import { useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { AnimationClip, Group, MathUtils, Vector3 } from 'three'
import getAnimationsMap from '../helpers/getAnimationsMap' // Adjust path as necessary
import { useCharacter } from '../context/CharacterProvider'

const useCharacterControls = (
  groupRef: React.RefObject<Group>,
  animations: AnimationClip[]
) => {
  const { playAnimation } = getAnimationsMap(animations, groupRef)
  const { setPosition, controls, setControlState } = useCharacter()

  const {
    moveBackward,
    moveForward,
    moveLeft,
    moveRight,
    dash,
    lowAttack,
    highAttack,
    evading,
    animationPlaying,
  } = controls

  useFrame((_state, delta) => {
    if (!groupRef.current || animationPlaying) return

    const baseSpeed = dash ? 2.5 : 1.3
    const speed = baseSpeed * delta * 40
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
    const isAttacking = lowAttack || highAttack || animationPlaying || evading

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
      } else if (evading) {
        const evadeDirection = new Vector3(0, 0, 1)
          .applyQuaternion(groupRef.current.quaternion)
          .multiplyScalar(-0.23)
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

  useEffect(() => {
    console.log('timer set')
    let timeOut: ReturnType<typeof setTimeout>

    if (animationPlaying) {
      playAnimation('skill01', 0.1, 1.9, false)

      timeOut = setTimeout(() => {
        setControlState('animationPlaying', false)
      }, 2000)
    }

    return () => {
      if (timeOut) clearTimeout(timeOut)
    }
  }, [animationPlaying])

  return {}
}

export default useCharacterControls
