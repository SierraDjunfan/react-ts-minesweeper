import { TimerProps } from "./Interfaces";
import React from 'react';
import { useInterval } from "./Utilities/useInterval";
import { secondsToTimerFormat } from "./Utilities/secondsToTimerFormat";
import './Timer.scss'

export const Timer = (props: TimerProps) => {

    useInterval(props.tick, props.shouldTick ? 1000 : null)

    return <div id="timer">{secondsToTimerFormat(props.time)}</div>
}
