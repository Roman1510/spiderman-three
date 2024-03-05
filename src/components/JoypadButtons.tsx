import styled from '@emotion/styled'
import { useCharacter } from '../context/CharacterProvider'
import { Joystick } from 'react-joystick-component'
import { IJoystickUpdateEvent } from 'react-joystick-component/build/lib/Joystick'

// Styled-components for the parent container
const ControlsContainer = styled.div`
  position: fixed;
  bottom: 20px;
  left: 20px; /* Position the joystick on the left */
  right: 20px; /* Ensure buttons stay on the right */
  display: flex;
  justify-content: space-between; /* Space between joystick and buttons */
  align-items: center;
  z-index: 100000;
`

// Styled-components for the button container
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
`

// Styled-component for individual buttons, with an added prop for vertical offset
const Button = styled.button<{ large?: boolean; yOffset?: number }>`
  width: ${({ large }) => (large ? '80px' : '60px')};
  height: ${({ large }) => (large ? '80px' : '60px')};
  opacity: 0.6;
  border-radius: 50%;
  font-size: 12px;
  background-color: rgba(
    240,
    240,
    240,
    0.8
  ); // Making background slightly transparent
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  touch-action: manipulation;
  user-select: none;
  position: relative; // Allow for absolute positioning
  top: ${({ yOffset }) =>
    yOffset
      ? `${-yOffset}px`
      : '0'}; // Adjust vertical position based on yOffset prop
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2), 0 6px 20px rgba(0, 0, 0, 0.19); // Adding some shadow for the 3D effect
  &:active {
    background-color: #e0e0e0; /* Slightly darker on press for feedback */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); // Adjust shadow for pressed effect
  }
`

const JoypadButtons = () => {
  const { setControlState } = useCharacter()

  const onA = () => {
    setControlState('dash', true)
  }
  const onReleaseA = () => {
    setControlState('dash', false)
  }

  const onB = () => {
    setControlState('lowAttack', true)
  }
  const onReleaseB = () => {
    setControlState('lowAttack', false)
  }
  const onC = () => {
    setControlState('highAttack', true)
  }
  const onReleaseC = () => {
    setControlState('highAttack', false)
  }
  const onD = () => {
    setControlState('evading', true)
  }
  const onReleaseD = () => {
    setControlState('evading', false)
  }

  const onS = () => {
    setControlState('animationPlaying', true)
  }

  const clearMovement = () => {
    setControlState('moveForward', false)
    setControlState('moveBackward', false)
    setControlState('moveLeft', false)
    setControlState('moveRight', false)
  }

  const handleMove = (event: IJoystickUpdateEvent) => {
    // First, clear any existing movement states to avoid conflicts.
    clearMovement()

    // Straight movement handling using event.direction.
    switch (event.direction) {
      case 'FORWARD':
        setControlState('moveForward', true)
        break
      case 'BACKWARD':
        setControlState('moveBackward', true)
        break
      case 'LEFT':
        setControlState('moveLeft', true)
        break
      case 'RIGHT':
        setControlState('moveRight', true)
        break
      default:
        break // No action for undefined or diagonal through this method.
    }

    // Diagonal movement handling using x and y values.
    // Assuming `x` and `y` are normalized between -1 (left or down) and 1 (right or up).
    const x = event.x // Horizontal axis: left (<0) and right (>0)
    const y = event.y // Vertical axis: down (<0) and up (>0)

    // Threshold to determine significant movement for diagonals.
    const threshold = 0.5 // Adjust based on sensitivity preference.

    // Check for diagonal movement by combining axis values.
    if (Math.abs(x!) > threshold && Math.abs(y!) > threshold) {
      // Diagonal movement detected. Adjust states as needed.
      if (x! > 0 && y! > 0) {
        // Diagonal up-right.
        setControlState('moveForward', true)
        setControlState('moveRight', true)
      } else if (x! > 0 && y! < 0) {
        // Diagonal down-right.
        setControlState('moveBackward', true)
        setControlState('moveRight', true)
      } else if (x! < 0 && y! > 0) {
        // Diagonal up-left.
        setControlState('moveForward', true)
        setControlState('moveLeft', true)
      } else if (x! < 0 && y! < 0) {
        // Diagonal down-left.
        setControlState('moveBackward', true)
        setControlState('moveLeft', true)
      }
    }
  }

  const handleStop = () => {
    clearMovement() // Clear any movement when the joystick is released
  }
  return (
    <>
      <ControlsContainer>
        <Joystick
          size={100}
          sticky={false}
          baseColor="transparent"
          stickColor="gray"
          move={handleMove}
          stop={handleStop}
        ></Joystick>
        <ButtonContainer>
          <Button
            id="button-a"
            large
            onPointerDown={onA}
            onPointerLeave={onReleaseA}
          >
            Sprint
          </Button>
          <div style={{ display: 'flex', gap: '10px' }}>
            <Button
              id="button-b"
              onPointerDown={onB}
              onPointerLeave={onReleaseB}
            >
              Punch
            </Button>
            <Button
              id="button-c"
              onPointerDown={onC}
              onPointerLeave={onReleaseC}
            >
              Kick
            </Button>
            <Button
              id="button-c"
              onPointerDown={onD}
              onPointerLeave={onReleaseD}
            >
              Dodge
            </Button>
          </div>
          <Button yOffset={250} id="button-s" onPointerDown={onS}>
            S
          </Button>
        </ButtonContainer>
      </ControlsContainer>
    </>
  )
}

export default JoypadButtons
