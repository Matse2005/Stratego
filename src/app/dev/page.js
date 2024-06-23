"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/Cards";
import { UpdateableCard } from "@/components/UpdateableCard";
import { Button } from "@/components/ui/button";
import { Dices, Info, ArrowLeftRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";
import { ThemeSwitch } from "@/components/ThemeSwitch";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { getTextColor, getRandomColor, leaveWarning } from "@/lib/stratego";
import {
  themes,
  list as themesList,
  cantBeDeleted,
  defaultCard,
} from "@/lib/themes";

export default function Stratego() {
  const [loading, SetLoading] = useState(true);
  const [cards, setCards] = useState(themes.default);
  const [color, setColor] = useState("#ffffff");
  const [colorFg, setColorFg] = useState(getTextColor("#ffffff"));
  const [isClient, setIsClient] = useState(false);
  const [newCard, setNewCard] = useState({
    id:
      [...Object.values(cards)]
        .filter((card) => card.id !== 99)
        .map((card) => card.id)
        .sort(function (a, b) {
          return b - a;
        })[0] + 1,
    name: "",
    image: "",
    wins: [...Object.values(cards)]
      .filter((card) => card.id !== 99)
      .map((card) => card.id),
    loses: [],
    canTouch: true,
    amount: null,
    numberVisible: true,
  });

  useEffect(() => {
    var newColor = getRandomColor();
    changeColor(newColor);
    setIsClient(true);
    SetLoading(false);
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
  };

  const changeTheme = (theme) => {
    setCards(themes[theme]);
  };

  const changeColor = (color) => {
    setColor(color);
    setColorFg(getTextColor(color));
  };

  const changeNewCard = (key, value) => {
    setNewCard((prevCard) => {
      return { ...prevCard, [key]: value };
    });
  };

  const addNewCard = () => {
    SetLoading(true);
    cards[newCard.id] = newCard;
    resetNewCard(newCard.id + 1);
    SetLoading(false);
  };

  const resetNewCard = (
    newId = [...Object.values(cards)]
      .filter((card) => card.id !== 99)
      .map((card) => card.id)
      .sort(function (a, b) {
        return b - a;
      })[0]
  ) => {
    setNewCard({
      id: newId,
      name: "",
      image: "",
      wins: [...Object.values(cards)]
        .filter((card) => card.id !== 99)
        .map((card) => card.id),
      loses: [],
      canTouch: true,
      amount: null,
      numberVisible: true,
    });
  };

  const deleteCard = () => {};

  const changePlace = (character, win) => {
    // Create copies of wins and loses arrays to avoid direct state mutation
    let wins = [...newCard.wins];
    let loses = [...newCard.loses];

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

    // Call changeCard to update the state in the parent component
    changeNewCard("wins", wins);
    changeNewCard("loses", loses);

    // Return or update the card object with the new arrays
    return { ...newCard, wins, loses };
  };

  return (
    <>
      {!loading ? (
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
                    <h1 className="font-bold text-slate-900">
                      Stratego kaartjes
                    </h1>
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
            <Alert variant="destructive">
              <Info className="w-4 h-4" />
              <AlertTitle>Opgepast</AlertTitle>
              <AlertDescription>
                Je bevind jezelf op de ontwikkelings omgeving, dit is een
                product dat niet klaar is productie.
              </AlertDescription>
            </Alert>
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
                  className="w-full sm:w-auto  h-[45px]"
                  onClick={() => {
                    window.print();
                  }}
                >
                  Kaartjes printen
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" className="w-full py-5 h-[48px]">
                      Reset
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Ben je zeker dat wil resetten?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        actie kan niet ongedaan gemaakt worden. Dit zal
                        wijzigingen permanent verwijderen en zullen opnieuw
                        toegepast moeten worden.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Annuleren</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => {
                          setCards(themes.default);
                        }}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Resetten
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="secondary"
                      className="w-full py-5 h-[48px]"
                    >
                      Toevoegen
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Voeg een kaart toe</DialogTitle>
                      <DialogDescription>
                        Voeg een nieuwe kaart toe, volledig naar je wensen
                      </DialogDescription>
                    </DialogHeader>
                    <div>
                      <Label htmlFor="name">Naam</Label>
                      <Input
                        defaultValue={newCard.name}
                        id="name"
                        name="name"
                        onChange={(e) => {
                          changeNewCard("name", e.target.value);
                        }}
                      />
                    </div>
                    <div>
                      <Label htmlFor="amount">Aantal kaartjes</Label>
                      <Input
                        defaultValue={newCard.amount}
                        type="number"
                        id="amount"
                        name="amount"
                        onChange={(e) => {
                          changeNewCard("amount", Number(e.target.value));
                        }}
                      />
                    </div>
                    <div>
                      <Label htmlFor="image">Afbeelding</Label>
                      <Input
                        defaultValue={newCard.image}
                        id="image"
                        name="image"
                        onChange={(e) => {
                          changeNewCard("image", e.target.value);
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
                            {newCard.wins.map((win) => (
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
                            {newCard.loses.map((lose) => (
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
                                    : "") + cards[lose]?.name}
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
                        checked={newCard.canTouch}
                        onCheckedChange={() => {
                          changeNewCard("canTouch", !newCard.canTouch);
                        }}
                      />
                      <label
                        htmlFor="touch"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Deze kaart kan tikken
                      </label>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button
                          onClick={() => {
                            addNewCard();
                          }}
                        >
                          Toevoegen
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
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
                  deleteCard={deleteCard}
                  cantBeDeleted={cantBeDeleted}
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
      ) : (
        <div className="absolute flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
          <div className="relative flex items-center justify-center">
            <div className="absolute w-32 h-32 border-t-4 border-b-4 rounded-full animate-spin border-[#641661]"></div>
            <img
              src="https://jeugdwerk.org/images/logo/logo.colorful.png"
              alt="Logo"
              className="w-20"
            />
          </div>
        </div>
      )}
    </>
  );
}
