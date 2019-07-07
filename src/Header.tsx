import React from 'react'
import { HeaderProps } from "./Interfaces"
import { MineCount } from './MineCount'
import { Timer } from "./Timer"
import { ResetButton } from "./ResetButton"
import { LeaderboardButton } from "./LeaderboardButton"
import './Header.scss'

export const Header = (props: HeaderProps) =>
    <header>
        <div id="header-content">
            <div>
                <MineCount mineCount={props.mineCount} />
            </div>
            <div>
                <Timer time={props.time} shouldTick={props.timerShouldTick} tick={props.tick} />
            </div>
            <ResetButton style={props.resetButtonStyle} manageClick={props.resetButtonClicked} />
            <LeaderboardButton manageClick={props.leaderboardButtonClicked} />
        </div>
    </header>