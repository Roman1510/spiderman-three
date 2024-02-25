import { useRef } from 'react'
import { useAnimations } from '@react-three/drei'
import { AnimationAction, AnimationClip, Group, LoopRepeat } from 'three'

type AnimationMapReturn = {
  playAnimation: (name: string, duration?: number) => void
}

const useAnimationMap = (
  animations: AnimationClip[],
  groupRef: React.RefObject<Group>
): AnimationMapReturn => {
  const { actions } = useAnimations(animations, groupRef)
  const previousActionRef = useRef<AnimationAction | null>(null)

  const playAnimation = (name: string, duration: number = 0.1) => {
    const currentActionName = `Armature|Armature|hero_spiderman01_S08@${name}|Base Layer`
    const currentAction = actions[currentActionName]

    if (!currentAction) {
      console.warn(`Animation ${name} not found.`)
      return
    }
    // set the current action to loop always
    currentAction.setLoop(LoopRepeat, Infinity)
    if (
      previousActionRef.current &&
      previousActionRef.current !== currentAction
    ) {
      const prevAction = previousActionRef.current
      // ensure previous action fades out to the current action
      prevAction.enabled = true
      currentAction.reset()
      currentAction.play()
      prevAction.crossFadeTo(currentAction, duration, true)
    } else if (!previousActionRef.current) {
      // if there's no previous action, simply play the current action
      currentAction.reset()
      currentAction.play()
    }
    // update the reference to the current action as the new previous action
    previousActionRef.current = currentAction
  }

  return { playAnimation }
}

export default useAnimationMap
