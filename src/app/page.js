"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/Cards";
import { UpdateableCard } from "@/components/UpdateableCard";
import { Button } from "@/components/ui/button";
import { Dices, Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";
import { ThemeSwitch } from "@/components/ThemeSwitch";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { leaveWarning } from "@/lib/stratego";
import { themes, list as themesList } from "@/lib/themes";

function getTextColor(backgroundColor) {
  const rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(backgroundColor);
  const r = parseInt(rgb[1], 16);
  const g = parseInt(rgb[2], 16);
  const b = parseInt(rgb[3], 16);
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return lum < 128 ? "white" : "black";
}

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export default function Home() {
  const [cards, setCards] = useState(themes.default);
  const [color, setColor] = useState("#ffffff");
  const [colorFg, setColorFg] = useState(getTextColor("#ffffff"));
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    var newColor = getRandomColor();
    setColor(newColor);
    setColorFg(getTextColor(newColor));
    setIsClient(true);
  }, []);

  useEffect(() => {
    leaveWarning();
  }, []);

  const changeCard = (id, key, value) => {
    setCards((prevCards) => {
      const updatedCards = { ...prevCards };
      updatedCards[id] = { ...updatedCards[id], [key]: value };
      return updatedCards;
    });
    console.log(cards[id]);
  };

  const changeTheme = (theme) => {
    setCards(themes[theme]);
    console.log(cards);
  };

  const changeColor = (color) => {
    setColor(color);
    setColorFg(getTextColor(color));
  };

  return (
    <main className="max-w-[1000px] print:max-w-[600px] mx-auto py-10 print:py-0">
      <div className="px-5 space-y-5 lg:px-0 print:px-0 print:hidden">
        <nav className="mx-auto bg-white rounded-lg max-w-screen-2xl">
          <div className="px-4 mx-auto sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center shrink-0 gap-x-3">
                <a href="/">
                  <img
                    src="https://jeugdwerk.org/images/logo/logo.colorful.png"
                    className="block w-auto fill-current h-9"
                  />
                </a>
                <h1 className="font-bold text-slate-900">Stratego kaartjes</h1>
              </div>
              <div className="items-center hidden space-x-0 sm:-my-px sm:ms-6 sm:flex">
                <Link
                  href="https://tools.jeugdwerk.org"
                  className="items-center px-3 py-1 text-base font-semibold transition-all duration-150 ease-in-out rounded-md text-slate-800 hover:bg-gray-100"
                >
                  Alle tools
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <Alert>
          <Info className="w-4 h-4" />
          <AlertTitle>Opgepast</AlertTitle>
          <AlertDescription>
            Alle grote schermen worden ondersteund, maar de stijlen zijn nog
            niet optimaal
          </AlertDescription>
        </Alert>

        <div className="w-full space-y-4 sm:space-y-0 sm:flex sm:items-center sm:justify-between">
          <div className="space-y-2 sm:items-center sm:space-x-2 sm:flex sm:space-y-0">
            <Button
              className="w-full sm:w-auto"
              onClick={() => {
                window.print();
              }}
            >
              Kaartjes printen
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="w-full">
                  Reset
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Ben je zeker dat wil resetten?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    actie kan niet ongedaan gemaakt worden. Dit zal wijzigingen
                    permanent verwijderen en zullen opnieuw toegepast moeten
                    worden.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      setCards(themes.default);
                    }}
                    variant="destructive"
                  >
                    Resetten
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          <div className="space-y-2 sm:flex sm:space-x-2 sm:items-center sm:space-y-0">
            <div className="w-full sm:max-w-xs">
              <ThemeSwitch themes={themesList} changeTheme={changeTheme} />
            </div>
            {isClient && (
              <div className="relative inset-0 z-40 w-full h-12 overflow-hidden border-none rounded-lg sm:max-w-xs right-4 bottom-6 form-control border-color">
                <Input
                  type="text"
                  value={color}
                  placeholder="Hexcode"
                  className="h-full px-6 font-medium bg-white rounded-lg pl-14"
                  onChange={(e) => changeColor(e.target.value)}
                />
                <input
                  type="color"
                  value={color}
                  onChange={(newColor) => {
                    changeColor(newColor.target.value);
                  }}
                  className="absolute transform -translate-y-1/2 border border-none rounded cursor-pointer top-1/2 w-7 h-7 left-4"
                  style={{ WebkitAppearance: "none" }}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute transform -translate-y-1/2 top-1/2 right-4"
                  onClick={() => {
                    changeColor(getRandomColor());
                  }}
                >
                  <Dices className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
        <div className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
          {[...Object.values(cards)]?.map((card) => (
            <UpdateableCard
              key={card.id}
              card={card}
              cards={cards}
              color={color}
              colorFg={colorFg}
              changeCard={changeCard}
            />
          ))}
        </div>
      </div>
      <div className="hidden grid-cols-3 bg-white print:grid">
        {[...Object.values(cards)]?.map((card) =>
          [...Array(card.amount)]?.map((e, i) => (
            <Card
              key={card.id + "_" + i}
              card={card}
              cards={cards}
              color={color}
              colorFg={colorFg}
            />
          ))
        )}
      </div>
    </main>
  );
}
