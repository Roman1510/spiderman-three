import { PropsWithChildren, useMemo } from 'react'
import { useControls } from 'leva'
import { EffectComposer, Noise } from '@react-three/postprocessing'
import { extend, useLoader } from '@react-three/fiber'
import {
  MeshStandardMaterial,
  RepeatWrapping,
  TextureLoader,
  Vector3,
} from 'three'

import { useCharacterPosition } from '../context/CharacterProvider'

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
      value: 3,
      min: 0,
      max: 10,
      step: 0.1,
      label: 'Point Light Intensity',
    },
    pointLightPositionX: {
      value: 5,
      min: -1000,
      max: 1000,
      step: 1,
      label: 'X',
    },
    pointLightPositionY: {
      value: 5,
      min: 0,
      max: 100,
      step: 1,
      label: 'Y',
    },
    pointLightPositionZ: {
      value: 5,
      min: -1000,
      max: 1000,
      step: 1,
      label: 'Z',
    },
    planeColor: { value: '#c1b6b6', label: 'Plane Color' },
    planeReflectivity: {
      value: 0.5,
      min: 0,
      max: 1,
      step: 0.1,
      label: 'Plane Reflectivity',
    },
    noiseAmount: {
      value: 0.06,
      min: 0,
      max: 0.1,
      step: 0.01,
      label: 'Noise Amount',
    },
  })

  const { position } = useCharacterPosition()

  const pointLightPosition = useMemo(
    () => new Vector3(position[0], 30, position[2]),
    [position]
  )

  const texture = useLoader(TextureLoader, './texture.jpg')

  texture.wrapS = texture.wrapT = RepeatWrapping // Enable wrapping
  texture.repeat.set(32, 32)
  return (
    <>
      <ambientLight intensity={ambientLightIntensity} />
      <pointLight
        position={pointLightPosition}
        intensity={2000}
        distance={50}
        decay={1.8}
      />

      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[3000, 3000]} />
        <meshStandardMaterial
          map={texture}
          color={planeColor}
          metalness={planeReflectivity}
        />
      </mesh>
      {children}

      <EffectComposer>
        <Noise opacity={noiseAmount} />
      </EffectComposer>
    </>
  )
}
