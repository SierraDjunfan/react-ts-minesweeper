import './App.scss';
import React, { useState } from 'react'
import { Header } from "./Header";
import { Minefield } from "./Minefield";
import { Leaderboard } from "./Leaderboard";
import { generateMinefieldArray } from "./Utilities/generateMinefieldArray";
import { neighboursOf } from "./Utilities/neighboursOf";
import { MinefieldSquareType } from './Interfaces';
import { initialAppState } from './Utilities/initialAppState';

export const App = () => {

    const [state, setState] = useState(initialAppState)

    function resetGame() {
        const newMineField = generateMinefieldArray({ gridlength: state.gridLength, numberOfMines: state.numberOfMines })
        setState(state => ({
            ...state,
            time: 0,
            minefield: newMineField.minefield,
            mineSquares: newMineField.mineSquares
        }))
    }

    function squareMouseUp(square: MinefieldSquareType) {
        if (!square.isFlagged) {
            if (square.isAMine) {
                discoverSquares(state.mineSquares)
            } else if (square.numberOfNeighbouringMines > 0) {
                discoverSquares([square])
            } else {
                const squaresToDiscover = searchSquares([square], [])
                discoverSquares(squaresToDiscover)
            }
        }
    }

    function squareWasRightClicked(square: MinefieldSquareType) {
        const newFlagState = !square.isFlagged
        const newMineField = state.minefield.map(s => s === square ? { ...s, isFlagged: newFlagState } : s)
        if (!square.isDiscovered) setState(state => ({ ...state, minefield: newMineField }))
    }

    function squareWasLeftClicked() {
        setState(state => ({...state, mouseButtonIsDown: true}))
    }

    function removeHighScores() {
        localStorage.removeItem('minesweeperScores')
        delete window.localStorage['minesweeperScores']
        setState(state => ({ ...state, scores: [] }))
    }

    function searchSquares(toSearch: MinefieldSquareType[], searched: MinefieldSquareType[]): MinefieldSquareType[] {

        if (!toSearch.length) return searched

        const currentSearch = toSearch[0]

        if (searched.includes(currentSearch)) {
            const newToSearch = toSearch.slice(1)
            return searchSquares(newToSearch, searched)
        } else if (currentSearch.numberOfNeighbouringMines > 0) {
            const newToSearch = toSearch.slice(1)
            const newSearched = [...searched, currentSearch]
            return searchSquares(newToSearch, newSearched)
        } else {
            const newSearched = [...searched, currentSearch]
            const removedCurrentSearchFromToSearch = toSearch.slice(1)
            const squareIndex = state.minefield.indexOf(currentSearch)
            const unsearchedNeighbours = neighboursOf(squareIndex, state.gridLength).map(i => state.minefield[i]).filter(s => !searched.includes(s))
            const newToSearch = [...removedCurrentSearchFromToSearch, ...unsearchedNeighbours]
            return searchSquares(newToSearch, newSearched)
        }
    }

    function discoverSquares(squares: MinefieldSquareType[]) {
        const currentDate: Date = new Date()
        const currentTime = state.time
        const newMineField = state.minefield.map(square => (squares.includes(square) ? { ...square, isDiscovered: true } : square))

        if (newMineField.filter(square => !square.isAMine && !square.isDiscovered).length === 0) {
            const newHighScore = { date: currentDate, score: currentTime }
            const newHighScores = [...state.scores, newHighScore]
            localStorage.setItem('minesweeperScores', JSON.stringify(newHighScores))
            setState(state => ({ ...state, minefield: newMineField, scores: newHighScores, leaderboardShouldShow: true, mouseButtonIsDown: false }))
        } else {
            setState(state => ({ ...state, minefield: newMineField, mouseButtonIsDown: false}))
        }
    }

    function tick() {
        const newTime = state.time + 1
        setState(state => ({ ...state, time: newTime }))
    }

    function leaderboardClicked() {
        setState(state => ({ ...state, leaderboardShouldShow: true }))
    }

    function modalWasClicked() {
        setState(state => ({ ...state, leaderboardShouldShow: false }))
    }

    const gameHasBegun = state.minefield.filter(square => square.isDiscovered).length !== 0
    const gameIsWon = state.minefield.filter(square => !square.isAMine && !square.isDiscovered).length === 0
    const gameIsLost = state.minefield.filter(square => square.isAMine && square.isDiscovered).length > 0
    const numberOfFlaggedSquares = state.minefield.filter(square => square.isFlagged).length
    const mineCount = state.numberOfMines - numberOfFlaggedSquares
    const resetButtonStyle = state.mouseButtonIsDown ? "placing" : gameIsWon ? "win" : gameIsLost ? "lost" : "normal"
    const timerShouldTick = gameHasBegun && !gameIsLost && !gameIsWon

    return (
        <div>
            {state.leaderboardShouldShow &&
                <Leaderboard removeScoresButtonClicked={removeHighScores} scores={state.scores} modalWasClicked={modalWasClicked}></Leaderboard>}

            <Header
                mineCount={mineCount}
                time={state.time}
                timerShouldTick={timerShouldTick}
                tick={tick}
                resetButtonClicked={resetGame}
                resetButtonStyle={resetButtonStyle}
                leaderboardButtonClicked={leaderboardClicked} />

            <main>
                <Minefield
                    minefield={state.minefield}
                    gridlength={state.gridLength}
                    manageSquareLeftClick={squareWasLeftClicked}
                    manageSquareRightClick={squareWasRightClicked}
                    manageSquareMouseUp={squareMouseUp}
                    canClickSquares={!gameIsLost && !gameIsWon} />
            </main>
        </div>
    )
}