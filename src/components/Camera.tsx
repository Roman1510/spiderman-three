import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useCharacter } from '../context/CharacterProvider'
import { PerspectiveCamera } from '@react-three/drei'
import { useControls } from 'leva'
import { CameraHelper, PerspectiveCamera as PerspectiveCameraType } from 'three'

export const Camera: React.FC = () => {
  const { position } = useCharacter()
  const { camera, scene } = useThree()

  const { near, far, helper, xOffset, yOffset, zOffset } = useControls(
    'Camera',
    {
      near: { value: 0.1, min: 0.1, max: 100, step: 0.1 },
      far: { value: 1000, min: 100, max: 5000, step: 100 },
      helper: false,
      xOffset: { value: 0, min: -100, max: 100, step: 1 },
      yOffset: { value: 85, min: 0, max: 200, step: 1 },
      zOffset: { value: -90, min: -500, max: 0, step: 1 },
    }
  )

  const cameraRef = useRef<PerspectiveCameraType>(null)

  useFrame(() => {
    if (cameraRef.current) {
      camera.position.set(
        position[0] + xOffset,
        position[1] + yOffset,
        position[2] + zOffset
      )

      camera.lookAt(...(position as [number, number, number]))

      camera.near = near
      camera.far = far
      camera.updateProjectionMatrix()

      if (helper) {
        const camHelper = new CameraHelper(camera)
        scene.add(camHelper)

        return () => {
          if (camHelper) scene.remove(camHelper)
        }
      }
    }
  })

  useEffect(() => {
    if (cameraRef.current) {
      cameraRef.current.position.set(...(position as [number, number, number]))
    }
  }, [position])

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      fov={75}
      position={
        [
          position[0] + xOffset,
          position[1] + yOffset,
          position[2] + zOffset,
        ] as [number, number, number]
      }
      near={near}
      far={far}
    />
  )
}
