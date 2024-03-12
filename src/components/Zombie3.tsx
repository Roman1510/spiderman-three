import * as THREE from 'three'
import { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    Mesh004: THREE.SkinnedMesh
    Mesh004_1: THREE.SkinnedMesh
    mixamorig5Hips: THREE.Bone
  }
  materials: {
    ['Ch10_body.004']: THREE.MeshPhysicalMaterial
    ['Ch10_body1.004']: THREE.MeshPhysicalMaterial
  }
}

export function Zombie3(props: JSX.IntrinsicElements['group']) {
  const group = useRef<THREE.Group>(null)
  const { nodes, materials, animations } = useGLTF('/zombie3.glb') as GLTFResult
  const { actions } = useAnimations(animations, group)
  console.log('actions', actions)
  useEffect(() => {
    actions['idle']?.play()
  }, [])
  return (
    <group ref={group} {...props} dispose={null}>
      <group name={props.name}>
        <group
          name={props.name}
          rotation={[Math.PI / 2, 0, 0]}
          userData={{ name: props.name }}
        >
          <group name="Ch10" userData={{ name: 'Ch10' }}>
            <skinnedMesh
              name="Mesh004"
              geometry={nodes.Mesh004.geometry}
              material={materials['Ch10_body.004']}
              skeleton={nodes.Mesh004.skeleton}
            />
            <skinnedMesh
              name="Mesh004_1"
              geometry={nodes.Mesh004_1.geometry}
              material={materials['Ch10_body1.004']}
              skeleton={nodes.Mesh004_1.skeleton}
            />
          </group>
          <primitive object={nodes.mixamorig5Hips} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/zombie3.glb')
