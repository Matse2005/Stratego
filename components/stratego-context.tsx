"use client"

import { getTextColor } from "@/lib/stratego-functions"
import themes from "@/themes"
import { Theme } from "@/types"
import {
  createContext,
  useCallback,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react"

interface StrategoContextProps {
  theme: Theme
  color: string
  fgColor: string
  loadingStratego: boolean
  handleSetTheme: (theme: Theme) => void
  handleSetColor: (color: string) => void
}

function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  )
}

const StrategoContext = createContext<StrategoContextProps | null>(null)

const StrategoContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const isClient = useIsClient()
  const [theme, setTheme] = useState<Theme>(themes["default"] ?? themes[0])
  const [color, setColor] = useState<string>("#4a90e2")
  const [fgColor, setFgColor] = useState<string>(getTextColor(color))

  const handleSetTheme = useCallback((theme: Theme) => {
    setTheme(theme)
  }, [])
  const handleSetColor = useCallback((color: string) => {
    setColor(color)
    setFgColor(getTextColor(color))
  }, [])

  const contextValue = useMemo<StrategoContextProps>(
    () => ({
      theme,
      color,
      fgColor,
      loadingStratego: !isClient,
      handleSetTheme,
      handleSetColor,
    }),
    [theme, color, fgColor, isClient, handleSetTheme, handleSetColor]
  )

  return (
    <StrategoContext.Provider value={contextValue}>
      {children}
    </StrategoContext.Provider>
  )
}

export { StrategoContextProvider, StrategoContext }
