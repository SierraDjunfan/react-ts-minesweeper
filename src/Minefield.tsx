import React from 'react'
import { MinefieldProps, MinefieldSquareType } from './Interfaces'
import { MinefieldSquare } from './MinefieldSquare'
import './Minefield.scss'

export const Minefield = (props: MinefieldProps) => {

    const numberedSquareStyle = (number: number) =>
        number >= 4 ? "square-numbered-four"
            : number === 3 ? "square-numbered-three"
                : number === 2 ? "square-numbered-two"
                    : "square-numbered-one"

    const squareStyle = (square: MinefieldSquareType) => 
        square.isFlagged ? "square-flagged"
            : !square.isDiscovered ? "square-undiscovered"
                : square.isDiscovered && square.isAMine ? "square-mine"
                    : square.isDiscovered && square.numberOfNeighbouringMines === 0 ? "square-discovered"
                        : numberedSquareStyle(square.numberOfNeighbouringMines)

    const content = (square: MinefieldSquareType) =>
        square.isFlagged ? null
            : square.isAMine ? null
                : square.isDiscovered && square.numberOfNeighbouringMines > 0 ? square.numberOfNeighbouringMines
                    : null

    return (
        <div id="minefield">
            {props.minefield.map((square, i) =>
                <MinefieldSquare
                    key={i}
                    style={squareStyle(square)}
                    id={props.canClickSquares && !square.isDiscovered && !square.isFlagged ? "undiscovered-minefield-square" : "minefield-square"}
                    manageSquareLeftClick={props.manageSquareLeftClick}
                    manageSquareRightClick={props.manageSquareRightClick}
                    manageSquareMouseUp={props.manageSquareMouseUp}
                    square={square}
                    content={content(square)}
                    canClick={props.canClickSquares}
                ></MinefieldSquare>)}
        </div>
    )
}