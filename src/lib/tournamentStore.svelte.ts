// Tournament Store
export const tournamentStore = $state({
    tournamentMode: false,
    currentActiveMatchId: null as number | null,
    tournamentData: {
        participants: ["Hydrogen", "Helium", "Lithium", "Beryllium", "Boron", "Carbon", "Nitrogen", "Oxygen"],
        stage: [{ id: 0, tournament_id: 0, name: "Periodic Table Championship", type: "single_elimination", settings: {} }],
        group: [{ id: 0, stage_id: 0, number: 1 }],
        round: [] as any[],
        match: [] as any[],
        contestant: [] as any[]
    }
});
