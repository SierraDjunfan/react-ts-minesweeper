import { generateMinefieldArray } from "./generateMinefieldArray";

export const initialMinefield = generateMinefieldArray({ gridlength: 10, numberOfMines: 12 })

export const initialAppState = {
    time: 0,
    leaderboardShouldShow: false,
    gridLength: 10,
    numberOfMines: 12,
    minefield: initialMinefield.minefield,
    mineSquares: initialMinefield.mineSquares,
    scores: getStoredHighScores(),
    mouseButtonIsDown: false
}

export function getStoredHighScores() {
    if (JSON.parse(localStorage.getItem('minesweeperScores')!) === null) {
        return []
    } else {
        const stored = JSON.parse(localStorage.getItem('minesweeperScores')!) as Array<{date: string, score: number}>
        const asDates = stored.map(entry => ({date: new Date(entry.date), score: entry.score}))
        return asDates
    }
}