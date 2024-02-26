import React, { useRef, useMemo, useEffect } from 'react'
import { useFrame, extend } from '@react-three/fiber'
import {
  InstancedMesh,
  BoxGeometry,
  MeshStandardMaterial,
  Object3D,
} from 'three'

extend({ BoxGeometry, MeshStandardMaterial })

interface FloatingMeshesProps {
  count?: number
  area?: number
  yPosition?: number // Added prop for fixed Y position
}

const FloatingMeshes: React.FC<FloatingMeshesProps> = ({
  count = 100,
  area = 2000,
  yPosition = 10,
}) => {
  const meshRef = useRef<InstancedMesh>(null)
  const dummy = useMemo(() => new Object3D(), [])

  useEffect(() => {
    if (!meshRef.current) return

    for (let i = 0; i < count; i++) {
      const x = Math.random() * area - area / 2
      const z = Math.random() * area - area / 2

      dummy.position.set(x, yPosition, z) // Use the yPosition prop for a fixed Y offset
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)
    }

    meshRef.current.instanceMatrix.needsUpdate = true
  }, [count, area, dummy, yPosition]) // Include yPosition in the dependency array

  useFrame(() => {
    if (!meshRef.current) return

    const time = Date.now() * 0.001

    for (let i = 0; i < count; i++) {
      meshRef.current.getMatrixAt(i, dummy.matrix)
      dummy.position.y = yPosition + Math.sin(time + i * 0.1) * 0.5 // Adjust Y position based on yPosition prop
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)
    }

    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="royalblue" />
    </instancedMesh>
  )
}

export default FloatingMeshes
