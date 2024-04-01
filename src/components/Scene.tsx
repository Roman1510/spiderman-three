import { PropsWithChildren, useMemo } from 'react'
import { useControls } from 'leva'
import { extend, useLoader } from '@react-three/fiber'
import {
  MeshStandardMaterial,
  RepeatWrapping,
  TextureLoader,
  Vector3,
} from 'three'

import { useCharacter } from '../context/CharacterProvider'

import { EffectComposer, Noise, Vignette } from '@react-three/postprocessing'

extend({ MeshStandardMaterial })

export default function Scene({ children }: PropsWithChildren) {
  const { position } = useCharacter()
  const {
    ambientLightIntensity,
    planeColor,
    planeReflectivity,
    pointLightIntensity,
    pointLightDistance,
  } = useControls('Scene settings', {
    ambientLightIntensity: {
      value: 0.5,
      min: 0,
      max: 4,
      step: 0.1,
      label: 'Ambient Light Intensity',
    },
    pointLightIntensity: {
      value: 6000,
      min: 0,
      max: 10000,
      step: 2,
      label: 'Point Light Intensity',
    },
    pointLightDistance: {
      value: 3500,
      min: 0,
      max: 10000,
      step: 2,
      label: 'Point Light distance',
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
      max: 0.3,
      step: 0.01,
      label: 'Noise Amount',
    },
  })

  const pointLightPosition = useMemo(
    () => new Vector3(position[0], 30, position[2]),
    [position]
  )
  const pointLight2Position = useMemo(
    () => new Vector3(position[0], 5, position[2] - 5),
    [position]
  )

  const texture = useLoader(TextureLoader, './texture.jpg')

  texture.wrapS = texture.wrapT = RepeatWrapping // Enable wrapping
  texture.repeat.set(10, 10)
  return (
    <>
      <ambientLight intensity={ambientLightIntensity} />
      <pointLight
        position={pointLightPosition}
        intensity={pointLightIntensity}
        distance={pointLightDistance}
        decay={1.8}
      />
      <pointLight
        position={pointLight2Position}
        intensity={100}
        distance={100}
        decay={1}
      />

      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
        <boxGeometry args={[3000, 3000, 1]} />
        <meshStandardMaterial
          map={texture}
          color={planeColor}
          metalness={planeReflectivity}
        />
      </mesh>
      {children}

      <EffectComposer multisampling={0} disableNormalPass={true}>
        <Noise opacity={0.045} />
        <Vignette eskil={false} offset={0.4} darkness={0.5} />
      </EffectComposer>
    </>
  )
}
