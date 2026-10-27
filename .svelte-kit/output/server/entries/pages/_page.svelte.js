import { a as stringify, l as escape_html, r as ensure_array_like, s as attr, t as attr_style } from "../../chunks/server.js";
import "../../chunks/index-server.js";
// src/lib/stores.svelte.ts
var gameStore = {
	startTime: 0,
	time: 0,
	previousTime: 0,
	timerIsRunning: false,
	paused: false,
	elementList: [],
	currentElementName: "Press Timer To Start",
	currentElementLocation: "LEFT",
	locationMode: false,
	selectedElementSet: []
};
var tournamentStore = {
	tournamentMode: false,
	currentActiveMatchId: null,
	tournamentData: {
		participants: [
			"Hydrogen",
			"Helium",
			"Lithium",
			"Beryllium",
			"Boron",
			"Carbon",
			"Nitrogen",
			"Oxygen"
		],
		stage: [{
			id: 0,
			tournament_id: 0,
			name: "Periodic Table Championship",
			type: "single_elimination",
			settings: {}
		}],
		group: [{
			id: 0,
			stage_id: 0,
			number: 1
		}],
		round: [],
		match: [],
		contestant: []
	}
};
// src/lib/elements.ts
var lightPurple = "#D400FF";
var lightYellow = "#D4FF00";
var lightBlue = "#E6FBFF";
var lightRed = "#e82323";
var lightBrown = "#6d6e3a";
var elements = [
	{
		name: "Hydrogen",
		symbol: "H",
		atomicNumber: 1,
		period: 1,
		group: 1,
		location: "LEFT",
		color: lightPurple
	},
	{
		name: "Helium",
		symbol: "He",
		atomicNumber: 2,
		period: 1,
		group: 18,
		location: "RIGHT",
		color: lightBlue
	},
	{
		name: "Lithium",
		symbol: "Li",
		atomicNumber: 3,
		period: 2,
		group: 1,
		color: "orange",
		location: "LEFT"
	},
	{
		name: "Beryllium",
		symbol: "Be",
		atomicNumber: 4,
		period: 2,
		group: 2,
		location: "LEFT",
		color: "yellow"
	},
	{
		name: "Boron",
		symbol: "B",
		atomicNumber: 5,
		period: 2,
		group: 13,
		location: "RIGHT",
		color: lightYellow
	},
	{
		name: "Carbon",
		symbol: "C",
		atomicNumber: 6,
		period: 2,
		group: 14,
		location: "RIGHT",
		color: lightPurple
	},
	{
		name: "Nitrogen",
		symbol: "N",
		atomicNumber: 7,
		period: 2,
		group: 15,
		location: "RIGHT",
		color: lightPurple
	},
	{
		name: "Oxygen",
		symbol: "O",
		atomicNumber: 8,
		period: 2,
		group: 16,
		location: "RIGHT",
		color: lightPurple
	},
	{
		name: "Fluorine",
		symbol: "F",
		atomicNumber: 9,
		period: 2,
		group: 17,
		location: "RIGHT",
		color: "pink"
	},
	{
		name: "Neon",
		symbol: "Ne",
		atomicNumber: 10,
		period: 2,
		group: 18,
		location: "RIGHT",
		color: lightBlue
	},
	{
		name: "Sodium",
		symbol: "Na",
		atomicNumber: 11,
		period: 3,
		group: 1,
		location: "LEFT",
		color: "orange"
	},
	{
		name: "Magnesium",
		symbol: "Mg",
		atomicNumber: 12,
		period: 3,
		group: 2,
		location: "LEFT",
		color: "yellow"
	},
	{
		name: "Aluminum",
		symbol: "Al",
		atomicNumber: 13,
		period: 3,
		group: 13,
		location: "RIGHT",
		color: lightYellow
	},
	{
		name: "Silicon",
		symbol: "Si",
		atomicNumber: 14,
		period: 3,
		group: 14,
		location: "RIGHT",
		color: "lightGreen"
	},
	{
		name: "Phosphorus",
		symbol: "P",
		atomicNumber: 15,
		period: 3,
		group: 15,
		location: "RIGHT",
		color: lightPurple
	},
	{
		name: "Sulfur",
		symbol: "S",
		atomicNumber: 16,
		period: 3,
		group: 16,
		location: "RIGHT",
		color: lightPurple
	},
	{
		name: "Chlorine",
		symbol: "Cl",
		atomicNumber: 17,
		period: 3,
		group: 17,
		location: "RIGHT",
		color: "pink"
	},
	{
		name: "Argon",
		symbol: "Ar",
		atomicNumber: 18,
		period: 3,
		group: 18,
		location: "RIGHT",
		color: lightBlue
	},
	{
		name: "Potassium",
		symbol: "K",
		atomicNumber: 19,
		period: 4,
		group: 1,
		location: "LEFT",
		color: "orange"
	},
	{
		name: "Calcium",
		symbol: "Ca",
		atomicNumber: 20,
		period: 4,
		group: 2,
		location: "LEFT",
		color: "yellow"
	},
	{
		name: "Scandium",
		symbol: "Sc",
		atomicNumber: 21,
		period: 4,
		group: 3,
		location: "MIDDLE",
		color: lightBlue
	},
	{
		name: "Titanium",
		symbol: "Ti",
		atomicNumber: 22,
		period: 4,
		group: 4,
		location: "MIDDLE",
		color: lightBlue
	},
	{
		name: "Vanadium",
		symbol: "V",
		atomicNumber: 23,
		period: 4,
		group: 5,
		location: "MIDDLE",
		color: lightBlue
	},
	{
		name: "Chromium",
		symbol: "Cr",
		atomicNumber: 24,
		period: 4,
		group: 6,
		location: "MIDDLE",
		color: lightBlue
	},
	{
		name: "Manganese",
		symbol: "Mn",
		atomicNumber: 25,
		period: 4,
		group: 7,
		location: "MIDDLE",
		color: lightBlue
	},
	{
		name: "Iron",
		symbol: "Fe",
		atomicNumber: 26,
		period: 4,
		group: 8,
		location: "MIDDLE",
		color: lightBlue
	},
	{
		name: "Cobalt",
		symbol: "Co",
		atomicNumber: 27,
		period: 4,
		group: 9,
		location: "MIDDLE",
		color: lightBlue
	},
	{
		name: "Nickel",
		symbol: "Ni",
		atomicNumber: 28,
		period: 4,
		group: 10,
		location: "MIDDLE",
		color: lightBlue
	},
	{
		name: "Copper",
		symbol: "Cu",
		atomicNumber: 29,
		period: 4,
		group: 11,
		location: "MIDDLE",
		color: lightBlue
	},
	{
		name: "Zinc",
		symbol: "Zn",
		atomicNumber: 30,
		period: 4,
		group: 12,
		location: "MIDDLE",
		color: lightBlue
	},
	{
		name: "Gallium",
		symbol: "Ga",
		atomicNumber: 31,
		period: 4,
		group: 13,
		location: "RIGHT",
		color: lightYellow
	},
	{
		name: "Germanium",
		symbol: "Ge",
		atomicNumber: 32,
		period: 4,
		group: 14,
		location: "RIGHT",
		color: "lightGreen"
	},
	{
		name: "Arsenic",
		symbol: "As",
		atomicNumber: 33,
		period: 4,
		group: 15,
		location: "RIGHT",
		color: "lightGreen"
	},
	{
		name: "Selenium",
		symbol: "Se",
		atomicNumber: 34,
		period: 4,
		group: 16,
		location: "RIGHT",
		color: lightPurple
	},
	{
		name: "Bromine",
		symbol: "Br",
		atomicNumber: 35,
		period: 4,
		group: 17,
		location: "RIGHT",
		color: "pink"
	},
	{
		name: "Krypton",
		symbol: "Kr",
		atomicNumber: 36,
		period: 4,
		group: 18,
		location: "RIGHT",
		color: lightBlue
	},
	{
		name: "Rubidium",
		symbol: "Rb",
		atomicNumber: 37,
		period: 5,
		group: 1,
		location: "LEFT",
		color: "orange"
	},
	{
		name: "Strontium",
		symbol: "Sr",
		atomicNumber: 38,
		period: 5,
		group: 2,
		location: "LEFT",
		color: "yellow"
	},
	{
		name: "Yttrium",
		symbol: "Y",
		atomicNumber: 39,
		period: 5,
		group: 3,
		location: "MIDDLE",
		color: lightBlue
	},
	{
		name: "Zirconium",
		symbol: "Zr",
		atomicNumber: 40,
		period: 5,
		group: 4,
		location: "MIDDLE",
		color: lightBlue
	},
	{
		name: "Niobium",
		symbol: "Nb",
		atomicNumber: 41,
		period: 5,
		group: 5,
		location: "MIDDLE",
		color: lightBlue
	},
	{
		name: "Molybdenum",
		symbol: "Mo",
		atomicNumber: 42,
		period: 5,
		group: 6,
		location: "MIDDLE",
		color: lightBlue
	},
	{
		name: "Technetium",
		symbol: "Tc",
		atomicNumber: 43,
		period: 5,
		group: 7,
		location: "MIDDLE",
		color: lightBlue
	},
	{
		name: "Ruthenium",
		symbol: "Ru",
		atomicNumber: 44,
		period: 5,
		group: 8,
		location: "MIDDLE",
		color: lightBlue
	},
	{
		name: "Rhodium",
		symbol: "Rh",
		atomicNumber: 45,
		period: 5,
		group: 9,
		location: "MIDDLE",
		color: lightBlue
	},
	{
		name: "Palladium",
		symbol: "Pd",
		atomicNumber: 46,
		period: 5,
		group: 10,
		location: "MIDDLE",
		color: lightBlue
	},
	{
		name: "Silver",
		symbol: "Ag",
		atomicNumber: 47,
		period: 5,
		group: 11,
		location: "MIDDLE",
		color: lightBlue
	},
	{
		name: "Cadmium",
		symbol: "Cd",
		atomicNumber: 48,
		period: 5,
		group: 12,
		location: "MIDDLE",
		color: lightBlue
	},
	{
		name: "Indium",
		symbol: "In",
		atomicNumber: 49,
		period: 5,
		group: 13,
		location: "RIGHT",
		color: lightYellow
	},
	{
		name: "Tin",
		symbol: "Sn",
		atomicNumber: 50,
		period: 5,
		group: 14,
		location: "RIGHT",
		color: lightYellow
	},
	{
		name: "Antimony",
		symbol: "Sb",
		atomicNumber: 51,
		period: 5,
		group: 15,
		location: "RIGHT",
		color: "lightGreen"
	},
	{
		name: "Tellurium",
		symbol: "Te",
		atomicNumber: 52,
		period: 5,
		group: 16,
		location: "RIGHT",
		color: "lightGreen"
	},
	{
		name: "Iodine",
		symbol: "I",
		atomicNumber: 53,
		period: 5,
		group: 17,
		location: "RIGHT",
		color: "pink"
	},
	{
		name: "Xenon",
		symbol: "Xe",
		atomicNumber: 54,
		period: 5,
		group: 18,
		location: "RIGHT",
		color: lightBlue
	},
	{
		name: "Cesium",
		symbol: "Cs",
		atomicNumber: 55,
		period: 6,
		group: 1,
		location: "LEFT",
		color: "orange"
	},
	{
		name: "Barium",
		symbol: "Ba",
		atomicNumber: 56,
		period: 6,
		group: 2,
		location: "LEFT",
		color: "yellow"
	},
	{
		name: "Hafnium",
		symbol: "Hf",
		atomicNumber: 72,
		period: 6,
		group: 4,
		location: "MIDDLE",
		color: lightBlue
	},
	{
		name: "Tantalum",
		symbol: "Ta",
		atomicNumber: 73,
		period: 6,
		group: 5,
		location: "MIDDLE",
		color: lightBlue
	},
	{
		name: "Tungsten",
		symbol: "W",
		atomicNumber: 74,
		period: 6,
		group: 6,
		location: "MIDDLE",
		color: lightBlue
	},
	{
		name: "Rhenium",
		symbol: "Re",
		atomicNumber: 75,
		period: 6,
		group: 7,
		location: "MIDDLE",
		color: lightBlue
	},
	{
		name: "Osmium",
		symbol: "Os",
		atomicNumber: 76,
		period: 6,
		group: 8,
		location: "MIDDLE",
		color: lightBlue
	},
	{
		name: "Iridium",
		symbol: "Ir",
		atomicNumber: 77,
		period: 6,
		group: 9,
		location: "MIDDLE",
		color: lightBlue
	},
	{
		name: "Platinum",
		symbol: "Pt",
		atomicNumber: 78,
		period: 6,
		group: 10,
		location: "MIDDLE",
		color: lightBlue
	},
	{
		name: "Gold",
		symbol: "Au",
		atomicNumber: 79,
		period: 6,
		group: 11,
		location: "MIDDLE",
		color: lightBlue
	},
	{
		name: "Mercury",
		symbol: "Hg",
		atomicNumber: 80,
		period: 6,
		group: 12,
		location: "MIDDLE",
		color: lightBlue
	},
	{
		name: "Thallium",
		symbol: "Tl",
		atomicNumber: 81,
		period: 6,
		group: 13,
		location: "RIGHT",
		color: lightYellow
	},
	{
		name: "Lead",
		symbol: "Pb",
		atomicNumber: 82,
		period: 6,
		group: 14,
		location: "RIGHT",
		color: lightYellow
	},
	{
		name: "Bismuth",
		symbol: "Bi",
		atomicNumber: 83,
		period: 6,
		group: 15,
		location: "RIGHT",
		color: lightYellow
	},
	{
		name: "Polonium",
		symbol: "Po",
		atomicNumber: 84,
		period: 6,
		group: 16,
		location: "RIGHT",
		color: lightYellow
	},
	{
		name: "Astatine",
		symbol: "At",
		atomicNumber: 85,
		period: 6,
		group: 17,
		location: "RIGHT",
		color: "pink"
	},
	{
		name: "Radon",
		symbol: "Rn",
		atomicNumber: 86,
		period: 6,
		group: 18,
		location: "RIGHT",
		color: lightBlue
	},
	{
		name: "Francium",
		symbol: "Fr",
		atomicNumber: 87,
		period: 7,
		group: 1,
		location: "LEFT",
		color: "orange"
	},
	{
		name: "Radium",
		symbol: "Ra",
		atomicNumber: 88,
		period: 7,
		group: 2,
		location: "LEFT",
		color: "yellow"
	},
	{
		name: "Rutherfordium",
		symbol: "Rf",
		atomicNumber: 104,
		period: 7,
		group: 4,
		location: "MIDDLE",
		color: lightBlue
	},
	{
		name: "Dubnium",
		symbol: "Db",
		atomicNumber: 105,
		period: 7,
		group: 5,
		location: "MIDDLE",
		color: lightBlue
	},
	{
		name: "Seaborgium",
		symbol: "Sg",
		atomicNumber: 106,
		period: 7,
		group: 6,
		location: "MIDDLE",
		color: lightBlue
	},
	{
		name: "Bohrium",
		symbol: "Bh",
		atomicNumber: 107,
		period: 7,
		group: 7,
		location: "MIDDLE",
		color: lightBlue
	},
	{
		name: "Hassium",
		symbol: "Hs",
		atomicNumber: 108,
		period: 7,
		group: 8,
		location: "MIDDLE",
		color: lightBlue
	},
	{
		name: "Meitnerium",
		symbol: "Mt",
		atomicNumber: 109,
		period: 7,
		group: 9,
		location: "MIDDLE",
		color: lightBlue
	},
	{
		name: "Darmstadtium",
		symbol: "Ds",
		atomicNumber: 110,
		period: 7,
		group: 10,
		location: "MIDDLE",
		color: lightBlue
	},
	{
		name: "Roentgenium",
		symbol: "Rg",
		atomicNumber: 111,
		period: 7,
		group: 11,
		location: "MIDDLE",
		color: lightBlue
	},
	{
		name: "Copernicium",
		symbol: "Cn",
		atomicNumber: 112,
		period: 7,
		group: 12,
		location: "MIDDLE",
		color: lightBlue
	},
	{
		name: "Nihonium",
		symbol: "Nh",
		atomicNumber: 113,
		period: 7,
		group: 13,
		location: "RIGHT",
		color: lightYellow
	},
	{
		name: "Flerovium",
		symbol: "Fl",
		atomicNumber: 114,
		period: 7,
		group: 14,
		location: "RIGHT",
		color: lightYellow
	},
	{
		name: "Moscovium",
		symbol: "Mc",
		atomicNumber: 115,
		period: 7,
		group: 15,
		location: "RIGHT",
		color: lightYellow
	},
	{
		name: "Livermorium",
		symbol: "Lv",
		atomicNumber: 116,
		period: 7,
		group: 16,
		location: "RIGHT",
		color: lightYellow
	},
	{
		name: "Tennessine",
		symbol: "Ts",
		atomicNumber: 117,
		period: 7,
		group: 17,
		location: "RIGHT",
		color: "pink"
	},
	{
		name: "Oganesson",
		symbol: "Og",
		atomicNumber: 118,
		period: 7,
		group: 18,
		location: "RIGHT",
		color: lightBlue
	},
	{
		name: "Lanthanum",
		symbol: "La",
		atomicNumber: 57,
		period: 8.5,
		group: 4,
		location: "RARE_EARTH",
		color: lightRed
	},
	{
		name: "Cerium",
		symbol: "Ce",
		atomicNumber: 58,
		period: 8.5,
		group: 5,
		location: "RARE_EARTH",
		color: lightRed
	},
	{
		name: "Praseodymium",
		symbol: "Pr",
		atomicNumber: 59,
		period: 8.5,
		group: 6,
		location: "RARE_EARTH",
		color: lightRed
	},
	{
		name: "Neodymium",
		symbol: "Nd",
		atomicNumber: 60,
		period: 8.5,
		group: 7,
		location: "RARE_EARTH",
		color: lightRed
	},
	{
		name: "Promethium",
		symbol: "Pm",
		atomicNumber: 61,
		period: 8.5,
		group: 8,
		location: "RARE_EARTH",
		color: lightRed
	},
	{
		name: "Samarium",
		symbol: "Sm",
		atomicNumber: 62,
		period: 8.5,
		group: 9,
		location: "RARE_EARTH",
		color: lightRed
	},
	{
		name: "Europium",
		symbol: "Eu",
		atomicNumber: 63,
		period: 8.5,
		group: 10,
		location: "RARE_EARTH",
		color: lightRed
	},
	{
		name: "Gadolinium",
		symbol: "Gd",
		atomicNumber: 64,
		period: 8.5,
		group: 11,
		location: "RARE_EARTH",
		color: lightRed
	},
	{
		name: "Terbium",
		symbol: "Tb",
		atomicNumber: 65,
		period: 8.5,
		group: 12,
		location: "RARE_EARTH",
		color: lightRed
	},
	{
		name: "Dysprosium",
		symbol: "Dy",
		atomicNumber: 66,
		period: 8.5,
		group: 13,
		location: "RARE_EARTH",
		color: lightRed
	},
	{
		name: "Holmium",
		symbol: "Ho",
		atomicNumber: 67,
		period: 8.5,
		group: 14,
		location: "RARE_EARTH",
		color: lightRed
	},
	{
		name: "Erbium",
		symbol: "Er",
		atomicNumber: 68,
		period: 8.5,
		group: 15,
		location: "RARE_EARTH",
		color: lightRed
	},
	{
		name: "Thulium",
		symbol: "Tm",
		atomicNumber: 69,
		period: 8.5,
		group: 16,
		location: "RARE_EARTH",
		color: lightRed
	},
	{
		name: "Ytterbium",
		symbol: "Yb",
		atomicNumber: 70,
		period: 8.5,
		group: 17,
		location: "RARE_EARTH",
		color: lightRed
	},
	{
		name: "Lutetium",
		symbol: "Lu",
		atomicNumber: 71,
		period: 8.5,
		group: 18,
		location: "RARE_EARTH",
		color: lightRed
	},
	{
		name: "Actinium",
		symbol: "Ac",
		atomicNumber: 89,
		period: 9.5,
		group: 4,
		location: "RARE_EARTH",
		color: lightBrown
	},
	{
		name: "Thorium",
		symbol: "Th",
		atomicNumber: 90,
		period: 9.5,
		group: 5,
		location: "RARE_EARTH",
		color: lightBrown
	},
	{
		name: "Protactinium",
		symbol: "Pa",
		atomicNumber: 91,
		period: 9.5,
		group: 6,
		location: "RARE_EARTH",
		color: lightBrown
	},
	{
		name: "Uranium",
		symbol: "U",
		atomicNumber: 92,
		period: 9.5,
		group: 7,
		location: "RARE_EARTH",
		color: lightBrown
	},
	{
		name: "Neptunium",
		symbol: "Np",
		atomicNumber: 93,
		period: 9.5,
		group: 8,
		location: "RARE_EARTH",
		color: lightBrown
	},
	{
		name: "Plutonium",
		symbol: "Pu",
		atomicNumber: 94,
		period: 9.5,
		group: 9,
		location: "RARE_EARTH",
		color: lightBrown
	},
	{
		name: "Americium",
		symbol: "Am",
		atomicNumber: 95,
		period: 9.5,
		group: 10,
		location: "RARE_EARTH",
		color: lightBrown
	},
	{
		name: "Curium",
		symbol: "Cm",
		atomicNumber: 96,
		period: 9.5,
		group: 11,
		location: "RARE_EARTH",
		color: lightBrown
	},
	{
		name: "Berkelium",
		symbol: "Bk",
		atomicNumber: 97,
		period: 9.5,
		group: 12,
		location: "RARE_EARTH",
		color: lightBrown
	},
	{
		name: "Californium",
		symbol: "Cf",
		atomicNumber: 98,
		period: 9.5,
		group: 13,
		location: "RARE_EARTH",
		color: lightBrown
	},
	{
		name: "Einsteinium",
		symbol: "Es",
		atomicNumber: 99,
		period: 9.5,
		group: 14,
		location: "RARE_EARTH",
		color: lightBrown
	},
	{
		name: "Fermium",
		symbol: "Fm",
		atomicNumber: 100,
		period: 9.5,
		group: 15,
		location: "RARE_EARTH",
		color: lightBrown
	},
	{
		name: "Mendelevium",
		symbol: "Md",
		atomicNumber: 101,
		period: 9.5,
		group: 16,
		location: "RARE_EARTH",
		color: lightBrown
	},
	{
		name: "Nobelium",
		symbol: "No",
		atomicNumber: 102,
		period: 9.5,
		group: 17,
		location: "RARE_EARTH",
		color: lightBrown
	},
	{
		name: "Lawrencium",
		symbol: "Lr",
		atomicNumber: 103,
		period: 9.5,
		group: 18,
		location: "RARE_EARTH",
		color: lightBrown
	}
];
var elementSetFirst18 = [
	"H",
	"He",
	"Li",
	"Be",
	"B",
	"C",
	"N",
	"O",
	"F",
	"Ne",
	"Na",
	"Mg",
	"Al",
	"Si",
	"P",
	"S",
	"Cl",
	"Ar"
];
// src/routes/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let selectedDropdownVal = "First 18 Elements";
		function setElementSet() {
			switch (selectedDropdownVal) {
				case "First 18 Elements": gameStore.selectedElementSet = elementSetFirst18;
			}
		}
		function getCellBackground(elem) {
			if (!gameStore.selectedElementSet.includes(elem.symbol)) return "#3c484b";
			if (!gameStore.locationMode) return elem.color;
			if (elem.location === "LEFT") return "red";
			if (elem.location === "MIDDLE") return "green";
			if (elem.location === "RARE_EARTH") return "purple";
			return "cyan";
		}
		$$renderer.push(`<header class="game-header svelte-1uha8ag"><div class="target-box svelte-1uha8ag">${escape_html(gameStore.currentElementName)}</div> <div class="timer-area svelte-1uha8ag"><span class="prev-time svelte-1uha8ag">${escape_html(gameStore.previousTime)} seconds</span> <div class="timer-main-row svelte-1uha8ag"><button class="timer-btn svelte-1uha8ag">${escape_html(gameStore.timerIsRunning ? Math.round((Date.now() - gameStore.startTime) / 1e3) : gameStore.paused ? "Resume" : "Start")}</button> `);
		if (gameStore.timerIsRunning || gameStore.paused) $$renderer.push(`<!--[0--><span class="seconds-label">seconds</span>`);
		else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div></div> <div class="dropdown-area svelte-1uha8ag">`);
		$$renderer.select({
			value: selectedDropdownVal,
			onchange: setElementSet,
			disabled: gameStore.timerIsRunning || gameStore.paused,
			class: ""
		}, ($$renderer) => {
			$$renderer.option({ value: "First 10 Elements" }, ($$renderer) => {
				$$renderer.push(`First 10 Elements`);
			});
			$$renderer.option({ value: "First 18 Elements" }, ($$renderer) => {
				$$renderer.push(`First 18 Elements`);
			});
			$$renderer.option({ value: "First 36 Elements" }, ($$renderer) => {
				$$renderer.push(`First 36 Elements`);
			});
			$$renderer.option({ value: "First 54 Elements" }, ($$renderer) => {
				$$renderer.push(`First 54 Elements`);
			});
			$$renderer.option({ value: "Common Elements" }, ($$renderer) => {
				$$renderer.push(`Most Common Elements`);
			});
			$$renderer.option({ value: "All Elements" }, ($$renderer) => {
				$$renderer.push(`All Elements`);
			});
		}, "svelte-1uha8ag");
		$$renderer.push(`</div> <div class="top-controls-bar svelte-1uha8ag"><div class="control-group svelte-1uha8ag"><div class="slider-checkbox"><input type="checkbox" id="location-check"${attr("checked", gameStore.locationMode, true)}/> <label for="location-check"><span></span></label></div> <span class="control-label">Location Mode</span></div> <div class="control-group svelte-1uha8ag"><div class="slider-checkbox"><input type="checkbox" id="tourney-check"${attr("checked", tournamentStore.tournamentMode, true)}/> <label for="tourney-check"><span></span></label></div> <span class="control-label">Tournament Mode</span></div></div></header> <main class="periodic-table-grid svelte-1uha8ag"><!--[-->`);
		const each_array = ensure_array_like(elements);
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let elem = each_array[$$index];
			$$renderer.push(`<div class="element-cell svelte-1uha8ag"${attr_style(`grid-row: ${stringify(elem.period)}; grid-column: ${stringify(elem.group)}; background: ${stringify(getCellBackground(elem))}; color: ${gameStore.selectedElementSet.includes(elem.symbol) ? "#000" : "#888"};`)}><span class="element-number">${escape_html(elem.atomicNumber)}</span> <span class="element-symbol">${escape_html(elem.symbol)}</span></div>`);
		}
		$$renderer.push(`<!--]--></main> `);
		if (tournamentStore.tournamentMode) $$renderer.push(`<!--[0--><div class="tournament-buttons-bar svelte-1uha8ag"><button class="tourney-btn svelte-1uha8ag">Manage</button> <button class="tourney-btn view-btn svelte-1uha8ag">View Bracket</button></div>`);
		else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->`);
	});
}
export { _page as default };

//# sourceMappingURL=_page.svelte.js.map