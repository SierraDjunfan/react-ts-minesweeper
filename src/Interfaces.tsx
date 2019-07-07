
export interface MinefieldArrayArguments {
    gridlength: number,
    numberOfMines: number
}

export interface MinefieldSquareType {
    isAMine: boolean,
    isFlagged: boolean,
    isDiscovered: boolean,
    numberOfNeighbouringMines: number
}

export interface AppStateType {
    time: number
    leaderboardShouldShow: boolean
    gridLength: number
    numberOfMines: number
    minefield: Array<MinefieldSquareType>
    mineSquares: Array<MinefieldSquareType>
    scores: Array<{ date: Date, score: number }>
}

export interface HeaderProps {
    mineCount: number
    time: number
    timerShouldTick: boolean
    tick: () => void
    resetButtonStyle: string
    resetButtonClicked: () => void
    leaderboardButtonClicked: () => void
}

export interface MineCountProps {
    mineCount: number
}

export interface TimerProps {
    time: number
    shouldTick: boolean
    tick: () => void
}

export interface ResetButtonProps {
    style: string
    // mouseIsDown: boolean // TODO: Suzzie.
    manageClick: () => void
}

export interface LeaderboardButtonProps {
    manageClick: () => void
}

export interface LeaderboardProps {
    modalWasClicked: () => void
    scores: Array<{ date: Date, score: number }>
    removeScoresButtonClicked: () => void
}

export interface MinefieldProps {
    minefield: Array<MinefieldSquareType>,
    gridlength: number
    manageSquareLeftClick: () => void
    manageSquareRightClick: (square: MinefieldSquareType) => void
    manageSquareMouseUp: (square: MinefieldSquareType) => void
    canClickSquares: boolean
}

export interface MinefieldSquareProps {
    manageSquareLeftClick: () => void
    manageSquareRightClick: (square: MinefieldSquareType) => void
    manageSquareMouseUp: (square: MinefieldSquareType) => void
    square: MinefieldSquareType
    style: string
    content: number | null
    canClick: boolean
    id: string
}

