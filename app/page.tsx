"use client"
import { Button } from "@/components/ui/button"
import useStrategoData from "@/hooks/useStrategoData"
import { getRandomColor } from "@/lib/stratego-functions"
import { useEffect, useSyncExternalStore } from "react"

function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  )
}

export default function Page() {
  const {
    theme,
    handleSetTheme,
    color,
    handleSetColor,
    fgColor,
    loadingStratego,
  } = useStrategoData()

  const isClient = useIsClient()

  useEffect(() => {
    handleSetColor(getRandomColor())
  }, [handleSetColor])

  if (loadingStratego || !isClient) {
    return <p>Loading</p>
  }

  return (
    <div className="flex min-h-svh p-6">
      <div className="flex max-w-md min-w-0 flex-col gap-4 text-sm leading-loose">
        <div>
          <h1 className="font-medium">Project ready!</h1>
          <p>You may now add components and start building.</p>
          <p>We&apos;ve already added the button component for you.</p>
          <p>{theme.name}</p>
          <p>{color}</p>
          <p>{fgColor}</p>
          <div style={{ backgroundColor: color, color: fgColor }}>
            <p>Testing</p>
          </div>
          <Button className="mt-2">Button</Button>
        </div>
        <div className="font-mono text-xs text-muted-foreground">
          (Press <kbd>d</kbd> to toggle dark mode)
        </div>
      </div>
    </div>
  )
}
