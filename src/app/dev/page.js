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

const themes = {
  default: {
    0: {
      id: 0,
      name: "Bom",
      image: "/default/bom.png",
      wins: [1, 2, 4, 5, 6, 7, 8, 9, 10],
      loses: [3],
      canTouch: false,
      amount: 1,
      numberVisible: true,
    },
    1: {
      id: 1,
      name: "Spion",
      image: "/default/spion.png",
      wins: [10],
      loses: [0, 2, 3, 4, 5, 6, 7, 8, 9],
      canTouch: true,
      amount: 1,
      numberVisible: true,
    },
    2: {
      id: 2,
      name: "Verkenner",
      image: "/default/verkenner.png",
      wins: [1],
      loses: [0, 3, 4, 5, 6, 7, 8, 9, 10],
      canTouch: true,
      amount: 8,
      numberVisible: true,
    },
    3: {
      id: 3,
      name: "Mineur",
      image: "/default/mineur.png",
      wins: [0, 1, 2],
      loses: [4, 5, 6, 7, 8, 9, 10],
      canTouch: true,
      amount: 1,
      numberVisible: true,
    },
    4: {
      id: 4,
      name: "Sergeant",
      image: "/default/sergeant.png",
      wins: [1, 2, 3],
      loses: [0, 5, 6, 7, 8, 9, 10],
      canTouch: true,
      amount: 5,
      numberVisible: true,
    },
    5: {
      id: 5,
      name: "Luitenant",
      image: "/default/luitenant.png",
      wins: [1, 2, 3, 4],
      loses: [0, 6, 7, 8, 9, 10],
      canTouch: true,
      amount: 4,
      numberVisible: true,
    },
    6: {
      id: 6,
      name: "Kapitein",
      image: "/default/kapitein.png",
      wins: [1, 2, 3, 4, 5],
      loses: [0, 7, 8, 9, 10],
      canTouch: true,
      amount: 4,
      numberVisible: true,
    },
    7: {
      id: 7,
      name: "Majoor",
      image: "/default/majoor.png",
      wins: [1, 2, 3, 4, 5, 6],
      loses: [0, 8, 9, 10],
      canTouch: true,
      amount: 4,
      numberVisible: true,
    },
    8: {
      id: 8,
      name: "Kolonel",
      image: "/default/kolonel.png",
      wins: [1, 2, 3, 4, 5, 6, 7],
      loses: [0, 9, 10],
      canTouch: true,
      amount: 3,
      numberVisible: true,
    },
    9: {
      id: 9,
      name: "Generaal",
      image: "/default/generaal.png",
      wins: [1, 2, 3, 4, 5, 6, 7, 8],
      loses: [0, 10],
      canTouch: true,
      amount: 2,
      numberVisible: true,
    },
    10: {
      id: 10,
      name: "Maarschalk",
      image: "/default/maarschalk.png",
      wins: [2, 3, 4, 5, 6, 7, 8, 9],
      loses: [0, 1],
      canTouch: true,
      amount: 1,
      numberVisible: true,
    },
    99: {
      id: 99,
      name: "Vlag",
      image: "/default/vlag.png",
      wins: [],
      loses: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      canTouch: false,
      amount: 1,
      numberVisible: false,
    },
  },
  disney: {
    0: {
      id: 0,
      name: "Mickey Mouse's Tovenaars Hoed",
      image: "/disney/mickey-mouses-sorcerers-hats.png",
      wins: [1, 2, 4, 5, 6, 7, 8, 9, 10],
      loses: [3],
      canTouch: false,
      amount: 1,
      numberVisible: true,
    },
    1: {
      id: 1,
      name: "Tinkerbel",
      image: "/disney/tinker-bell.png",
      wins: [10],
      loses: [0, 2, 3, 4, 5, 6, 7, 8, 9],
      canTouch: true,
      amount: 1,
      numberVisible: true,
    },
    2: {
      id: 2,
      name: "Peter Pan",
      image: "/disney/peter-pan.png",
      wins: [1],
      loses: [0, 3, 4, 5, 6, 7, 8, 9, 10],
      canTouch: true,
      amount: 8,
      numberVisible: true,
    },
    3: {
      id: 3,
      name: "Dagobert Duck",
      image: "/disney/dagobert-duck.png",
      wins: [0, 1, 2],
      loses: [4, 5, 6, 7, 8, 9, 10],
      canTouch: true,
      amount: 1,
      numberVisible: true,
    },
    4: {
      id: 4,
      name: "Aladdin",
      image: "/disney/aladdin.png",
      wins: [1, 2, 3],
      loses: [0, 5, 6, 7, 8, 9, 10],
      canTouch: true,
      amount: 5,
      numberVisible: true,
    },
    5: {
      id: 5,
      name: "Buzz Lightyear",
      image: "/disney/buzz-lightyear.png",
      wins: [1, 2, 3, 4],
      loses: [0, 6, 7, 8, 9, 10],
      canTouch: true,
      amount: 4,
      numberVisible: true,
    },
    6: {
      id: 6,
      name: "Raya",
      image: "/disney/raya.png",
      wins: [1, 2, 3, 4, 5],
      loses: [0, 7, 8, 9, 10],
      canTouch: true,
      amount: 4,
      numberVisible: true,
    },
    7: {
      id: 7,
      name: "Maui",
      image: "/disney/maui.png",
      wins: [1, 2, 3, 4, 5, 6],
      loses: [0, 8, 9, 10],
      canTouch: true,
      amount: 4,
      numberVisible: true,
    },
    8: {
      id: 8,
      name: "Elsa",
      image: "/disney/elsa.png",
      wins: [1, 2, 3, 4, 5, 6, 7],
      loses: [0, 9, 10],
      canTouch: true,
      amount: 3,
      numberVisible: true,
    },
    9: {
      id: 9,
      name: "Simba",
      image: "/disney/simba.png",
      wins: [1, 2, 3, 4, 5, 6, 7, 8],
      loses: [0, 10],
      canTouch: true,
      amount: 2,
      numberVisible: true,
    },
    10: {
      id: 10,
      name: "Mickey Mouse",
      image: "/disney/mickey-mouse.png",
      wins: [2, 3, 4, 5, 6, 7, 8, 9],
      loses: [0, 1],
      canTouch: true,
      amount: 1,
      numberVisible: true,
    },
    99: {
      id: 99,
      name: "Assepoester's Glazen Muiltje",
      image: "/disney/cinderellas-glass-slipper.png",
      wins: [],
      loses: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      canTouch: false,
      amount: 1,
      numberVisible: false,
    },
  },
  studio100: {
    0: {
      id: 0,
      name: "Plopkoeken",
      image: "/studio100/plopkoeken.jpg",
      wins: [1, 2, 4, 5, 6, 7, 8, 9, 10],
      loses: [3],
      canTouch: false,
      amount: 1,
      numberVisible: true,
    },
    1: {
      id: 1,
      name: "Kabouter Plop",
      image: "/studio100/plop.png",
      wins: [10],
      loses: [0, 2, 3, 4, 5, 6, 7, 8, 9],
      canTouch: true,
      amount: 1,
      numberVisible: true,
    },
    2: {
      id: 2,
      name: "Gamekeeper",
      image: "/studio100/gamekeepers.png",
      wins: [1, 3, 4, 5, 6, 7, 8, 9, 10],
      loses: [0],
      canTouch: true,
      amount: 8,
      numberVisible: true,
    },
    3: {
      id: 3,
      name: "Piet Piraat",
      image: "/studio100/piet-piraat.png",
      wins: [0, 1, 2],
      loses: [4, 5, 6, 7, 8, 9, 10],
      canTouch: true,
      amount: 1,
      numberVisible: true,
    },
    4: {
      id: 4,
      name: "K3",
      image: "/studio100/k3.png",
      wins: [1, 2, 3],
      loses: [0, 5, 6, 7, 8, 9, 10],
      canTouch: true,
      amount: 5,
      numberVisible: true,
    },
    5: {
      id: 5,
      name: "Bumba",
      image: "/studio100/bumba.png",
      wins: [1, 2, 3, 4],
      loses: [0, 6, 7, 8, 9, 10],
      canTouch: true,
      amount: 4,
      numberVisible: true,
    },
    6: {
      id: 6,
      name: "Mega Mindy",
      image: "/studio100/mega-mindy.png",
      wins: [1, 2, 3, 5],
      loses: [0, 4, 6, 7, 8, 9, 10],
      canTouch: true,
      amount: 4,
      numberVisible: true,
    },
    7: {
      id: 7,
      name: "Maya de Bij",
      image: "/studio100/maya-de-bij.png",
      wins: [1, 2, 3, 4, 5, 6],
      loses: [0, 8, 9, 10],
      canTouch: true,
      amount: 4,
      numberVisible: true,
    },
    8: {
      id: 8,
      name: "Nachtwacht",
      image: "/studio100/nachtwacht.png",
      wins: [1, 2, 3, 4, 5, 6, 7],
      loses: [0, 9, 10],
      canTouch: true,
      amount: 3,
      numberVisible: true,
    },
    9: {
      id: 9,
      name: "Samson",
      image: "/studio100/samson.png",
      wins: [1, 2, 3, 4, 5, 6, 7, 8],
      loses: [0, 10],
      canTouch: true,
      amount: 2,
      numberVisible: true,
    },
    10: {
      id: 10,
      name: "Freddy",
      image: "/studio100/100-wolf.png",
      wins: [2, 3, 4, 5, 6, 7, 8, 9],
      loses: [0, 1],
      canTouch: true,
      amount: 1,
      numberVisible: true,
    },
    99: {
      id: 99,
      name: "K3 Brooddoos",
      image: "/studio100/k3-brooddoos.jpg",
      wins: [],
      loses: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      canTouch: false,
      amount: 1,
      numberVisible: false,
    },
  },
  pirates: {
    0: {
      id: 0,
      name: "Kanonskogels",
      image: "/pirates/kanonskogels.png",
      wins: [],
      loses: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      canTouch: false,
      amount: 6,
      numberVisible: true,
    },
    1: {
      id: 1,
      name: "Elizabeth Swann",
      image: "/pirates/elizabeth-swann.png",
      wins: [6],
      loses: [2, 3, 4, 5, 6, 7, 8, 9, 10],
      canTouch: true,
      amount: 1,
      numberVisible: true,
    },
    2: {
      id: 2,
      name: "Jan Haring",
      image: "/pirates/jan-haring.png",
      wins: [1, 10],
      loses: [3, 4, 5, 6, 7, 8, 9],
      canTouch: true,
      amount: 8,
      numberVisible: true,
    },
    3: {
      id: 3,
      name: "Joshamee Gibbs",
      image: "/pirates/joshamee-gibbs.png",
      wins: [2, 9, 10],
      loses: [4, 5, 6, 7, 8],
      canTouch: true,
      amount: 5,
      numberVisible: true,
    },
    4: {
      id: 4,
      name: "Zwartbaard",
      image: "/pirates/zwartbaard.png",
      wins: [3, 8, 9, 10],
      loses: [5, 6, 7],
      canTouch: true,
      amount: 1,
      numberVisible: true,
    },
    5: {
      id: 5,
      name: "Red Rackham",
      image: "/pirates/red-rackham.webp",
      wins: [4, 7, 8, 9, 10],
      loses: [6],
      canTouch: true,
      amount: 1,
      numberVisible: true,
    },
    6: {
      id: 6,
      name: "Piet Piraat",
      image: "/pirates/piet-piraat.png",
      wins: [5, 6, 7, 8, 9, 10],
      loses: [7],
      canTouch: true,
      amount: 1,
      numberVisible: true,
    },
    7: {
      id: 7,
      name: "Kapitein Haak",
      image: "/pirates/kapitein-haak.png",
      wins: [6, 7, 8, 9, 10],
      loses: [1, 2, 3, 4, 5],
      canTouch: true,
      amount: 1,
      numberVisible: true,
    },
    8: {
      id: 8,
      name: "Davy Jones",
      image: "/pirates/davy-jones.png",
      wins: [7, 8, 9, 10],
      loses: [1, 2, 3, 4],
      canTouch: true,
      amount: 1,
      numberVisible: true,
    },
    9: {
      id: 9,
      name: "Captain Hector Barbossa",
      image: "/pirates/captain-hector-barbossa.png",
      wins: [8, 9, 10],
      loses: [1, 2, 3, 4, 5],
      canTouch: true,
      amount: 1,
      numberVisible: true,
    },
    10: {
      id: 10,
      name: "Captain Jack Sparrow",
      image: "/pirates/captain-jack-sparrow.png",
      wins: [9, 10],
      loses: [1, 2, 3, 4, 5, 6, 7, 8],
      canTouch: true,
      amount: 1,
      numberVisible: true,
    },
    99: {
      id: 99,
      name: "Jolly Roger",
      image: "/pirates/jolly-roger.png",
      wins: [],
      loses: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      canTouch: false,
      amount: 1,
      numberVisible: false,
    },
  },
};

const themesList = [
  {
    value: "default",
    label: "Standaard",
  },
  {
    value: "studio100",
    label: "Studio 100",
  },
  {
    value: "disney",
    label: "Disney",
  },
  {
    value: "pirates",
    label: "Piraten",
  },
];

const cantBeDeleted = [0, 99];

export default function Stratego() {
  const [loading, SetLoading] = useState(true);
  const [cards, setCards] = useState(themes.default);
  const [color, setColor] = useState("#ffffff");
  const [colorFg, setColorFg] = useState(getTextColor("#ffffff"));
  const [isClient, setIsClient] = useState(false);
  const [newCard, setNewCard] = useState({
    id: [...Object.values(cards)]
      .filter((card) => card.id !== 99)
      .map((card) => card.id)
      .sort(function (a, b) {
        return b - a;
      })[0],
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
    setColor(newColor);
    setColorFg(getTextColor(newColor));
    setIsClient(true);
    SetLoading(false);
  }, []);

  useEffect(() => {
    const unloadCallback = (event) => {
      event.preventDefault();
      event.returnValue = "";
      return "";
    };

    window.addEventListener("beforeunload", unloadCallback);
    return () => window.removeEventListener("beforeunload", unloadCallback);
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
        <main className="max-w-[1000px] print:max-w-[500px] mx-auto py-10 print:py-0">
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
                        variant="destructive"
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
                                  {cards[win].id}. {cards[win].name}
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
                                  {cards[lose].id}. {cards[lose].name}
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
