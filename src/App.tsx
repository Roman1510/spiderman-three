import Canvas from './components/Canvas'
import Spiderman from './components/Spiderman'
import Scene from './components/Scene'

function App() {
  return (
    <div id="canvas-container">
      <Canvas>
        <Scene>
          <Spiderman />
        </Scene>
      </Canvas>
    </div>
  )
}

export default App
