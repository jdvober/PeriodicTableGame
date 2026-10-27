// Game Store
export const gameStore = $state({
    startTime: 0,
    time: 0,
    previousTime: 0,
    timerIsRunning: false,
    paused: false,
    elementList: [] as PeriodicElement[],
    currentElementName: 'Press Timer To Start',
    currentElementLocation: 'LEFT' as ElementLocation,
    locationMode: false,
    selectedElementSet: [] as string[]
});
