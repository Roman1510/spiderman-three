import Canvas from './components/Canvas'
import Spiderman from './components/Spiderman'
import Scene from './components/Scene'
import { CharacterProvider } from './context/CharacterProvider'
import JoypadButtons from './components/JoypadButtons'
import { Zombie } from './components/Zombie'
import { useIsMobile } from './hooks/useIsMobile'

function App() {
  const isMobile = useIsMobile()

  return (
    <div id="canvas-container">
      <CharacterProvider>
        {isMobile && <JoypadButtons />}
        <Canvas>
          <Scene>
            <Spiderman />
            <Zombie
              key="zombie1"
              rotation={[0, Math.PI / 2, 0]}
              scale={10}
              position={[-30, 0, 40]}
            />
            <Zombie
              key="zombie2"
              rotation={[0, -Math.PI / 2, 0]}
              scale={10}
              position={[30, 0, 40]}
            />
          </Scene>
          {/* <PerformanceMonitor perfMonitor/> */}
        </Canvas>
      </CharacterProvider>
    </div>
  )
}

export default App
