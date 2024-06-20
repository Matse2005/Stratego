"use client";

import { Card } from "@/components/Cards";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";
import { ArrowLeftRight } from "lucide-react";

export function UpdateableCard({
  card,
  cards,
  color,
  colorFg,
  changeCard,
  deleteCard,
  cantBeDeleted = null,
}) {
  const changePlace = (character, win) => {
    console.log(character + " " + (win ? "It is a win" : "It is a lose"));

    // Create copies of wins and loses arrays to avoid direct state mutation
    let wins = [...card.wins];
    let loses = [...card.loses];

    if (win) {
      // Remove the character from the wins array if present
      wins = wins.filter((num) => num !== character);
      // Add the character to the loses array if not present
      loses.push(character);

      loses.sort(function (a, b) {
        return a - b;
      });
    } else {
      // Remove the character from the loses array if present
      loses = loses.filter((num) => num !== character);
      // Add the character to the wins array if not present
      // if (!wins.includes(character)) {
      wins.push(character);
      // }
      // Sort wins array naturally
      wins.sort(function (a, b) {
        return a - b;
      });
    }

    // Log the updated arrays
    console.log("Updated wins: ", wins);
    console.log("Updated loses: ", loses);

    // Call changeCard to update the state in the parent component
    changeCard(card.id, "wins", wins);
    changeCard(card.id, "loses", loses);

    // Return or update the card object with the new arrays
    return { ...card, wins, loses };
  };

  return (
    <Dialog>
      <DialogTrigger>
        <div class="relative group h-full">
          <Card
            key={card.id}
            card={card}
            cards={cards}
            color={color}
            colorFg={colorFg}
          />
          <div class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition-opacity">
            Klik om te bewerken
          </div>
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
        <div>
          <Label htmlFor="name">Naam</Label>
          <Input
            defaultValue={card.name}
            id="name"
            name="name"
            onChange={(e) => {
              changeCard(card.id, "name", e.target.value);
            }}
          />
        </div>
        <div>
          <Label htmlFor="amount">Aantal kaartjes</Label>
          <Input
            defaultValue={card.amount}
            type="number"
            id="amount"
            name="amount"
            onChange={(e) => {
              changeCard(card.id, "amount", Number(e.target.value));
            }}
          />
        </div>
        <div>
          <Label htmlFor="image">Afbeelding</Label>
          <Input
            defaultValue={card.image}
            id="image"
            name="image"
            onChange={(e) => {
              changeCard(card.id, "image", e.target.value);
            }}
          />
        </div>
        <div>
          <div className="">
            <Label htmlFor="image">Winst en verlies</Label>
          </div>
          <small className="text-gray-700">
            Klik op een kaart deze om te veranderen van kant
          </small>
          <div className="grid grid-cols-2 text-sm gap-x-2">
            <div className="h-full">
              <p>Winst</p>
              <div className="h-full py-2 border rounded-lg">
                {card.wins.map((win) => (
                  <div
                    key={win}
                    className="relative px-3 py-1 hover:bg-gray-100 group hover:cursor-pointer"
                    onClick={() => {
                      changePlace(win, true);
                    }}
                  >
                    <p className="pr-6">
                      {(cards[win]?.numberVisible
                        ? cards[win]?.id + ". "
                        : "") + cards[win]?.name}
                    </p>
                    <ArrowLeftRight className="absolute hidden w-4 h-5 text-gray-500 transform -translate-y-1/2 group-hover:block top-1/2 right-2" />
                  </div>
                ))}
              </div>
            </div>
            <div className="h-full">
              <p>Verlies</p>
              <div className="h-full py-2 border rounded-lg">
                {card.loses.map((lose) => (
                  <div
                    key={lose}
                    className="relative px-3 py-1 hover:bg-gray-100 group hover:cursor-pointer"
                    onClick={() => {
                      changePlace(lose, false);
                    }}
                  >
                    <p className="pr-6">
                      {(cards[lose]?.numberVisible
                        ? cards[lose]?.id + ". "
                        : "") + cards[lose]?.name}{" "}
                    </p>
                    <ArrowLeftRight className="absolute hidden w-4 h-5 text-gray-500 transform -translate-y-1/2 group-hover:block top-1/2 right-2" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center mt-6 space-x-2">
          <Checkbox
            id="touch"
            checked={card.canTouch}
            onCheckedChange={() => {
              changeCard(card.id, "canTouch", !card.canTouch);
            }}
          />
          <label
            htmlFor="touch"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Deze kaart kan tikken
          </label>
        </div>
        {cantBeDeleted !== null && !cantBeDeleted.includes(card.id) && (
          <>
            <div class="flex items-center justify-center my-4">
              <div class="border-t border-gray-300 flex-grow mr-2"></div>
              <span class="px-2 text-gray-600 text-xs">Of</span>
              <div class="border-t border-gray-300 flex-grow ml-2"></div>
            </div>

            <DialogClose asChild>
              <Button
                className="w-full bg-red-700 hover:bg-red-600"
                onClick={() => {
                  deleteCard();
                }}
              >
                Verwijderen
              </Button>
            </DialogClose>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
