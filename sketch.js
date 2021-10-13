
/* 

- 5 elements
- 1:00 time limit
- 10 / 18 / 18+ / Full sets
- Grayed out if not in set
- Add Group Numbers
- Scoring system
- Add my voice for each element
- Party Horn for start, police sirens for end, techno during?

*/

let time = 0;
let timerIsRunning = false;
let paused = false;
let elementList = [];
let currentElement;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // startRound()
}

function draw() {
  background(64);

  // Draw each element box
  if (!paused) {
    elements.forEach((e) => drawEl(e));
  }

  // Draw the timer
  drawTimer(roundTwoPlaces(time), false);

  if (timerIsRunning) {
    time += 1 / 60;
  }

  drawElementToFind();
}

let drawTimer = (time, isRunning) => {
  let timer = new Clickable();

  timer.locate(windowWidth * 0.37, windowHeight * .24);
  timer.resize(windowWidth * 0.125 , windowHeight / 10);
  timer.color = "red";
  timer.text = time;
  timer.textSize = 32;

  // Stop the timer when you have found all elements
  if (time > 0 && elementList.length === 0) {
    timerIsRunning = false;
  }

  // Handle starts and resets
  timer.onPress = () => {
    // console.log("Timer Pressed");
    if (timerIsRunning && elementList.length > 0) {
      paused = true;
      timerIsRunning = false;
    } else if (paused) {
      paused = false;
      timerIsRunning = true;
    } else {
      // Start a new round instead of pausing
      startRound();
      timerIsRunning = true;
    }
  };

  // Draw the text "Seconds"
  textSize(24);
  fill("white");
  text("seconds", windowWidth * .54, windowHeight * .30);
  fill("black");

  timer.draw();
};

let drawElementToFind = () => {
  fill("white");
  textAlign(CENTER);

  rectMode(CENTER);
  strokeWeight(3);
  rect(windowWidth * .425, 110, windowWidth / 2.25, 150, 10);
  fill("black");
  textSize(windowHeight / 17);
  text(
    timerIsRunning ? currentElement : "Press timer to start",
    windowWidth * .425,
    130
  );

  rectMode(CORNER);
};

let roundTwoPlaces = (number) => {
  return Math.round(number * 100) / 100;
};

let getNewElement = (elList) => {
  // Establish what the new element will be

  return elList.length !== 0
    ? elList[getRandNumRange(0, elList.length - 1)].name
    : "Done";
};

let getUpdatedElementList = (newElement, oldList) => {
  // console.log(
  //   oldList
  //     .filter((el) => el.name !== newElement)
  //     .forEach((el) => console.log(el.name))
  // );

  return oldList.filter((el) => el.name !== newElement);
};

let drawEl = (elem) => {
  let x = elem.group * (18 * (windowWidth * 0.0029));
  let y = elem.period * (9 * (windowHeight * 0.0098));
  let w = windowWidth * 0.05
  let h = windowWidth * 0.05

  // Using p5.clickable lib
  let el = new Clickable();
  el.locate(x, y); // set position
  el.resize(w, h); // resize button
  el.text = elem.symbol;
  el.color = elem.color;
  el.textSize = 28;
  el.textScaled = true; // scales the text with the button

  el.onPress = () => {
    //   console.log(
    //     "Chose " + elem.name + " (Current Element is " + currentElement + ")"
    //   );

    // When the student chooses the correct element, get a new one.
    if (elem.name === currentElement) {
      currentElement = getNewElement(elementList);

      // console.log("Chose Correct Element");

      // Update the element list to remove the new element

      elementList = getUpdatedElementList(currentElement, elementList);
    }
  };

  el.draw();
};

let lightPurple = "#D400FF"; //light purple
let lightYellow = "#D4FF00"; // light yellow
let lightBlue = "#E6FBFF"; // alt light blue
let lightRed = "#e82323";
let lightBrown = "#6d6e3a";

let getRandNumRange = (min, max) => {
  return Math.round(Math.random() * (max - min) + min);
};

let createElementList = () => {
  return elements.slice(0, 10);
};

let startRound = () => {
  elementList = createElementList();
  currentElement = getNewElement(elementList);
  elementList = getUpdatedElementList(currentElement, elementList);
  time = 0;
};

let elements = [
  //
  //
  // Period 1
  //
  //
  {
    name: "Hydrogen",
    symbol: "H",
    atomicNumber: 1,
    period: 1,
    group: 1,
    color: lightPurple,
  },
  {
    name: "Helium",
    symbol: "He",
    atomicNumber: 2,
    period: 1,
    group: 18,
    color: "lightBlue",
  },
  //
  //
  // Period 2
  //
  //
  {
    name: "Lithium",
    symbol: "Li",
    atomicNumber: 3,
    period: 2,
    group: 1,
    color: "orange",
  },
  {
    name: "Beryllium",
    symbol: "Be",
    atomicNumber: 4,
    period: 2,
    group: 2,
    color: "yellow",
  },
  {
    name: "Boron",
    symbol: "B",
    atomicNumber: 5,
    period: 2,
    group: 13,

    color: "lightGreen",
  },
  {
    name: "Carbon",
    symbol: "C",
    atomicNumber: 6,
    period: 2,
    group: 14,
    color: lightPurple,
  },
  {
    name: "Nitrogen",
    symbol: "N",
    atomicNumber: 7,
    period: 2,
    group: 15,
    color: lightPurple,
  },
  {
    name: "Oxygen",
    symbol: "O",
    atomicNumber: 8,
    period: 2,
    group: 16,
    color: lightPurple,
  },
  {
    name: "Fluorine",
    symbol: "F",
    atomicNumber: 9,
    period: 2,
    group: 17,
    color: "pink",
  },
  {
    name: "Neon",
    symbol: "Ne",
    atomicNumber: 9,
    period: 2,
    group: 18,
    color: "lightBlue",
  },
  //
  //
  // Period 3
  //
  //
  {
    name: "Sodium",
    symbol: "Na",
    atomicNumber: 11,
    period: 3,
    group: 1,
    color: "orange",
  },
  {
    name: "Magnesium",
    symbol: "Mg",
    atomicNumber: 12,
    period: 3,
    group: 2,
    color: "yellow",
  },
  {
    name: "Aluminum",
    symbol: "Al",
    atomicNumber: 13,
    period: 3,
    group: 13,
    color: lightYellow,
  },
  {
    name: "Silicon",
    symbol: "Si",
    atomicNumber: 14,
    period: 3,
    group: 14,
    color: "lightGreen",
  },
  {
    name: "Phosphorus",
    symbol: "P",
    atomicNumber: 15,
    period: 3,
    group: 15,
    color: lightPurple,
  },
  {
    name: "Sulfur",
    symbol: "S",
    atomicNumber: 16,
    period: 3,
    group: 16,
    color: lightPurple,
  },
  {
    name: "Chlorine",
    symbol: "Cl",
    atomicNumber: 17,
    period: 3,
    group: 17,
    color: "pink",
  },
  {
    name: "Argon",
    symbol: "Ar",
    atomicNumber: 18,
    period: 3,
    group: 18,
    color: "lightBlue",
  },
  //
  //
  // Period 4
  //
  //
  {
    name: "Potassium",
    symbol: "K",
    atomicNumber: 19,
    period: 4,
    group: 1,
    color: "orange",
  },
  {
    name: "Calcium",
    symbol: "Ca",
    atomicNumber: 20,
    period: 4,
    group: 2,
    color: "yellow",
  },
  {
    name: "Scandium",
    symbol: "Sc",
    atomicNumber: 21,
    period: 4,
    group: 3,
    color: lightBlue,
  },
  {
    name: "Titanium",
    symbol: "Ti",
    atomicNumber: 22,
    period: 4,
    group: 4,
    color: lightBlue,
  },
  {
    name: "Vanadium",
    symbol: "V",
    atomicNumber: 23,
    period: 4,
    group: 5,
    color: lightBlue,
  },
  {
    name: "Chromium",
    symbol: "Cr",
    atomicNumber: 24,
    period: 4,
    group: 6,
    color: lightBlue,
  },
  {
    name: "Manganese",
    symbol: "Mn",
    atomicNumber: 25,
    period: 4,
    group: 7,
    color: lightBlue,
  },
  {
    name: "Iron",
    symbol: "Fe",
    atomicNumber: 26,
    period: 4,
    group: 8,
    color: lightBlue,
  },
  {
    name: "Cobalt",
    symbol: "Co",
    atomicNumber: 27,
    period: 4,
    group: 9,
    color: lightBlue,
  },
  {
    name: "Nickel",
    symbol: "Ni",
    atomicNumber: 29,
    period: 4,
    group: 10,
    color: lightBlue,
  },
  {
    name: "Copper",
    symbol: "Cu",
    atomicNumber: 29,
    period: 4,
    group: 11,
    color: lightBlue,
  },
  {
    name: "Zinc",
    symbol: "Zn",
    atomicNumber: 30,
    period: 4,
    group: 12,
    color: lightBlue,
  },
  {
    name: "Silicon",
    symbol: "Si",
    atomicNumber: 14,
    period: 4,
    group: 14,
    color: "lightGreen",
  },
  {
    name: "Gallium",
    symbol: "Ga",
    atomicNumber: 31,
    period: 4,
    group: 13,
    color: lightYellow,
  },
  {
    name: "Germanium",
    symbol: "Ge",
    atomicNumber: 32,
    period: 4,
    group: 14,
    color: "lightGreen",
  },
  {
    name: "Arsenic",
    symbol: "As",
    atomicNumber: 33,
    period: 4,
    group: 15,
    color: "lightGreen",
  },
  {
    name: "Selenium",
    symbol: "Se",
    atomicNumber: 34,
    period: 4,
    group: 16,
    color: lightPurple,
  },
  {
    name: "Bromine",
    symbol: "Br",
    atomicNumber: 35,
    period: 4,
    group: 17,
    color: "pink",
  },
  {
    name: "Krypton",
    symbol: "Kr",
    atomicNumber: 36,
    period: 4,
    group: 18,
    color: "lightBlue",
  },
  //
  //
  // Period 5
  //
  //
  {
    name: "Rubidium",
    symbol: "Rb",
    atomicNumber: 37,
    period: 5,
    group: 1,
    color: "orange",
  },
  {
    name: "Strontium",
    symbol: "Sr",
    atomicNumber: 38,
    period: 5,
    group: 2,
    color: "yellow",
  },
  {
    name: "Yttrium",
    symbol: "Y",
    atomicNumber: 39,
    period: 5,
    group: 3,
    color: lightBlue,
  },
  {
    name: "Zirconium",
    symbol: "Zr",
    atomicNumber: 40,
    period: 5,
    group: 4,
    color: lightBlue,
  },
  {
    name: "Niobium",
    symbol: "Nb",
    atomicNumber: 41,
    period: 5,
    group: 5,
    color: lightBlue,
  },
  {
    name: "Molybendium",
    symbol: "Mo",
    atomicNumber: 42,
    period: 5,
    group: 6,
    color: lightBlue,
  },
  {
    name: "Technetium",
    symbol: "Tc",
    atomicNumber: 43,
    period: 5,
    group: 7,
    color: lightBlue,
  },
  {
    name: "Ruthenium",
    symbol: "Ru",
    atomicNumber: 45,
    period: 5,
    group: 8,
    color: lightBlue,
  },
  {
    name: "Rhodium",
    symbol: "Rh",
    atomicNumber: 27,
    period: 5,
    group: 9,
    color: lightBlue,
  },
  {
    name: "Palladium",
    symbol: "Pd",
    atomicNumber: 46,
    period: 5,
    group: 10,
    color: lightBlue,
  },
  {
    name: "Silver",
    symbol: "Ag",
    atomicNumber: 47,
    period: 5,
    group: 11,
    color: lightBlue,
  },
  {
    name: "Cadmium",
    symbol: "Cd",
    atomicNumber: 48,
    period: 5,
    group: 12,
    color: lightBlue,
  },
  {
    name: "Indium",
    symbol: "In",
    atomicNumber: 49,
    period: 5,
    group: 13,
    color: lightYellow,
  },
  {
    name: "Tin",
    symbol: "Sn",
    atomicNumber: 50,
    period: 5,
    group: 14,
    color: lightYellow,
  },
  {
    name: "Antimony",
    symbol: "Sb",
    atomicNumber: 51,
    period: 5,
    group: 15,
    color: "lightGreen",
  },
  {
    name: "Tellurium",
    symbol: "Te",
    atomicNumber: 52,
    period: 5,
    group: 16,
    color: "lightGreen",
  },
  {
    name: "Iodine",
    symbol: "I",
    atomicNumber: 53,
    period: 5,
    group: 17,
    color: "pink",
  },
  {
    name: "Xenon",
    symbol: "Xe",
    atomicNumber: 54,
    period: 5,
    group: 18,
    color: "lightBlue",
  },
  //
  //
  // Period 6
  //
  //
  {
    name: "Cesium",
    symbol: "Cs",
    atomicNumber: 55,
    period: 6,
    group: 1,
    color: "orange",
  },
  {
    name: "Barium",
    symbol: "Ba",
    atomicNumber: 56,
    period: 6,
    group: 2,
    color: "yellow",
  },

  {
    name: "Hafnium",
    symbol: "Hf",
    atomicNumber: 56,
    period: 6,
    group: 4,
    color: lightBlue,
  },
  {
    name: "Tantalum",
    symbol: "Ta",
    atomicNumber: 73,
    period: 6,
    group: 5,
    color: lightBlue,
  },
  {
    name: "Tungsten",
    symbol: "W",
    atomicNumber: 74,
    period: 6,
    group: 6,
    color: lightBlue,
  },
  {
    name: "Rhenium",
    symbol: "Re",
    atomicNumber: 75,
    period: 6,
    group: 7,
    color: lightBlue,
  },
  {
    name: "Osmium",
    symbol: "Os",
    atomicNumber: 76,
    period: 6,
    group: 8,
    color: lightBlue,
  },
  {
    name: "Iridium",
    symbol: "Ir",
    atomicNumber: 77,
    period: 6,
    group: 9,
    color: lightBlue,
  },
  {
    name: "Platinum",
    symbol: "Pt",
    atomicNumber: 78,
    period: 6,
    group: 10,
    color: lightBlue,
  },
  {
    name: "Gold",
    symbol: "Au",
    atomicNumber: 79,
    period: 6,
    group: 11,
    color: lightBlue,
  },
  {
    name: "Mercury",
    symbol: "Hg",
    atomicNumber: 80,
    period: 6,
    group: 12,
    color: lightBlue,
  },
  {
    name: "Thallium",
    symbol: "Tl",
    atomicNumber: 81,
    period: 6,
    group: 13,
    color: lightYellow,
  },
  {
    name: "Lead",
    symbol: "Pb",
    atomicNumber: 82,
    period: 6,
    group: 14,
    color: lightYellow,
  },
  {
    name: "Bismuth",
    symbol: "Bi",
    atomicNumber: 83,
    period: 6,
    group: 15,
    color: lightYellow,
  },
  {
    name: "Polonium",
    symbol: "Po",
    atomicNumber: 84,
    period: 6,
    group: 16,
    color: lightYellow,
  },
  {
    name: "Astatine",
    symbol: "At",
    atomicNumber: 85,
    period: 6,
    group: 17,
    color: "pink",
  },
  {
    name: "Radon",
    symbol: "Rn",
    atomicNumber: 86,
    period: 6,
    group: 18,
    color: "lightBlue",
  },
  //
  //
  // Period 7
  //
  //
  {
    name: "Francium",
    symbol: "Fr",
    atomicNumber: 87,
    period: 7,
    group: 1,
    color: "orange",
  },
  {
    name: "Radium",
    symbol: "Ra",
    atomicNumber: 88,
    period: 7,
    group: 2,
    color: "yellow",
  },

  {
    name: "Rutherfordium",
    symbol: "Rf",
    atomicNumber: 104,
    period: 7,
    group: 4,
    color: lightBlue,
  },
  {
    name: "Dubnium",
    symbol: "Db",
    atomicNumber: 105,
    period: 7,
    group: 5,
    color: lightBlue,
  },
  {
    name: "Seaborgium",
    symbol: "Sg",
    atomicNumber: 106,
    period: 7,
    group: 6,
    color: lightBlue,
  },
  {
    name: "Bohrium",
    symbol: "Bh",
    atomicNumber: 107,
    period: 7,
    group: 7,
    color: lightBlue,
  },
  {
    name: "Hassium",
    symbol: "Hs",
    atomicNumber: 108,
    period: 7,
    group: 8,
    color: lightBlue,
  },
  {
    name: "Meitnerium",
    symbol: "Mt",
    atomicNumber: 109,
    period: 7,
    group: 9,
    color: lightBlue,
  },
  {
    name: "Darmstadtium",
    symbol: "Ds",
    atomicNumber: 110,
    period: 7,
    group: 10,
    color: lightBlue,
  },
  {
    name: "Roentgenium",
    symbol: "Rg",
    atomicNumber: 111,
    period: 7,
    group: 11,
    color: lightBlue,
  },
  {
    name: "Copernicium",
    symbol: "Cn",
    atomicNumber: 112,
    period: 7,
    group: 12,
    color: lightBlue,
  },
  {
    name: "Nihonium",
    symbol: "Nh",
    atomicNumber: 113,
    period: 7,
    group: 13,
    color: lightYellow,
  },
  {
    name: "Flerovium",
    symbol: "Fl",
    atomicNumber: 114,
    period: 7,
    group: 14,
    color: lightYellow,
  },
  {
    name: "Moscovium",
    symbol: "Mc",
    atomicNumber: 115,
    period: 7,
    group: 15,
    color: lightYellow,
  },
  {
    name: "Livermorium",
    symbol: "Lv",
    atomicNumber: 116,
    period: 7,
    group: 16,
    color: lightYellow,
  },
  {
    name: "Tennessine",
    symbol: "Ts",
    atomicNumber: 117,
    period: 7,
    group: 17,
    color: "pink",
  },
  {
    name: "Oganesson",
    symbol: "Og",
    atomicNumber: 118,
    period: 7,
    group: 18,
    color: "lightBlue",
  },

  //
  //
  // Lanthanides
  //
  //

  {
    name: "Rutherfordium",
    symbol: "Rf",
    atomicNumber: 104,
    period: 8.5,
    group: 4,
    color: lightRed,
  },
  {
    name: "Dubnium",
    symbol: "Db",
    atomicNumber: 105,
    period: 8.5,
    group: 5,
    color: lightRed,
  },
  {
    name: "Seaborgium",
    symbol: "Sg",
    atomicNumber: 106,
    period: 8.5,
    group: 6,
    color: lightRed,
  },
  {
    name: "Bohrium",
    symbol: "Bh",
    atomicNumber: 107,
    period: 8.5,
    group: 7,
    color: lightRed,
  },
  {
    name: "Hassium",
    symbol: "Hs",
    atomicNumber: 108,
    period: 8.5,
    group: 8,
    color: lightRed,
  },
  {
    name: "Meitnerium",
    symbol: "Mt",
    atomicNumber: 109,
    period: 8.5,
    group: 9,
    color: lightRed,
  },
  {
    name: "Darmstadtium",
    symbol: "Ds",
    atomicNumber: 110,
    period: 8.5,
    group: 10,
    color: lightRed,
  },
  {
    name: "Roentgenium",
    symbol: "Rg",
    atomicNumber: 111,
    period: 8.5,
    group: 11,
    color: lightRed,
  },
  {
    name: "Copernicium",
    symbol: "Cn",
    atomicNumber: 112,
    period: 8.5,
    group: 12,
    color: lightRed,
  },
  {
    name: "Nihonium",
    symbol: "Nh",
    atomicNumber: 113,
    period: 8.5,
    group: 13,
    color: lightRed,
  },
  {
    name: "Flerovium",
    symbol: "Fl",
    atomicNumber: 114,
    period: 8.5,
    group: 14,
    color: lightRed,
  },
  {
    name: "Moscovium",
    symbol: "Mc",
    atomicNumber: 115,
    period: 8.5,
    group: 15,
    color: lightRed,
  },
  {
    name: "Livermorium",
    symbol: "Lv",
    atomicNumber: 116,
    period: 8.5,
    group: 16,
    color: lightRed,
  },
  {
    name: "Tennessine",
    symbol: "Ts",
    atomicNumber: 117,
    period: 8.5,
    group: 17,
    color: lightRed,
  },
  {
    name: "Oganesson",
    symbol: "Og",
    atomicNumber: 118,
    period: 8.5,
    group: 18,
    color: lightRed,
  },

  //
  //
  // Actinides
  //
  //

  {
    name: "Rutherfordium",
    symbol: "Rf",
    atomicNumber: 104,
    period: 9.5,
    group: 4,
    color: lightBrown,
  },
  {
    name: "Dubnium",
    symbol: "Db",
    atomicNumber: 105,
    period: 9.5,
    group: 5,
    color: lightBrown,
  },
  {
    name: "Seaborgium",
    symbol: "Sg",
    atomicNumber: 106,
    period: 9.5,
    group: 6,
    color: lightBrown,
  },
  {
    name: "Bohrium",
    symbol: "Bh",
    atomicNumber: 107,
    period: 9.5,
    group: 7,
    color: lightBrown,
  },
  {
    name: "Hassium",
    symbol: "Hs",
    atomicNumber: 108,
    period: 9.5,
    group: 8,
    color: lightBrown,
  },
  {
    name: "Meitnerium",
    symbol: "Mt",
    atomicNumber: 109,
    period: 9.5,
    group: 9,
    color: lightBrown,
  },
  {
    name: "Darmstadtium",
    symbol: "Ds",
    atomicNumber: 110,
    period: 9.5,
    group: 10,
    color: lightBrown,
  },
  {
    name: "Roentgenium",
    symbol: "Rg",
    atomicNumber: 111,
    period: 9.5,
    group: 11,
    color: lightBrown,
  },
  {
    name: "Copernicium",
    symbol: "Cn",
    atomicNumber: 112,
    period: 9.5,
    group: 12,
    color: lightBrown,
  },
  {
    name: "Nihonium",
    symbol: "Nh",
    atomicNumber: 113,
    period: 9.5,
    group: 13,
    color: lightBrown,
  },
  {
    name: "Flerovium",
    symbol: "Fl",
    atomicNumber: 114,
    period: 9.5,
    group: 14,
    color: lightBrown,
  },
  {
    name: "Moscovium",
    symbol: "Mc",
    atomicNumber: 115,
    period: 9.5,
    group: 15,
    color: lightBrown,
  },
  {
    name: "Livermorium",
    symbol: "Lv",
    atomicNumber: 116,
    period: 9.5,
    group: 16,
    color: lightBrown,
  },
  {
    name: "Tennessine",
    symbol: "Ts",
    atomicNumber: 117,
    period: 9.5,
    group: 17,
    color: lightBrown,
  },
  {
    name: "Oganesson",
    symbol: "Og",
    atomicNumber: 118,
    period: 9.5,
    group: 18,
    color: lightBrown,
  },
];
