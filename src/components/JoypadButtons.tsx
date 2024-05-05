import styled from '@emotion/styled'
import { useCharacter } from '../context/CharacterProvider'
import { Joystick } from 'react-joystick-component'
import { IJoystickUpdateEvent } from 'react-joystick-component/build/lib/Joystick'

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

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
`

const Button = styled.button<{ large?: boolean; yOffset?: number }>`
  width: ${({ large }) => (large ? '80px' : '60px')};
  height: ${({ large }) => (large ? '80px' : '60px')};
  opacity: 0.6;
  border-radius: 50%;
  font-size: 12px;
  background-color: rgba(240, 240, 240, 0.8);
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  touch-action: manipulation;
  user-select: none;
  position: relative;
  top: ${({ yOffset }) => (yOffset ? `${-yOffset}px` : '0')};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2), 0 6px 20px rgba(0, 0, 0, 0.19);
  &:active {
    background-color: #e0e0e0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
`

const JoypadButtons = () => {
  const { setControlState, setDirection } = useCharacter()

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

  const handleMove = (event: IJoystickUpdateEvent) => {
    const x = event.x ?? 0
    const y = event.y ?? 0

    const directionVector: [number, number, number] = [-x, 0, y]
    setDirection(directionVector)
  }

  const handleStop = () => {
    setDirection([0, 0, 0])
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
