import { useEffect } from 'react'
import { useAnimations } from '@react-three/drei'
import { AnimationAction, AnimationClip, Group } from 'three'

const useAnimationMap = (
  animations: AnimationClip[],
  groupRef: React.RefObject<Group>
) => {
  const { actions } = useAnimations(animations, groupRef)

  useEffect(() => {
    if (!animations || !groupRef.current) return
  }, [animations, groupRef, actions])

  const getAnimation = (
    name: string
  ): {
    play: () => void
    reset: () => void
    stop: () => void
    fadeIn: (duration: number) => void
    fadeOut: (duration: number) => void
  } => {
    const actionName = `Armature|Armature|hero_spiderman01_S08@${name}|Base Layer`
    const action: AnimationAction | undefined = actions[actionName] || undefined // Explicitly convert null to undefined

    if (!action) {
      console.warn(`Animation ${name} not found.`)
      return {
        play: () => {},
        reset: () => {},
        stop: () => {},
        fadeIn: (_duration: number) => {},
        fadeOut: (_duration: number) => {},
      }
    }

    return {
      play: () => action.play(),
      reset: () => action.reset().play(),
      stop: () => action.stop(),
      fadeIn: (duration: number) => action.fadeIn(duration),
      fadeOut: (duration: number) => action.fadeOut(duration),
    }
  }

  return { getAnimation }
}

export default useAnimationMap
