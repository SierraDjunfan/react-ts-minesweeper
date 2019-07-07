import React from 'react'
import { MinefieldSquareProps } from './Interfaces'
import './MinefieldSquare.scss'

export const MinefieldSquare = (props: MinefieldSquareProps) =>
    <button
        id={props.id}
        className={props.style}
        onMouseDown={e => props.canClick && e.button === 0 ? props.manageSquareLeftClick() : e.button === 2 ? props.manageSquareRightClick(props.square) : null}
        onMouseUp={e => props.canClick && e.button === 0 ? props.manageSquareMouseUp(props.square) : null}>
        {props.content}
    </button>