import { useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { AnimationClip, Group, Quaternion, Vector3 } from 'three'
import getAnimationsMap from '../helpers/getAnimationsMap' // Adjust path as necessary
import { useCharacter } from '../context/CharacterProvider'

const useCharacterControls = (
  groupRef: React.RefObject<Group>,
  animations: AnimationClip[]
) => {
  const { playAnimation } = getAnimationsMap(animations, groupRef)
  const { setPosition, controls, setControlState } = useCharacter()

  const {
    directionVector,
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
    const direction = new Vector3(...directionVector)

    direction.normalize().multiplyScalar(speed)

    if (direction.length() > 0) {
      groupRef.current.position.add(direction)

      const targetRotation = new Vector3(
        direction.x,
        0,
        direction.z
      ).normalize()
      const quaternionTarget = new Quaternion().setFromUnitVectors(
        new Vector3(0, 0, 1),
        targetRotation
      )

      // Smoothly interpolate the current rotation towards the target rotation
      groupRef.current.quaternion.slerp(quaternionTarget, 0.1)

      setPosition(groupRef.current.position.toArray())
    }

    const isMoving = directionVector.some((component) => component !== 0)
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
  }, [animationPlaying, playAnimation, setControlState])

  return {}
}

export default useCharacterControls
