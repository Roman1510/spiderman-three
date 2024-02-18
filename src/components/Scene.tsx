import { PropsWithChildren } from 'react'
import { useControls } from 'leva'

export default function Scene({ children }: PropsWithChildren) {
  const {
    ambientLightIntensity,
    pointLightIntensity,
    pointLightPositionX,
    pointLightPositionY,
    pointLightPositionZ,
  } = useControls({
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
      <gridHelper args={[100]} />
      {/* Gray Plane */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]} // Rotate the plane to be horizontal
        position={[0, 0, 0]} // Position it at the ground level
      >
        <planeGeometry args={[100, 100]} /> {/* Size of the plane */}
        <meshStandardMaterial color={'gray'} /> {/* Gray color */}
      </mesh>
      {children}
    </>
  )
}
