import { elementSetFirst10, elementSetFirst18, elementSetFirst36, elementSetFirst54, elementSetCommonElements } from "@/src/lib/elements";
import { gameStore } from '@/src/lib/gameStore.svelte'
import { tournamentStore } from '@/src/lib/tournamentStore.svelte'
import { elements } from '@/src/lib/elements'
import { correctSounds } from '@/src/components/periodicTable';

export const setElementSet = () => {
	switch (gameStore.set) {
		case "FIRST_10":
			gameStore.selectedElementSet = elementSetFirst10;
			break;
		case "FIRST_18":
			gameStore.selectedElementSet = elementSetFirst18;
			break;
		case "FIRST_36":
			gameStore.selectedElementSet = elementSetFirst36;
			break;
		case "FIRST_54":
			gameStore.selectedElementSet = elementSetFirst54;
			break;
		case "COMMON":
			gameStore.selectedElementSet = elementSetCommonElements;
			break;
		case "ALL":
			gameStore.selectedElementSet = elements.map((e) => e.symbol);
			break;
		default:
			gameStore.selectedElementSet = elementSetFirst18;
	}
};

export const handleElementClick = (elem: PeriodicElement) => {
	if (!gameStore.timerIsRunning && !gameStore.paused) return;

	if (!gameStore.locationMode) {
		if (elem.name === gameStore.currentElementName) {
			playCorrect(0);
			advanceGame();
		}
	} else {
		if (elem.location === gameStore.currentElementLocation) {
			playCorrect(0);
			advanceGame();
		}
	}
};

export const advanceGame = () => {
	const newElement =
		gameStore.elementList.length !== 0
			? gameStore.elementList[
			Math.floor(Math.random() * gameStore.elementList.length)
			]
			: { name: "Done", location: "LEFT" as ElementLocation };

	gameStore.currentElementName = newElement.name;
	gameStore.currentElementLocation =
		(newElement as any).location || "LEFT";
	gameStore.elementList = gameStore.elementList.filter(
		(el) => el.name !== gameStore.currentElementName,
	);

	if (gameStore.elementList.length === 0) {
		stopTimer();
	}
};

export const toggleTimer = () => {
	const now = Date.now();
	const timeElapsed = Math.round((now - gameStore.startTime) / 1000);

	if (gameStore.timerIsRunning && gameStore.elementList.length > 0) {
		gameStore.paused = true;
		gameStore.timerIsRunning = false;
		// TODO
		// if (timerInterval) clearInterval(timerInterval);
		// TODO
	} else if (gameStore.paused) {
		gameStore.paused = false;
		gameStore.timerIsRunning = true;
		gameStore.startTime = Date.now() - timeElapsed * 1000;
		startTimerInterval();
	} else {
		gameStore.previousTime = gameStore.time;
		startRound();
		gameStore.timerIsRunning = true;
		startTimerInterval();
	}
};

export const startTimerInterval = () => {
	// TODO
	// if (timerInterval) clearInterval(timerInterval);
	// timerInterval = window.setInterval(() => {
	// 	const timeElapsed = Math.round(
	// 		(Date.now() - gameStore.startTime) / 1000,
	// 	);
	// 	gameStore.time = timeElapsed;
	// 	if (timeElapsed >= 60 || gameStore.elementList.length === 0) {
	// 		stopTimer();
	// 	}
	// }, 100);
};

export const stopTimer = () => {
	gameStore.timerIsRunning = false;
	gameStore.paused = false;
	// TODO
	// if (timerInterval) clearInterval(timerInterval);
	const finalTime = Math.round((Date.now() - gameStore.startTime) / 1000);
	gameStore.time = finalTime > 60 ? 60 : finalTime;
	gameStore.currentElementName = "Done! Press Timer To Start";
};

export const startRound = () => {
	setElementSet();
	const pool = elements.filter((e) =>
		gameStore.selectedElementSet.includes(e.symbol),
	);
	gameStore.elementList = [...pool]
		.sort(() => Math.random() - 0.5)
		.slice(0, 6);
	const newElement =
		gameStore.elementList[
		Math.floor(Math.random() * gameStore.elementList.length)
		];
	gameStore.currentElementName = newElement.name;
	gameStore.currentElementLocation = newElement.location;
	gameStore.elementList = gameStore.elementList.filter(
		(el) => el.name !== gameStore.currentElementName,
	);
	gameStore.startTime = Date.now();
};

export const playCorrect = (id: 0 | 1 | 2 | 3 | 4) => {
	correctSounds[id].play();
};

export const generateBracketStructure = () => {
	const participants = tournamentStore.tournamentData.participants;
	tournamentStore.tournamentData.contestant = participants.map(
		(name, idx) => ({
			id: idx + 1,
			name: name,
			tournament_id: 0,
		}),
	);
};

export const saveTournamentToStorage = () => {
	localStorage.setItem(
		"periodic_table_tournament",
		JSON.stringify(tournamentStore.tournamentData),
	);
};

export const loadTournamentFromStorage = () => {
	const saved = localStorage.getItem("periodic_table_tournament");
	if (saved) {
		try {
			tournamentStore.tournamentData = JSON.parse(saved);
		} catch (e) {
			generateBracketStructure();
		}
	} else {
		generateBracketStructure();
	}
};

export const getCellBackground = (elem: PeriodicElement): string => {
	const inSet = gameStore.selectedElementSet.includes(elem.symbol);
	if (!inSet) return "#3c484b";
	if (!gameStore.locationMode) return elem.color;
	if (elem.location === "LEFT") return "red";
	if (elem.location === "MIDDLE") return "green";
	if (elem.location === "RARE_EARTH") return "purple";
	return "cyan";
};
