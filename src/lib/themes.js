const themes = {
  default: {
    0: {
      id: 0,
      name: "Bom",
      image: "https://image.jeugdwerk.org/stratego/default/bom.png",
      wins: [1, 2, 4, 5, 6, 7, 8, 9, 10],
      loses: [3],
      canTouch: false,
      amount: 1,
      numberVisible: false,
    },
    1: {
      id: 1,
      name: "Spion",
      image: "https://image.jeugdwerk.org/stratego/default/spion.png",
      wins: [10],
      loses: [0, 2, 3, 4, 5, 6, 7, 8, 9],
      canTouch: true,
      amount: 1,
      numberVisible: true,
    },
    2: {
      id: 2,
      name: "Verkenner",
      image: "https://image.jeugdwerk.org/stratego/default/verkenner.png",
      wins: [1],
      loses: [0, 3, 4, 5, 6, 7, 8, 9, 10],
      canTouch: true,
      amount: 8,
      numberVisible: true,
    },
    3: {
      id: 3,
      name: "Mineur",
      image: "https://image.jeugdwerk.org/stratego/default/mineur.png",
      wins: [0, 1, 2],
      loses: [4, 5, 6, 7, 8, 9, 10],
      canTouch: true,
      amount: 1,
      numberVisible: true,
    },
    4: {
      id: 4,
      name: "Sergeant",
      image: "https://image.jeugdwerk.org/stratego/default/sergeant.png",
      wins: [1, 2, 3],
      loses: [0, 5, 6, 7, 8, 9, 10],
      canTouch: true,
      amount: 5,
      numberVisible: true,
    },
    5: {
      id: 5,
      name: "Luitenant",
      image: "https://image.jeugdwerk.org/stratego/default/luitenant.png",
      wins: [1, 2, 3, 4],
      loses: [0, 6, 7, 8, 9, 10],
      canTouch: true,
      amount: 4,
      numberVisible: true,
    },
    6: {
      id: 6,
      name: "Kapitein",
      image: "https://image.jeugdwerk.org/stratego/default/kapitein.png",
      wins: [1, 2, 3, 4, 5],
      loses: [0, 7, 8, 9, 10],
      canTouch: true,
      amount: 4,
      numberVisible: true,
    },
    7: {
      id: 7,
      name: "Majoor",
      image: "https://image.jeugdwerk.org/stratego/default/majoor.png",
      wins: [1, 2, 3, 4, 5, 6],
      loses: [0, 8, 9, 10],
      canTouch: true,
      amount: 4,
      numberVisible: true,
    },
    8: {
      id: 8,
      name: "Kolonel",
      image: "https://image.jeugdwerk.org/stratego/default/kolonel.png",
      wins: [1, 2, 3, 4, 5, 6, 7],
      loses: [0, 9, 10],
      canTouch: true,
      amount: 3,
      numberVisible: true,
    },
    9: {
      id: 9,
      name: "Generaal",
      image: "https://image.jeugdwerk.org/stratego/default/generaal.png",
      wins: [1, 2, 3, 4, 5, 6, 7, 8],
      loses: [0, 10],
      canTouch: true,
      amount: 2,
      numberVisible: true,
    },
    10: {
      id: 10,
      name: "Maarschalk",
      image: "https://image.jeugdwerk.org/stratego/default/maarschalk.png",
      wins: [2, 3, 4, 5, 6, 7, 8, 9],
      loses: [0, 1],
      canTouch: true,
      amount: 1,
      numberVisible: true,
    },
    99: {
      id: 99,
      name: "Vlag",
      image: "https://image.jeugdwerk.org/stratego/default/vlag.png",
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
      image:
        "https://image.jeugdwerk.org/stratego/disney/mickey-mouses-sorcerers-hats.png",
      wins: [1, 2, 4, 5, 6, 7, 8, 9, 10],
      loses: [3],
      canTouch: false,
      amount: 1,
      numberVisible: false,
    },
    1: {
      id: 1,
      name: "Tinkerbel",
      image: "https://image.jeugdwerk.org/stratego/disney/tinker-bell.png",
      wins: [10],
      loses: [0, 2, 3, 4, 5, 6, 7, 8, 9],
      canTouch: true,
      amount: 1,
      numberVisible: true,
    },
    2: {
      id: 2,
      name: "Peter Pan",
      image: "https://image.jeugdwerk.org/stratego/disney/peter-pan.png",
      wins: [1],
      loses: [0, 3, 4, 5, 6, 7, 8, 9, 10],
      canTouch: true,
      amount: 8,
      numberVisible: true,
    },
    3: {
      id: 3,
      name: "Dagobert Duck",
      image: "https://image.jeugdwerk.org/stratego/disney/dagobert-duck.png",
      wins: [0, 1, 2],
      loses: [4, 5, 6, 7, 8, 9, 10],
      canTouch: true,
      amount: 1,
      numberVisible: true,
    },
    4: {
      id: 4,
      name: "Aladdin",
      image: "https://image.jeugdwerk.org/stratego/disney/aladdin.png",
      wins: [1, 2, 3],
      loses: [0, 5, 6, 7, 8, 9, 10],
      canTouch: true,
      amount: 5,
      numberVisible: true,
    },
    5: {
      id: 5,
      name: "Buzz Lightyear",
      image: "https://image.jeugdwerk.org/stratego/disney/buzz-lightyear.png",
      wins: [1, 2, 3, 4],
      loses: [0, 6, 7, 8, 9, 10],
      canTouch: true,
      amount: 4,
      numberVisible: true,
    },
    6: {
      id: 6,
      name: "Raya",
      image: "https://image.jeugdwerk.org/stratego/disney/raya.png",
      wins: [1, 2, 3, 4, 5],
      loses: [0, 7, 8, 9, 10],
      canTouch: true,
      amount: 4,
      numberVisible: true,
    },
    7: {
      id: 7,
      name: "Maui",
      image: "https://image.jeugdwerk.org/stratego/disney/maui.png",
      wins: [1, 2, 3, 4, 5, 6],
      loses: [0, 8, 9, 10],
      canTouch: true,
      amount: 4,
      numberVisible: true,
    },
    8: {
      id: 8,
      name: "Elsa",
      image: "https://image.jeugdwerk.org/stratego/disney/elsa.png",
      wins: [1, 2, 3, 4, 5, 6, 7],
      loses: [0, 9, 10],
      canTouch: true,
      amount: 3,
      numberVisible: true,
    },
    9: {
      id: 9,
      name: "Simba",
      image: "https://image.jeugdwerk.org/stratego/disney/simba.png",
      wins: [1, 2, 3, 4, 5, 6, 7, 8],
      loses: [0, 10],
      canTouch: true,
      amount: 2,
      numberVisible: true,
    },
    10: {
      id: 10,
      name: "Mickey Mouse",
      image: "https://image.jeugdwerk.org/stratego/disney/mickey-mouse.png",
      wins: [2, 3, 4, 5, 6, 7, 8, 9],
      loses: [0, 1],
      canTouch: true,
      amount: 1,
      numberVisible: true,
    },
    99: {
      id: 99,
      name: "Assepoester's Glazen Muiltje",
      image:
        "https://image.jeugdwerk.org/stratego/disney/cinderellas-glass-slipper.png",
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
      image: "https://image.jeugdwerk.org/stratego/studio100/plopkoeken.jpg",
      wins: [1, 2, 4, 5, 6, 7, 8, 9, 10],
      loses: [3],
      canTouch: false,
      amount: 1,
      numberVisible: false,
    },
    1: {
      id: 1,
      name: "Kabouter Plop",
      image: "https://image.jeugdwerk.org/stratego/studio100/plop.png",
      wins: [10],
      loses: [0, 2, 3, 4, 5, 6, 7, 8, 9],
      canTouch: true,
      amount: 1,
      numberVisible: true,
    },
    2: {
      id: 2,
      name: "Gamekeeper",
      image: "https://image.jeugdwerk.org/stratego/studio100/gamekeepers.png",
      wins: [1, 3, 4, 5, 6, 7, 8, 9, 10],
      loses: [0],
      canTouch: true,
      amount: 8,
      numberVisible: true,
    },
    3: {
      id: 3,
      name: "Piet Piraat",
      image: "https://image.jeugdwerk.org/stratego/studio100/piet-piraat.png",
      wins: [0, 1, 2],
      loses: [4, 5, 6, 7, 8, 9, 10],
      canTouch: true,
      amount: 1,
      numberVisible: true,
    },
    4: {
      id: 4,
      name: "K3",
      image: "https://image.jeugdwerk.org/stratego/studio100/k3.png",
      wins: [1, 2, 3],
      loses: [0, 5, 6, 7, 8, 9, 10],
      canTouch: true,
      amount: 5,
      numberVisible: true,
    },
    5: {
      id: 5,
      name: "Bumba",
      image: "https://image.jeugdwerk.org/stratego/studio100/bumba.png",
      wins: [1, 2, 3, 4],
      loses: [0, 6, 7, 8, 9, 10],
      canTouch: true,
      amount: 4,
      numberVisible: true,
    },
    6: {
      id: 6,
      name: "Mega Mindy",
      image: "https://image.jeugdwerk.org/stratego/studio100/mega-mindy.png",
      wins: [1, 2, 3, 5],
      loses: [0, 4, 6, 7, 8, 9, 10],
      canTouch: true,
      amount: 4,
      numberVisible: true,
    },
    7: {
      id: 7,
      name: "Maya de Bij",
      image: "https://image.jeugdwerk.org/stratego/studio100/maya-de-bij.png",
      wins: [1, 2, 3, 4, 5, 6],
      loses: [0, 8, 9, 10],
      canTouch: true,
      amount: 4,
      numberVisible: true,
    },
    8: {
      id: 8,
      name: "Nachtwacht",
      image: "https://image.jeugdwerk.org/stratego/studio100/nachtwacht.png",
      wins: [1, 2, 3, 4, 5, 6, 7],
      loses: [0, 9, 10],
      canTouch: true,
      amount: 3,
      numberVisible: true,
    },
    9: {
      id: 9,
      name: "Samson",
      image: "https://image.jeugdwerk.org/stratego/studio100/samson.png",
      wins: [1, 2, 3, 4, 5, 6, 7, 8],
      loses: [0, 10],
      canTouch: true,
      amount: 2,
      numberVisible: true,
    },
    10: {
      id: 10,
      name: "Freddy",
      image: "https://image.jeugdwerk.org/stratego/studio100/100-wolf.png",
      wins: [2, 3, 4, 5, 6, 7, 8, 9],
      loses: [0, 1],
      canTouch: true,
      amount: 1,
      numberVisible: true,
    },
    99: {
      id: 99,
      name: "K3 Brooddoos",
      image: "https://image.jeugdwerk.org/stratego/studio100/k3-brooddoos.jpg",
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
      name: "Kanonskogel",
      image: "https://image.jeugdwerk.org/stratego/pirates/kanonskogels.png",
      wins: [1, 2, 4, 5, 6, 7, 8, 9, 10],
      loses: [3],
      canTouch: false,
      amount: 6,
      numberVisible: false,
    },
    1: {
      id: 1,
      name: "Elizabeth Swann",
      image: "https://image.jeugdwerk.org/stratego/pirates/elizabeth-swann.png",
      wins: [10],
      loses: [0, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      canTouch: true,
      amount: 1,
      numberVisible: true,
    },
    2: {
      id: 2,
      name: "Jan Haring",
      image: "https://image.jeugdwerk.org/stratego/pirates/jan-haring.png",
      wins: [1],
      loses: [0, 3, 4, 5, 6, 7, 8, 9, 10],
      canTouch: true,
      amount: 8,
      numberVisible: true,
    },
    3: {
      id: 3,
      name: "Joshamee Gibbs",
      image: "https://image.jeugdwerk.org/stratego/pirates/joshamee-gibbs.png",
      wins: [0, 1, 2],
      loses: [4, 5, 6, 7, 8, 9, 10],
      canTouch: true,
      amount: 5,
      numberVisible: true,
    },
    4: {
      id: 4,
      name: "Zwartbaard",
      image: "https://image.jeugdwerk.org/stratego/pirates/zwartbaard.png",
      wins: [1, 2, 3],
      loses: [0, 5, 6, 7, 8, 9, 10],
      canTouch: true,
      amount: 1,
      numberVisible: true,
    },
    5: {
      id: 5,
      name: "Red Rackham",
      image: "https://image.jeugdwerk.org/stratego/pirates/red-rackham.webp",
      wins: [1, 2, 3, 4],
      loses: [0, 6, 8, 9, 10],
      canTouch: true,
      amount: 1,
      numberVisible: true,
    },
    6: {
      id: 6,
      name: "Piet Piraat",
      image: "https://image.jeugdwerk.org/stratego/pirates/piet-piraat.png",
      wins: [1, 2, 3, 4, 5],
      loses: [0, 7, 8, 9, 10],
      canTouch: true,
      amount: 1,
      numberVisible: true,
    },
    7: {
      id: 7,
      name: "Kapitein Haak",
      image: "https://image.jeugdwerk.org/stratego/pirates/kapitein-haak.png",
      wins: [1, 2, 3, 4, 5, 6],
      loses: [0, 8, 9, 10],
      canTouch: true,
      amount: 1,
      numberVisible: true,
    },
    8: {
      id: 8,
      name: "Davy Jones",
      image: "https://image.jeugdwerk.org/stratego/pirates/davy-jones.png",
      wins: [1, 2, 3, 4, 5, 6, 7],
      loses: [0, 9, 10],
      canTouch: true,
      amount: 1,
      numberVisible: true,
    },
    9: {
      id: 9,
      name: "Hector Barbossa",
      image:
        "https://image.jeugdwerk.org/stratego/pirates/captain-hector-barbossa.png",
      wins: [1, 2, 3, 4, 5, 6, 7, 8],
      loses: [0, 10],
      canTouch: true,
      amount: 1,
      numberVisible: true,
    },
    10: {
      id: 10,
      name: "Jack Sparrow",
      image:
        "https://image.jeugdwerk.org/stratego/pirates/captain-jack-sparrow.png",
      wins: [2, 3, 4, 5, 6, 7, 8, 9],
      loses: [0, 1],
      canTouch: true,
      amount: 1,
      numberVisible: true,
    },
    99: {
      id: 99,
      name: "Piraten vlag",
      image: "https://image.jeugdwerk.org/stratego/pirates/jolly-roger.png",
      wins: [],
      loses: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      canTouch: false,
      amount: 1,
      numberVisible: false,
    },
  },
};

const list = [
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

const defaultCard = (cards, id) => {
  return {
    id: id,
    name: "",
    image: "",
    wins: [...Object.values(cards)]
      .filter((card) => card.id !== 99)
      .map((card) => card.id),
    loses: [],
    canTouch: true,
    amount: null,
    numberVisible: true,
  };
};

export { themes, list, cantBeDeleted, defaultCard };
