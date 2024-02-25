import Canvas from './components/Canvas'
import Spiderman from './components/Spiderman'
import Scene from './components/Scene'
import { CharacterProvider } from './context/CharacterProvider'

function App() {
  return (
    <div id="canvas-container">
      <CharacterProvider>
        <Canvas>
          <Scene>
            <Spiderman />
          </Scene>
        </Canvas>
      </CharacterProvider>
    </div>
  )
}

export default App
