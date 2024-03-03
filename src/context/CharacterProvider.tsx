import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from 'react'

export interface CharacterControls {
  moveForward: boolean
  moveBackward: boolean
  moveLeft: boolean
  moveRight: boolean
  dash: boolean
  lowAttack: boolean
  highAttack: boolean
  evading: boolean
  animationPlaying: boolean
}
export type CharacterContextType = {
  position: number[]
  setPosition: React.Dispatch<React.SetStateAction<number[]>>

  controls: CharacterControls
  setControlState: (control: keyof CharacterControls, state: boolean) => void
}

const CharacterContext = createContext<CharacterContextType | undefined>(
  undefined
)

export const CharacterProvider = ({ children }: PropsWithChildren<{}>) => {
  const [position, setPosition] = useState<number[]>([0, 0, 0])
  const [controls, setControls] = useState<CharacterControls>({
    moveForward: false,
    moveBackward: false,
    moveLeft: false,
    moveRight: false,
    dash: false,
    lowAttack: false,
    highAttack: false,
    evading: false,
    animationPlaying: false,
  })

  const setControlState = (
    control: keyof CharacterControls,
    state: boolean
  ) => {
    setControls((prev) => ({ ...prev, [control]: state }))
  }

  return (
    <CharacterContext.Provider
      value={{ position, setPosition, controls, setControlState }}
    >
      {children}
    </CharacterContext.Provider>
  )
}

export const useCharacter = () => {
  const context = useContext(CharacterContext)
  if (context === undefined) {
    throw new Error('useCharacter must be used within a CharacterProvider')
  }
  return context
}
