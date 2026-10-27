import { setElementSet, loadTournamentFromStorage } from '@/functions/periodicTableFunctions';
import { Howl } from 'howler'
import { onMount } from "svelte";
import correctSound0 from '@/assets/correct_0.wav';
import correctSound1 from '@/assets/correct_1.wav';
import correctSound2 from '@/assets/correct_2.wav';
import correctSound3 from '@/assets/correct_3.wav';
import correctSound4 from '@/assets/correct_4.wav';

const soundCorrect0 = new Howl({
    src: [correctSound0],
});
const soundCorrect1 = new Howl({
    src: [correctSound1],
});
const soundCorrect2 = new Howl({
    src: [correctSound2],
});
const soundCorrect3 = new Howl({
    src: [correctSound3],
});
const soundCorrect4 = new Howl({
    src: [correctSound4],
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


