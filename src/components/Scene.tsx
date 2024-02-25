import { PropsWithChildren } from 'react'
import { useControls } from 'leva'
import { EffectComposer, Noise } from '@react-three/postprocessing'
import { extend } from '@react-three/fiber'
import { MeshStandardMaterial } from 'three'

extend({ MeshStandardMaterial })

export default function Scene({ children }: PropsWithChildren) {
  const {
    ambientLightIntensity,
    pointLightIntensity,
    pointLightPositionX,
    pointLightPositionY,
    pointLightPositionZ,
    planeColor,
    planeReflectivity,
    noiseAmount,
  } = useControls('Scene settings', {
    ambientLightIntensity: {
      value: 0.5,
      min: 0,
      max: 1,
      step: 0.1,
      label: 'Ambient Light Intensity',
    },
    pointLightIntensity: {
      value: 0.8,
      min: 0,
      max: 2,
      step: 0.1,
      label: 'Point Light Intensity',
    },
    pointLightPositionX: { value: 5, min: -10, max: 10, step: 1, label: 'X' },
    pointLightPositionY: { value: 5, min: -10, max: 20, step: 1, label: 'Y' },
    pointLightPositionZ: { value: 5, min: -10, max: 10, step: 1, label: 'Z' },
    planeColor: { value: '#be9898', label: 'Plane Color' },
    planeReflectivity: {
      value: 0.5,
      min: 0,
      max: 1,
      step: 0.1,
      label: 'Plane Reflectivity',
    },
    noiseAmount: {
      value: 0.02,
      min: 0,
      max: 0.1,
      step: 0.01,
      label: 'Noise Amount',
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
        <meshStandardMaterial
          color={planeColor}
          metalness={planeReflectivity}
        />
      </mesh>
      {children}

      {/* Post-processing effect */}
      <EffectComposer>
        <Noise opacity={noiseAmount} />
      </EffectComposer>
    </>
  )
}
