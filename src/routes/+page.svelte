<script lang="ts">
    import { onMount } from "svelte";
    import { tournamentStore } from "@/src/lib/tournamentStore.svelte";
    import { gameStore } from "@/src/lib/gameStore.svelte";

    import {
        elements,
        elementSetFirst10,
        elementSetFirst18,
        elementSetFirst36,
        elementSetFirst54,
        elementSetCommonElements,
    } from "../lib/elements";

    let selectedDropdownVal = $state("First 18 Elements");
    let isManageOpen = $state(false);
    let isBracketOpen = $state(false);
    let timerInterval: number | null = null;
    let participantsInputText = $state("");

    onMount(() => {
        setElementSet();
        loadTournamentFromStorage();
    });

    const setElementSet = () => {
        switch (selectedDropdownVal) {
            case "First 10 Elements":
                gameStore.selectedElementSet = elementSetFirst10;
                break;
            case "First 18 Elements":
                gameStore.selectedElementSet = elementSetFirst18;
                break;
            case "First 36 Elements":
                gameStore.selectedElementSet = elementSetFirst36;
                break;
            case "First 54 Elements":
                gameStore.selectedElementSet = elementSetFirst54;
                break;
            case "Common Elements":
                gameStore.selectedElementSet = elementSetCommonElements;
                break;
            case "All Elements":
                gameStore.selectedElementSet = elements.map((e) => e.symbol);
                break;
            default:
                gameStore.selectedElementSet = elementSetFirst18;
        }
    };

    const handleElementClick = (elem: PeriodicElement) => {
        if (!gameStore.timerIsRunning && !gameStore.paused) return;

        if (!gameStore.locationMode) {
            if (elem.name === gameStore.currentElementName) {
                playCorrect();
                advanceGame();
            }
        } else {
            if (elem.location === gameStore.currentElementLocation) {
                playCorrect();
                advanceGame();
            }
        }
    };

    const advanceGame = () => {
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

    const toggleTimer = () => {
        const now = Date.now();
        const timeElapsed = Math.round((now - gameStore.startTime) / 1000);

        if (gameStore.timerIsRunning && gameStore.elementList.length > 0) {
            gameStore.paused = true;
            gameStore.timerIsRunning = false;
            if (timerInterval) clearInterval(timerInterval);
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

    const startTimerInterval = () => {
        if (timerInterval) clearInterval(timerInterval);
        timerInterval = window.setInterval(() => {
            const timeElapsed = Math.round(
                (Date.now() - gameStore.startTime) / 1000,
            );
            gameStore.time = timeElapsed;
            if (timeElapsed >= 60 || gameStore.elementList.length === 0) {
                stopTimer();
            }
        }, 100);
    };

    const stopTimer = () => {
        gameStore.timerIsRunning = false;
        gameStore.paused = false;
        if (timerInterval) clearInterval(timerInterval);
        const finalTime = Math.round((Date.now() - gameStore.startTime) / 1000);
        gameStore.time = finalTime > 60 ? 60 : finalTime;
        gameStore.currentElementName = "Done! Press Timer To Start";
    };

    const startRound = () => {
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

    const playCorrect = () => {
        try {
            const ctx = new (window.AudioContext ||
                (window as any).webkitAudioContext)();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.frequency.setValueAtTime(587.33, ctx.currentTime);
            gain.gain.setValueAtTime(0.1, ctx.currentTime);
            osc.start();
            osc.stop(ctx.currentTime + 0.15);
        } catch (e) {}
    };

    const generateBracketStructure = () => {
        const participants = tournamentStore.tournamentData.participants;
        tournamentStore.tournamentData.contestant = participants.map(
            (name, idx) => ({
                id: idx + 1,
                name: name,
                tournament_id: 0,
            }),
        );
    };

    const saveTournamentToStorage = () => {
        localStorage.setItem(
            "periodic_table_tournament",
            JSON.stringify(tournamentStore.tournamentData),
        );
    };

    const loadTournamentFromStorage = () => {
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

    const getCellBackground = (elem: PeriodicElement): string => {
        const inSet = gameStore.selectedElementSet.includes(elem.symbol);
        if (!inSet) return "#3c484b";
        if (!gameStore.locationMode) return elem.color;
        if (elem.location === "LEFT") return "red";
        if (elem.location === "MIDDLE") return "green";
        if (elem.location === "RARE_EARTH") return "purple";
        return "cyan";
    };
</script>

<header class="game-header">
    <div class="target-box">{gameStore.currentElementName}</div>

    <div class="timer-area">
        <span class="prev-time">{gameStore.previousTime} seconds</span>
        <div class="timer-main-row">
            <button class="timer-btn" onclick={toggleTimer}>
                {gameStore.timerIsRunning
                    ? Math.round((Date.now() - gameStore.startTime) / 1000)
                    : gameStore.paused
                      ? "Resume"
                      : "Start"}
            </button>
            {#if gameStore.timerIsRunning || gameStore.paused}
                <span class="seconds-label">seconds</span>
            {/if}
        </div>
    </div>

    <div class="dropdown-area">
        <select
            bind:value={selectedDropdownVal}
            onchange={setElementSet}
            disabled={gameStore.timerIsRunning || gameStore.paused}
        >
            <option value="First 10 Elements">First 10 Elements</option>
            <option value="First 18 Elements">First 18 Elements</option>
            <option value="First 36 Elements">First 36 Elements</option>
            <option value="First 54 Elements">First 54 Elements</option>
            <option value="Common Elements">Most Common Elements</option>
            <option value="All Elements">All Elements</option>
        </select>
    </div>

    <div class="top-controls-bar">
        <div class="control-group">
            <div class="slider-checkbox">
                <input
                    type="checkbox"
                    id="location-check"
                    bind:checked={gameStore.locationMode}
                />
                <label for="location-check"><span></span></label>
            </div>
            <span class="control-label">Location Mode</span>
        </div>

        <div class="control-group">
            <div class="slider-checkbox">
                <input
                    type="checkbox"
                    id="tourney-check"
                    bind:checked={tournamentStore.tournamentMode}
                />
                <label for="tourney-check"><span></span></label>
            </div>
            <span class="control-label">Tournament Mode</span>
        </div>
    </div>
</header>

<main class="periodic-table-grid">
    {#each elements as elem (elem.symbol)}
        <div
            class="element-cell"
            style="grid-row: {elem.period}; grid-column: {elem.group}; background: {getCellBackground(
                elem,
            )}; color: {gameStore.selectedElementSet.includes(elem.symbol)
                ? '#000'
                : '#888'};"
            onclick={() => handleElementClick(elem)}
        >
            <span class="element-number">{elem.atomicNumber}</span>
            <span class="element-symbol">{elem.symbol}</span>
        </div>
    {/each}
</main>

{#if tournamentStore.tournamentMode}
    <div class="tournament-buttons-bar">
        <button class="tourney-btn" onclick={() => (isManageOpen = true)}
            >Manage</button
        >
        <button
            class="tourney-btn view-btn"
            onclick={() => (isBracketOpen = true)}>View Bracket</button
        >
    </div>
{/if}

{#if isManageOpen}
    <div class="tournament-overlay">
        <div class="tournament-content manage-content">
            <div class="tournament-header">
                <h2>Manage Tournament</h2>
                <button
                    class="tourney-btn"
                    onclick={() => (isManageOpen = false)}>Close</button
                >
            </div>
            <div class="tournament-controls">
                <h3>Participants Management</h3>
                <textarea
                    bind:value={participantsInputText}
                    placeholder="Enter participants..."
                ></textarea>
                <div class="tourney-btn-group">
                    <button
                        class="tourney-btn"
                        onclick={() => {
                            tournamentStore.tournamentData.participants =
                                participantsInputText
                                    .split(/[\n,]+/)
                                    .map((s) => s.trim())
                                    .filter(Boolean);
                            generateBracketStructure();
                            saveTournamentToStorage();
                        }}>Set Participants</button
                    >
                    <button
                        class="tourney-btn danger-btn"
                        onclick={() => {
                            localStorage.removeItem(
                                "periodic_table_tournament",
                            );
                            loadTournamentFromStorage();
                        }}>Clear LocalStorage</button
                    >
                </div>
            </div>
        </div>
    </div>
{/if}

{#if isBracketOpen}
    <div class="tournament-overlay">
        <div class="tournament-content fullscreen-content">
            <div class="tournament-header">
                <h2>Tournament Bracket</h2>
                <button
                    class="tourney-btn"
                    onclick={() => (isBracketOpen = false)}>Close Viewer</button
                >
            </div>
            <div class="bracket-container-wrapper">
                <div id="brackets-viewer" class="brackets-viewer"></div>
            </div>
        </div>
    </div>
{/if}

<style>
    html,
    body {
        height: 100%;
        margin: 0;
        background: #404040;
        font-family: sans-serif;
        color: white;
        overflow-x: hidden;
    }
    .game-header {
        display: flex;
        align-items: center;
        padding: 15px 30px;
        gap: 30px;
        background: #2c2c2c;
        border-bottom: 2px solid #555;
        flex-wrap: wrap;
    }
    .target-box {
        background: #fff;
        color: #000;
        border: 3px solid #000;
        border-radius: 10px;
        padding: 12px 25px;
        font-size: 22px;
        font-weight: bold;
        min-width: 250px;
        text-align: center;
    }
    .timer-area {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
    }
    .prev-time {
        font-size: 14px;
        color: #aaa;
    }
    .timer-main-row {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    .timer-btn {
        background: blue;
        color: white;
        border: none;
        padding: 12px 24px;
        font-size: 18px;
        font-weight: bold;
        border-radius: 8px;
        cursor: pointer;
    }
    .dropdown-area select {
        padding: 8px 12px;
        font-size: 16px;
        border-radius: 6px;
        background: #333;
        color: white;
        border: 1px solid #555;
    }
    .top-controls-bar {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-left: auto;
    }
    .control-group {
        display: flex;
        align-items: center;
        gap: 12px;
    }
    .periodic-table-grid {
        display: grid;
        grid-template-columns: repeat(18, minmax(45px, 1fr));
        grid-template-rows: repeat(10, minmax(65px, 1fr));
        gap: 6px;
        padding: 20px;
        max-width: 1400px;
        margin: 0 auto;
    }
    .element-cell {
        border-radius: 6px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        cursor: pointer;
        border: 2px solid rgba(0, 0, 0, 0.3);
        user-select: none;
    }
    .element-cell:hover {
        transform: scale(1.05);
        filter: brightness(1.1);
    }
    .tournament-buttons-bar {
        position: fixed;
        bottom: 20px;
        left: 20px;
        display: flex;
        gap: 10px;
        z-index: 10;
    }
    .tournament-overlay {
        position: fixed-safe;
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.9);
        z-index: 1000;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .tournament-content {
        background: #2a2a2a;
        display: flex;
        flex-direction: column;
        padding: 20px;
        border-radius: 8px;
    }
    .manage-content {
        width: 600px;
        max-width: 90vw;
    }
    .fullscreen-content {
        width: 100vw;
        height: 100vh;
        border-radius: 0;
    }
    .tournament-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #444;
        padding-bottom: 10px;
    }
    .tourney-btn {
        background: #4a90e2;
        color: white;
        border: none;
        padding: 8px 14px;
        border-radius: 4px;
        cursor: pointer;
        font-weight: bold;
    }
    .view-btn {
        background: #27ae60;
    }
    .danger-btn {
        background: #d9534f;
    }
</style>
