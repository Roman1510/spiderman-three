import { useRef } from 'react'
import { useAnimations } from '@react-three/drei'
import { AnimationAction, AnimationClip, Group, LoopRepeat } from 'three'

const getAnimationsMap = (
  animations: AnimationClip[],
  groupRef: React.RefObject<Group>
) => {
  const { actions } = useAnimations(animations, groupRef)
  const previousActionRef = useRef<AnimationAction | null>(null)

  const playAnimation = (
    name: string,
    transitionDuration: number = 0.1,
    duration?: number
  ) => {
    const currentActionName = `Armature|Armature|hero_spiderman01_S08@${name}|Base Layer`
    const currentAction = actions[currentActionName]

    if (!currentAction) {
      console.warn(`Animation ${name} not found.`)
      return
    }
    // set the current action to loop always
    currentAction.setLoop(LoopRepeat, Infinity)

    if (duration) {
      // Calculate timeScale based on original animation duration and desired duration
      const clipDuration = currentAction.getClip().duration
      const timeScale = clipDuration / duration
      currentAction.timeScale = timeScale

      // When the animation is clamped, it will stop at the end of its duration
      currentAction.clampWhenFinished = true
      currentAction.loop = LoopRepeat
    } else {
      // Reset to default if no specific duration is set
      currentAction.timeScale = 1
      currentAction.clampWhenFinished = false
    }

    if (
      previousActionRef.current &&
      previousActionRef.current !== currentAction
    ) {
      const prevAction = previousActionRef.current
      // ensure previous action fades out to the current action
      prevAction.enabled = true
      currentAction.reset()
      currentAction.play()
      prevAction.crossFadeTo(currentAction, transitionDuration, true)
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

export default getAnimationsMap
