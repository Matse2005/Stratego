"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/Cards";
import { UpdateableCard } from "@/components/UpdateableCard";
import { Button } from "@/components/ui/button";
import { Dices, Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";

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

export default function Stratego() {
  const defaultCards = {
    0: {
      id: 0,
      name: "Bom",
      image: "/bom.png",
      wins: [1, 2, 4, 5, 6, 7, 8, 9, 10],
      loses: [3],
      canTouch: false,
      amount: 1,
      numberVisible: false,
    },
    1: {
      id: 1,
      name: "Spion",
      image: "/spion.png",
      wins: [10],
      loses: [0, 2, 3, 4, 5, 6, 7, 8, 9],
      canTouch: true,
      amount: 1,
      numberVisible: true,
    },
    2: {
      id: 2,
      name: "Verkenner",
      image: "/verkenner.png",
      wins: [1],
      loses: [0, 3, 4, 5, 6, 7, 8, 9, 10],
      canTouch: true,
      amount: 8,
      numberVisible: true,
    },
    3: {
      id: 3,
      name: "Mineur",
      image: "/mineur.png",
      wins: [0, 1, 2],
      loses: [4, 5, 6, 7, 8, 9, 10],
      canTouch: true,
      amount: 1,
      numberVisible: true,
    },
    4: {
      id: 4,
      name: "Sergeant",
      image: "/sergeant.png",
      wins: [1, 2, 3],
      loses: [0, 5, 6, 7, 8, 9, 10],
      canTouch: true,
      amount: 5,
      numberVisible: true,
    },
    5: {
      id: 5,
      name: "Luitenant",
      image: "/luitenant.png",
      wins: [1, 2, 3, 4],
      loses: [0, 6, 7, 8, 9, 10],
      canTouch: true,
      amount: 4,
      numberVisible: true,
    },
    6: {
      id: 6,
      name: "Kapitein",
      image: "/kapitein.png",
      wins: [1, 2, 3, 4, 5],
      loses: [0, 7, 8, 9, 10],
      canTouch: true,
      amount: 4,
      numberVisible: true,
    },
    7: {
      id: 7,
      name: "Majoor",
      image: "/majoor.png",
      wins: [1, 2, 3, 4, 5, 6],
      loses: [0, 8, 9, 10],
      canTouch: true,
      amount: 4,
      numberVisible: true,
    },
    8: {
      id: 8,
      name: "Kolonel",
      image: "/kolonel.png",
      wins: [1, 2, 3, 4, 5, 6, 7],
      loses: [0, 9, 10],
      canTouch: true,
      amount: 3,
      numberVisible: true,
    },
    9: {
      id: 9,
      name: "Generaal",
      image: "/generaal.png",
      wins: [1, 2, 3, 4, 5, 6, 7, 8],
      loses: [0, 10],
      canTouch: true,
      amount: 2,
      numberVisible: true,
    },
    10: {
      id: 10,
      name: "Maarschalk",
      image: "/maarschalk.png",
      wins: [2, 3, 4, 5, 6, 7, 8, 9],
      loses: [0, 1],
      canTouch: true,
      amount: 1,
      numberVisible: true,
    },
    99: {
      id: 99,
      name: "Vlag",
      image: "/vlag.png",
      wins: [],
      loses: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      canTouch: false,
      amount: 1,
      numberVisible: false,
    },
  };

  const [cards, setCards] = useState(defaultCards);
  const [color, setColor] = useState("#ffffff");
  const [colorFg, setColorFg] = useState(getTextColor("#ffffff"));
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Sync the initial color state and foreground color on the client side
    setColor(getRandomColor());
    setColorFg(getTextColor(color));
    setIsClient(true);
  }, []);

  const changeCard = (id, key, value) => {
    setCards((prevCards) => {
      const updatedCards = { ...prevCards };
      updatedCards[id] = { ...updatedCards[id], [key]: value };
      return updatedCards;
    });
  };

  const changeColor = (color) => {
    setColor(color);
    setColorFg(getTextColor(color));
  };

  return (
    <main className="max-w-[1000px] print:max-w-[500px] mx-auto py-10 print:py-0">
      <div className="space-y-5 print:hidden">
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
        {/* <Alert>
          <Info className="w-4 h-4" />
          <AlertTitle>Opgepast</AlertTitle>
          <AlertDescription>
            De formaten van de kaartjes kunnen verschillen van de uiteindelijke
            formaten tijdens afprinten, deze zal 9-12 kaartjes bevatten per A4
            pagina.
          </AlertDescription>
        </Alert> */}
        <Alert variant="destructive">
          <Info className="w-4 h-4" />
          <AlertTitle>Opgepast</AlertTitle>
          <AlertDescription>
            Je bevind jezelf op de ontwikkelings omgeving, dit is een product
            dat niet klaar is productie.
          </AlertDescription>
        </Alert>
        <Alert>
          <Info className="w-4 h-4" />
          <AlertTitle>Opgepast</AlertTitle>
          <AlertDescription>
            Op dit moment is alleen een groot scherm ondersteund.
          </AlertDescription>
        </Alert>

        <div className="flex items-center justify-between w-full">
          <Button
            onClick={() => {
              window.print();
            }}
          >
            Kaartjes printen
          </Button>
          {isClient && (
            <div className="relative inset-0 z-40 h-12 max-w-xs overflow-hidden border-none rounded-lg right-4 bottom-6 form-control border-color">
              <Input
                type="text"
                value={color}
                placeholder="Hexcode"
                className="w-full h-full px-6 font-medium bg-white rounded-lg pl-14"
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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
      <div className="hidden grid-cols-3 print:grid">
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
