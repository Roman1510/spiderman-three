import { useGLTF } from '@react-three/drei'
import { useGraph } from '@react-three/fiber'
import { useMemo } from 'react'
import * as THREE from 'three'
import { SkeletonUtils } from 'three/examples/jsm/Addons.js'

interface SkinnedMeshClone {
  scene: THREE.Group
  materials: { [name: string]: THREE.Material }
  animations: THREE.AnimationClip[]
  nodes: { [name: string]: THREE.Object3D }
}

export function useSkinnedMeshClone(path: string): SkinnedMeshClone {
  const gltf = useGLTF(path)
  const { scene, materials, animations } = gltf

  const clonedScene = useMemo(
    () => SkeletonUtils.clone(scene) as THREE.Group,
    [scene]
  )

  const { nodes } = useGraph(clonedScene)

  return { scene: clonedScene, materials, animations, nodes }
}
