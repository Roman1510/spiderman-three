import { useState, useEffect } from 'react'

const useControlsChar = () => {
  const [movement, setMovement] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
  })

  useEffect(() => {
    const handleKeyDown = ({ key }: KeyboardEvent) => {
      switch (key) {
        case 'w':
          setMovement((m) => ({ ...m, forward: true }))
          break
        case 's':
          setMovement((m) => ({ ...m, backward: true }))
          break
        case 'a':
          setMovement((m) => ({ ...m, left: true }))
          break
        case 'd':
          setMovement((m) => ({ ...m, right: true }))
          break
        default:
          break
      }
    }

    const handleKeyUp = ({ key }: KeyboardEvent) => {
      switch (key) {
        case 'w':
          setMovement((m) => ({ ...m, forward: false }))
          break
        case 's':
          setMovement((m) => ({ ...m, backward: false }))
          break
        case 'a':
          setMovement((m) => ({ ...m, left: false }))
          break
        case 'd':
          setMovement((m) => ({ ...m, right: false }))
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  return movement
}

export default useControlsChar
