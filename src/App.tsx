import Canvas from './components/Canvas'
import Spiderman from './components/Spiderman'
import Scene from './components/Scene'
import { CharacterProvider } from './context/CharacterProvider'
import { Float } from '@react-three/drei'
function App() {
  return (
    <div id="canvas-container">
      <CharacterProvider>
        <Canvas>
          <Scene>
            <Float>
              <mesh scale={10} position={[80, 5, 130]}>
                <boxGeometry args={[1, 1, 1]} />
                <meshNormalMaterial />
              </mesh>
            </Float>
            <Float>
              <mesh scale={10} position={[180, 10, 230]}>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color={'orange'} />
              </mesh>
            </Float>
            <Float>
              <mesh scale={10} position={[-80, 5, 130]}>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color={'hotpink'} />
              </mesh>
            </Float>
            <Float>
              <mesh scale={10} position={[-180, 10, 230]}>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color={'orange'} />
              </mesh>
            </Float>

            <Spiderman />
          </Scene>
        </Canvas>
      </CharacterProvider>
    </div>
  )
}

export default App
