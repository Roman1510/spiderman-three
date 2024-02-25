import { PropsWithChildren } from 'react'
import { useControls } from 'leva'

export default function Scene({ children }: PropsWithChildren) {
  const {
    ambientLightIntensity,
    pointLightIntensity,
    pointLightPositionX,
    pointLightPositionY,
    pointLightPositionZ,
  } = useControls('Scene settings', {
    ambientLightIntensity: {
      value: 10,
      min: 0,
      max: 10,
      step: 0.1,
      label: 'Ambient Light Intensity',
    },
    pointLightIntensity: {
      value: 5,
      min: 0,
      max: 10,
      step: 0.1,
      label: 'Point Light Intensity',
    },
    pointLightPositionX: {
      value: 1,
      min: -50,
      max: 50,
      step: 1,
      label: ' X',
    },
    pointLightPositionY: {
      value: 10,
      min: -50,
      max: 50,
      step: 1,
      label: ' Y',
    },
    pointLightPositionZ: {
      value: 1,
      min: -50,
      max: 50,
      step: 1,
      label: 'Z',
    },
  })

  return (
    <>
      <ambientLight intensity={ambientLightIntensity} />
      <pointLight
        position={[
          pointLightPositionX,
          pointLightPositionY,
          pointLightPositionZ,
        ]}
        intensity={pointLightIntensity}
      />

      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[2000, 2000]} />
        <meshToonMaterial color={'grey'} />
      </mesh>
      {children}
    </>
  )
}
