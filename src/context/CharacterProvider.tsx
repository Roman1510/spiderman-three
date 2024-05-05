import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

export interface CharacterControls {
  directionVector: [number, number, number]
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

  setDirection: (newDirection: [number, number, number]) => void
}

const CharacterContext = createContext<CharacterContextType | undefined>(
  undefined
)

export const CharacterProvider = ({ children }: PropsWithChildren<{}>) => {
  const [position, setPosition] = useState<number[]>([0, 0, 0])
  const [positionChanged, setPositionChanged] = useState(false)
  const [controls, setControls] = useState<CharacterControls>({
    directionVector: [0, 0, 0],
    dash: false,
    lowAttack: false,
    highAttack: false,
    evading: false,
    animationPlaying: false,
  })

  const setControlState = (
    control: keyof CharacterControls,
    state: boolean | [number, number, number]
  ) => {
    setControls((prev) => ({ ...prev, [control]: state }))
  }

  const setDirection = (newDirection: [number, number, number]) => {
    setControls((prevControls) => ({
      ...prevControls,
      directionVector: newDirection,
    }))
  }

  useEffect(() => {
    setPositionChanged(true)
  }, [position])

  useEffect(() => {
    const music = new Audio('/Music_Reverb.mp3')
    music.loop = true

    music.play().catch((error) => {
      console.error('Audio playback failed:', error)
    })
  }, [positionChanged])

  return (
    <CharacterContext.Provider
      value={{ position, setPosition, controls, setControlState, setDirection }}
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
