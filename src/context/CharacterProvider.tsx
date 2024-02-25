import { PropsWithChildren, createContext, useContext, useState } from 'react'

type CharacterContextType = {
  position: number[]
  setPosition: React.Dispatch<React.SetStateAction<number[]>>
}

const CharacterContext = createContext<CharacterContextType | undefined>(
  undefined
)

export const CharacterProvider = ({ children }: PropsWithChildren) => {
  const [position, setPosition] = useState<number[]>([0, 0, 0])

  return (
    <CharacterContext.Provider value={{ position, setPosition }}>
      {children}
    </CharacterContext.Provider>
  )
}

export const useCharacterPosition = () => {
  const context = useContext(CharacterContext)
  if (context === undefined) {
    throw new Error(
      'useCharacterPosition must be used within a CharacterProvider'
    )
  }
  return context
}
