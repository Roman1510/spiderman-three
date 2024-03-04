import Canvas from './components/Canvas'
import Spiderman from './components/Spiderman'
import Scene from './components/Scene'
import { CharacterProvider } from './context/CharacterProvider'
import { Float } from '@react-three/drei'
import JoypadButtons from './components/JoypadButtons'
import { Leva } from 'leva'
function App() {
  return (
    <div id="canvas-container">
      <CharacterProvider>
        <JoypadButtons />
        <Canvas>
          <Scene>
            <Float>
              <mesh scale={10} position={[80, 25, 130]}>
                <boxGeometry args={[1, 1, 1]} />
                <meshNormalMaterial />
              </mesh>
            </Float>
            <Float>
              <mesh scale={10} position={[180, 30, 230]}>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color={'orange'} />
              </mesh>
            </Float>
            <Float>
              <mesh scale={10} position={[-80, 35, 130]}>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color={'hotpink'} />
              </mesh>
            </Float>
            <Float>
              <mesh scale={10} position={[-180, 20, 230]}>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color={'orange'} />
              </mesh>
            </Float>
            <Spiderman />
          </Scene>
          <Leva collapsed hidden={true} />
          {/* <PerformanceMonitor perfMonitor/> */}
        </Canvas>
      </CharacterProvider>
    </div>
  )
}

export default App
