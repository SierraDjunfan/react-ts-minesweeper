import React from 'react'
import './Leaderboard.scss'
import { LeaderboardProps } from './Interfaces';
import { formattedDate, formattedScore } from './Utilities/formattedDateScore';

export const Leaderboard = (props: LeaderboardProps) => {

    const orderedScoresByAscending = props.scores.sort((a, b) => a.score - b.score)
    const justFirstFive = orderedScoresByAscending.slice(0, 4)

    return (
        <div id="modal" onClick={props.modalWasClicked}>
            <div id="leaderboard">
                <h1>LEADERBOARD</h1>
                
                {!props.scores.length &&
                    <div>No scores yet</div>}
                <ol>
                    {justFirstFive.map((entry, i) =>
                        <li className="leaderboard-item">
                            <div className="entryName">
                                <div>{i + 1}</div>
                                <div>{formattedDate(entry.date)}</div>
                            </div>
                            <div>{formattedScore(entry.score)}</div>
                        </li>
                    )}
                </ol>

                {!!props.scores.length &&
                    <button onClick={() => props.removeScoresButtonClicked()}>CLEAR SCORES</button>}

            </div>
        </div>
    )
}