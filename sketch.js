/*

- Grayed out if not in set
- Add Group Numbers
- Scoring system
  - Countdown timer instead
- Add my voice for each element
- Party Horn for start, police sirens for end, techno during?

*/

let gamestate = {
	startTime: 0,
	time: 0,
	previousTime: 0,
	timerIsRunning: false,
	paused: false,
	elementList: [],
	currentElement: "Press Timer To Start",
}

let soundCorrect

function preload() {
	soundCorrect = loadSound("./soundCorrect.mp3")
}

function setup() {
	createCanvas(windowWidth, windowHeight)
	createElementSetDropdown()
}

function draw() {
	background(64)

	// Draw each element box
	if (!gamestate.paused) {
		elements.forEach((e) => drawEl(e))
	}

	// Draw the timer
	drawTimer(roundTwoPlaces(gamestate.startTime), gamestate.timerIsRunning)

	drawElementToFind()
}

let drawTimer = (startTime, isRunning) => {
	let now = Date.now()
	let timeElapsed = roundTwoPlaces((now - startTime) / 1000) // In ms
	let timer = new Clickable()

	timer.locate(windowWidth * 0.37, height * 0.24)
	timer.resize(windowWidth * 0.125, height / 10)
	timer.color = "blue"
	timer.textColor = "white"
	timer.textScaled = true // Scales the text with the clickable
	/*
	 * Display:
	 * Paused when paused
	 * The current time when the timer is running
	 * 60 when they run out of time
	 * 0 at the beginning
	 */
	timer.text =
		gamestate.elementList.length === 0
			? gamestate.time
			: gamestate.paused
			? "Paused"
			: isRunning
			? timeElapsed
			: timeElapsed > 0
			? timeElapsed < 60
				? 60
				: gamestate.time
			: "Start"
	timer.textSize = height / 16

	// Stop the timer when you have found all elements or you run out of time
	if (
		isRunning &&
		((timeElapsed > 0 && gamestate.elementList.length === 0) ||
			timeElapsed >= 60)
	) {
		gamestate.timerIsRunning = false
		gamestate.time = timeElapsed
	}

	// Handle starts and resets
	timer.onPress = () => {
		if (isRunning && gamestate.elementList.length > 0) {
			gamestate.paused = true
			gamestate.timerIsRunning = false
		} else if (gamestate.paused) {
			gamestate.paused = false
			gamestate.timerIsRunning = true
		} else {
			// Start a new round instead of pausing
			gamestate.previousTime = gamestate.time
			startRound()
			gamestate.timerIsRunning = true
		}
	}

	// Draw the text "Seconds"
	textSize(24)
	fill("white")
	text(gamestate.paused ? "" : "seconds", windowWidth * 0.54, height * 0.3)
	fill("black")

	timer.draw()

	// Draw the previous time above the current time
	fill("lightGray")
	text(gamestate.previousTime, windowWidth * 0.38, height * 0.23)
}

let createElementSetDropdown = () => {
	elementSetDropdown = createSelect()
	elementSetDropdown.position(windowWidth * 0.18, height * 0.28)
	elementSetDropdown.option("First 10 Elements")
	elementSetDropdown.option("First 18 Elements")
	elementSetDropdown.option("First 36 Elements")
	elementSetDropdown.option("Most Common Elements")
	elementSetDropdown.option("All Elements")

	// Set the default set
	elementSetDropdown.selected("First 18 Elements")
}

let drawElementToFind = () => {
	fill("white")
	textAlign(CENTER)

	rectMode(CENTER)
	strokeWeight(3)
	rect(
		windowWidth * 0.4,
		height * 0.125,
		windowWidth / 2.25,
		height * 0.1,
		10
	)
	fill("black")
	textSize(height / 14)
	text(
		gamestate.paused
			? "Press Timer To Resume"
			: gamestate.timerIsRunning
			? gamestate.currentElement
			: "Press Timer To Start",
		windowWidth * 0.4,
		height * 0.125 + height / 36
	)

	rectMode(CORNER)
}

let roundTwoPlaces = (number) => {
	return Math.round(number * 100) / 100
}

let getNewElement = (elList) => {
	// Establish what the new element will be

	return elList.length !== 0
		? elList[getRandNumRange(0, elList.length - 1)].name
		: "Done"
}

let getUpdatedElementList = (newElement, oldList) => {
	return oldList.filter((el) => el.name !== newElement)
}

let drawEl = (elem) => {
	let a = width / 19 / 19
	let b = width / 19
	let w = b
	let h = height * 0.09
	// let x = elem.group * (width / 19) + (width / 19)
	let x = a * elem.group + (elem.group - 1) * b
	let y = elem.period * (9 * (height * 0.0105))

	// Using p5.clickable lib
	let el = new Clickable()
	el.locate(x, y) // set position
	el.resize(w, h) // resize button
	el.text = elem.symbol
	el.color = elem.color
	el.textSize = height / 24
	el.textScaled = true // scales the text with the button

	el.onPress = () => {
		// When the student chooses the correct element, get a new one.
		if (elem.name === gamestate.currentElement) {
			// playCorrect()
			gamestate.currentElement = getNewElement(gamestate.elementList)

			// Update the element list to remove the new element

			gamestate.elementList = getUpdatedElementList(
				gamestate.currentElement,
				gamestate.elementList
			)
		}
	}

	el.draw()
}

let lightPurple = "#D400FF" //light purple
let lightYellow = "#D4FF00" // light yellow
let lightBlue = "#E6FBFF" // alt light blue
let lightRed = "#e82323"
let lightBrown = "#6d6e3a"

let getRandNumRange = (min, max) => {
	return Math.round(Math.random() * (max - min) + min)
}

let createElementList = (elementSet) => {
	let newSet = elements.filter((e) => elementSet.includes(e.symbol))
	newSet = shuffleArr(newSet).slice(0, 6)
	return newSet
}

let playCorrect = () => {
	soundCorrect.play(0, 1, 1, 0, 1.25) // startTime, rate, amp, cueStart, duration
}

let setElementSet = () => {
	switch (elementSetDropdown.value()) {
		case "First 10 Elements":
			gamestate.elementList = elementSetFirst10
			break
		case "First 18 Elements":
			gamestate.elementList = elementSetFirst18
			break
		case "First 36 Elements":
			gamestate.elementList = elementSetFirst36
			break
		case "Common Elements":
			gamestate.elementList = elementSetCommonElements
			break
		default:
			gamestate.elementList = elementSetCommonElements
	}
}

let shuffleArr = (a) => {
	return a.sort(() => Math.random() - 0.5)
}

let startRound = () => {
	// Determine which element list is current

	setElementSet()

	gamestate.elementList = createElementList(gamestate.elementList)
	gamestate.currentElement = getNewElement(gamestate.elementList)
	gamestate.elementList = getUpdatedElementList(
		gamestate.currentElement,
		gamestate.elementList
	)
	gamestate.startTime = Date.now()
}

document.oncontextmenu = () => {
	return false
}

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
		name: "Lanthanum",
		symbol: "La",
		atomicNumber: 57,
		period: 8.5,
		group: 4,
		color: lightRed,
	},
	{
		name: "Cerium",
		symbol: "Ce",
		atomicNumber: 58,
		period: 8.5,
		group: 5,
		color: lightRed,
	},
	{
		name: "Praseodymium",
		symbol: "Pr",
		atomicNumber: 59,
		period: 8.5,
		group: 6,
		color: lightRed,
	},
	{
		name: "Neodymium",
		symbol: "Nd",
		atomicNumber: 60,
		period: 8.5,
		group: 7,
		color: lightRed,
	},
	{
		name: "Promethium",
		symbol: "Pm",
		atomicNumber: 61,
		period: 8.5,
		group: 8,
		color: lightRed,
	},
	{
		name: "Samarium",
		symbol: "Sm",
		atomicNumber: 62,
		period: 8.5,
		group: 9,
		color: lightRed,
	},
	{
		name: "Europium",
		symbol: "Eu",
		atomicNumber: 63,
		period: 8.5,
		group: 10,
		color: lightRed,
	},
	{
		name: "Gadolinium",
		symbol: "Gd",
		atomicNumber: 64,
		period: 8.5,
		group: 11,
		color: lightRed,
	},
	{
		name: "Terbium",
		symbol: "Tb",
		atomicNumber: 65,
		period: 8.5,
		group: 12,
		color: lightRed,
	},
	{
		name: "Dysprosium",
		symbol: "Dy",
		atomicNumber: 66,
		period: 8.5,
		group: 13,
		color: lightRed,
	},
	{
		name: "Holmium",
		symbol: "Ho",
		atomicNumber: 67,
		period: 8.5,
		group: 14,
		color: lightRed,
	},
	{
		name: "Erbium",
		symbol: "Er",
		atomicNumber: 68,
		period: 8.5,
		group: 15,
		color: lightRed,
	},
	{
		name: "Thulium",
		symbol: "Tm",
		atomicNumber: 69,
		period: 8.5,
		group: 16,
		color: lightRed,
	},
	{
		name: "Ytterbium",
		symbol: "Tb",
		atomicNumber: 70,
		period: 8.5,
		group: 17,
		color: lightRed,
	},
	{
		name: "Lutetium",
		symbol: "Lu",
		atomicNumber: 71,
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
		name: "Actinium",
		symbol: "Ac",
		atomicNumber: 89,
		period: 9.5,
		group: 4,
		color: lightBrown,
	},
	{
		name: "Thorium",
		symbol: "Th",
		atomicNumber: 90,
		period: 9.5,
		group: 5,
		color: lightBrown,
	},
	{
		name: "Protactinium",
		symbol: "Pa",
		atomicNumber: 91,
		period: 9.5,
		group: 6,
		color: lightBrown,
	},
	{
		name: "Uranium",
		symbol: "U",
		atomicNumber: 92,
		period: 9.5,
		group: 7,
		color: lightBrown,
	},
	{
		name: "Neptunium",
		symbol: "Np",
		atomicNumber: 93,
		period: 9.5,
		group: 8,
		color: lightBrown,
	},
	{
		name: "Plutonium",
		symbol: "Pu",
		atomicNumber: 94,
		period: 9.5,
		group: 9,
		color: lightBrown,
	},
	{
		name: "Americium",
		symbol: "Am",
		atomicNumber: 95,
		period: 9.5,
		group: 10,
		color: lightBrown,
	},
	{
		name: "Curium",
		symbol: "Cm",
		atomicNumber: 96,
		period: 9.5,
		group: 11,
		color: lightBrown,
	},
	{
		name: "Berkelium",
		symbol: "Bk",
		atomicNumber: 97,
		period: 9.5,
		group: 12,
		color: lightBrown,
	},
	{
		name: "Californium",
		symbol: "Cf",
		atomicNumber: 98,
		period: 9.5,
		group: 13,
		color: lightBrown,
	},
	{
		name: "Einsteinium",
		symbol: "Es",
		atomicNumber: 99,
		period: 9.5,
		group: 14,
		color: lightBrown,
	},
	{
		name: "Fermium",
		symbol: "Fm",
		atomicNumber: 100,
		period: 9.5,
		group: 15,
		color: lightBrown,
	},
	{
		name: "Mendelevium",
		symbol: "Md",
		atomicNumber: 101,
		period: 9.5,
		group: 16,
		color: lightBrown,
	},
	{
		name: "Nobelium",
		symbol: "No",
		atomicNumber: 102,
		period: 9.5,
		group: 17,
		color: lightBrown,
	},
	{
		name: "Lawrencium",
		symbol: "Lr",
		atomicNumber: 103,
		period: 9.5,
		group: 18,
		color: lightBrown,
	},
]

let elementSetFirst10 = ["H", "He", "Li", "Be", "B", "C", "N", "O", "F", "Ne"]
let elementSetFirst18 = [
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
	"Ar",
]
let elementSetFirst36 = [
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
	"Ar",
	"K",
	"Ca",
	"Sc",
	"Ti",
	"V",
	"Cr",
	"Mn",
	"Fe",
	"Co",
	"Ni",
	"Cu",
	"Zn",
	"Ga",
	"Ge",
	"As",
	"Se",
	"Br",
	"Kr",
]
let elementSetCommonElements = [
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
	"Ar",
	"K",
	"Ca",
	"Sc",
	"Ti",
	"V",
	"Cr",
	"Mn",
	"Fe",
	"Co",
	"Ni",
	"Cu",
	"Zn",
	"Ga",
	"Ge",
	"As",
	"Se",
	"Br",
	"Kr",
	"Rb",
	"Sr",
	"Zr",
	"Pd",
	"Ag",
	"Sn",
	"I",
	"Xe",
	"Cs",
	"Ba",
	"W",
	"Pt",
	"Au",
	"Hg",
	"Pb",
	"Bi",
	"Po",
	"Rn",
	"Fr",
	"Ra",
	"La",
	"Nd",
	"Ac",
	"Th",
	"U",
	"Pu",
	"Am",
	"Cm",
	"Cf",
	"Es",
]
let elementSetAll = elements.forEach((e) => e.symbol)
