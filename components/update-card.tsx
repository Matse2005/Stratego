import { Card } from "@/types"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group"
import { SearchIcon, ArrowLeftRight } from "lucide-react"
import { Label } from "./ui/label"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "./ui/checkbox"
import Image from "next/image"

type Props = {
  card: Card
  cards: Record<number, Card>
  onUpdateCard: (updatedCard: Card) => void
  children: React.ReactNode
}

export function UpdateCard({ card, cards, onUpdateCard, children }: Props) {
  function changeField<K extends keyof Card>(field: K, value: Card[K]) {
    onUpdateCard({ ...card, [field]: value })
  }

  function changePlace(character: number, moveTo: "wins" | "loses") {
    const from = moveTo === "wins" ? "loses" : "wins"
    const updated = {
      ...card,
      [from]: card[from].filter((n) => n !== character),
      [moveTo]: [
        ...card[moveTo].filter((n) => n !== character),
        character,
      ].sort((a, b) => a - b),
    }
    onUpdateCard(updated)
  }

  function cardLabel(id: number) {
    const c = cards[id]
    if (!c) return String(id)
    return c.numberVisible ? `${c.id}. ${c.name}` : c.name
  }

  return (
    <Dialog>
      <DialogTrigger className="group relative h-full">
        {children}
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100">
          Klik om te bewerken
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Bewerk {card.name}</DialogTitle>
          <DialogDescription>
            Bewerk {card.name} volledig naar wens, de wijzigingen zullen direct
            toegepast worden geen nood aan het klikken van een knop.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <Field>
            <FieldLabel>Naam</FieldLabel>
            <InputGroup>
              <InputGroupInput
                value={card.name}
                placeholder="Naam"
                onChange={(e) => changeField("name", e.target.value)}
              />
            </InputGroup>
          </Field>

          <Field>
            <FieldLabel>Aantal kaartjes</FieldLabel>
            <InputGroup>
              <InputGroupInput
                type="number"
                value={card.printAmount}
                placeholder="Aantal kaartjes"
                onChange={(e) =>
                  changeField("printAmount", Number(e.target.value))
                }
              />
            </InputGroup>
          </Field>

          <FieldGroup>
            <Field>
              <FieldLabel>Afbeelding</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  value={card.image}
                  placeholder="Afbeelding URL"
                  onChange={(e) => changeField("image", e.target.value)}
                />
              </InputGroup>
            </Field>
            {card.image && (
              <div className="relative mx-auto mb-4 h-36 w-full max-w-56 print:mb-2 print:h-24 print:max-w-32">
                <Image
                  src={card.image}
                  alt={card.name}
                  fill
                  className="object-contain"
                />
              </div>
            )}
          </FieldGroup>

          <div className="space-y-1.5">
            <Label>Winst en verlies</Label>
            <p className="text-xs text-muted-foreground">
              Klik op een kaart om deze van kant te wisselen.
            </p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {(["wins", "loses"] as const).map((side) => (
                <div key={side} className="space-y-1.5">
                  <div className="flex items-center gap-1.5">
                    <Badge
                      variant={side === "wins" ? "default" : "destructive"}
                      className="text-xs"
                    >
                      {side === "wins" ? "Wint van" : "Verliest van"}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {card[side].length}
                    </span>
                  </div>
                  <ScrollArea className="h-40 rounded-md border">
                    <div className="py-1">
                      {card[side].length === 0 && (
                        <p className="px-3 py-2 text-xs text-muted-foreground italic">
                          Geen kaarten
                        </p>
                      )}
                      {card[side].map((id) => (
                        <button
                          key={id}
                          type="button"
                          onClick={() =>
                            changePlace(id, side === "wins" ? "loses" : "wins")
                          }
                          className="group flex w-full items-center justify-between px-3 py-1.5 text-left text-sm hover:bg-accent hover:text-accent-foreground"
                        >
                          <span className="truncate">{cardLabel(id)}</span>
                          <ArrowLeftRight className="ml-2 size-3.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
                        </button>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              ))}
            </div>
          </div>

          <Field orientation="horizontal">
            <Checkbox
              id="canTap"
              name="canTap"
              checked={card.canTap}
              onCheckedChange={(checked) =>
                changeField("canTap", checked === true)
              }
            />
            <FieldLabel htmlFor="canTap">Deze kaart mag tikken.</FieldLabel>
          </Field>
        </div>
      </DialogContent>
    </Dialog>
  )
}
