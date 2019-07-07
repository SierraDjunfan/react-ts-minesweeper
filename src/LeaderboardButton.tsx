import React from 'react'
import { LeaderboardButtonProps } from './Interfaces'
import './LeaderboardButton.scss'

export const LeaderboardButton = (props: LeaderboardButtonProps) =>
    <button id="leaderboard-button" onClick={props.manageClick}></button>