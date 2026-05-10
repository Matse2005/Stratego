"use client"
import useStrategoData from "@/hooks/useStrategoData"
import { getRandomColor } from "@/lib/stratego-functions"
import { useEffect, useSyncExternalStore } from "react"
import { Spinner } from "@/components/ui/spinner"
import { Card } from "@/components/card"
import { UpdateCard } from "@/components/update-card"
import { Card as CardType, Theme } from "@/types"
import { Dices } from "lucide-react"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"
import themes from "@/themes"
import { Button } from "@/components/ui/button"

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
    reset,
  } = useStrategoData()

  const isClient = useIsClient()

  useEffect(() => {
    handleSetColor(getRandomColor())
  }, [handleSetColor])

  if (loadingStratego || !isClient) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center gap-6">
        <Spinner className="size-14 text-primary" />
      </div>
    )
  }

  type ThemeOption = {
    label: string
    value: string
  }

  const themeOptions: ThemeOption[] = Object.entries(themes).map(
    ([key, t]) => ({
      label: t.name,
      value: key,
    })
  )

  return (
    <main className="mx-auto max-w-250 space-y-5 p-5">
      <div className="flex justify-between">
        <div className="flex items-center gap-1">
          <Button size="lg">Afdrukken</Button>
          <Button variant="secondary" onClick={reset} size="lg">
            Reset
          </Button>
        </div>
        <div className="flex items-center gap-1">
          <Combobox
            items={themeOptions}
            itemToStringValue={(themeOption: ThemeOption) => themeOption.label}
            onValueChange={(selected) =>
              handleSetTheme(
                selected
                  ? themes[selected.value]
                  : (themes["default"] ?? themes[0])
              )
            }
            value={themeOptions.find((o) => o.value === theme.id)}
          >
            <ComboboxInput className="h-9" placeholder="Selecteer een thema" />
            <ComboboxContent>
              <ComboboxEmpty>Geen thema&apos;s gevonden.</ComboboxEmpty>
              <ComboboxList>
                {(themeOption: ThemeOption) => (
                  <ComboboxItem key={themeOption.value} value={themeOption}>
                    {themeOption.label}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
          <div className="flex items-center divide-x overflow-hidden rounded-md border">
            <input
              type="color"
              value={color}
              onChange={(e) => handleSetColor(e.target.value)}
              className="h-9 w-9 shrink-0 border-none p-0 transition-opacity hover:opacity-80 [&::-moz-color-swatch]:border-none [&::-webkit-color-swatch]:border-none [&::-webkit-color-swatch-wrapper]:rounded-none [&::-webkit-color-swatch-wrapper]:p-0"
            />

            <div className="flex h-9 items-center px-3">
              <span className="text-sm font-medium text-muted-foreground">
                #
              </span>
              <input
                type="text"
                value={color.replace("#", "")}
                placeholder="000000"
                maxLength={6}
                className="w-20 bg-transparent font-mono text-sm outline-none placeholder:text-muted-foreground"
                onChange={(e) => handleSetColor("#" + e.target.value)}
              />
            </div>

            <button
              className="flex h-9 w-9 shrink-0 items-center justify-center text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              onClick={() => handleSetColor(getRandomColor())}
              aria-label="Random color"
            >
              <Dices className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
      <div className="grid w-full grid-cols-1 gap-0 md:grid-cols-2 lg:grid-cols-3">
        {[...Object.values(theme.cards)]?.map((card, index) => (
          <UpdateCard
            card={card}
            cards={theme.cards}
            key={index}
            onUpdateCard={(updatedCard: CardType) => {
              handleSetTheme({
                ...theme,
                cards: { ...theme.cards, [index]: updatedCard },
              } as Theme)
            }}
          >
            <Card
              card={card}
              cards={theme.cards}
              color={color}
              colorFg={fgColor}
            />
          </UpdateCard>
        ))}
      </div>
    </main>
  )
}
