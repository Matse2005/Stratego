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
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { ArrowLeftRight } from "lucide-react";

function sortNumbers(arr) {
  arr.sort(function (a, b) {
    return a - b;
  });
  return arr; // Return the sorted array
}

export function UpdateableCard({ card, cards, color, colorFg, changeCard }) {
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
        <Card
          key={card.id}
          card={card}
          cards={cards}
          color={color}
          colorFg={colorFg}
        />
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Bewerk {card.name}</DialogTitle>
          <DialogDescription>
            Bewerk {card.name} volledig naar je eigen wensen.
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
          <small>Klik op een kaart deze om te veranderen van kant</small>
          <div className="grid grid-cols-2 text-sm gap-x-2">
            <div className="h-full py-2 border rounded-lg">
              {card.wins.map((win) => (
                <div
                  key={win}
                  className="relative px-3 py-1 hover:bg-gray-100 group hover:cursor-pointer"
                  onClick={() => {
                    changePlace(win, true);
                  }}
                >
                  <p className="pr-6">{cards[win].name}</p>
                  <ArrowLeftRight className="absolute hidden w-4 h-5 text-gray-500 transform -translate-y-1/2 group-hover:block top-1/2 right-2" />
                </div>
              ))}
            </div>
            <div className="h-full py-2 border rounded-lg">
              {card.loses.map((lose) => (
                <div
                  key={lose}
                  className="relative px-3 py-1 hover:bg-gray-100 group hover:cursor-pointer"
                  onClick={() => {
                    changePlace(lose, false);
                  }}
                >
                  <p className="pr-6">{cards[lose].name}</p>
                  <ArrowLeftRight className="absolute hidden w-4 h-5 text-gray-500 transform -translate-y-1/2 group-hover:block top-1/2 right-2" />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
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
      </DialogContent>
    </Dialog>
  );
}
