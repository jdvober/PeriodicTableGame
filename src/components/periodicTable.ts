import { setElementSet, loadTournamentFromStorage } from '@/src/functions/periodicTableFunctions';
import { Howl } from 'howler'
import { onMount } from "svelte";

const soundCorrect0 = new Howl({
    src: ["@/static/correct0.wav"],
});
const soundCorrect1 = new Howl({
    src: ["@/static/correct1.wav"],
});
const soundCorrect2 = new Howl({
    src: ["@/static/correct2.wav"],
});
const soundCorrect3 = new Howl({
    src: ["@/static/correct3.wav"],
});
const soundCorrect4 = new Howl({
    src: ["@/static/correct4.wav"],
});

export const correctSounds = [
    soundCorrect0,
    soundCorrect1,
    soundCorrect2,
    soundCorrect3,
    soundCorrect4,
];

onMount(() => {
    setElementSet();
    loadTournamentFromStorage();
});


