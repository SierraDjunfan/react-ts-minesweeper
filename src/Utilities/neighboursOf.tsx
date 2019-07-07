export function neighboursOf(index: number, gridLength: number) {

    const lastIndexInGrid = (gridLength * gridLength) - 1
    const indexIsOnTheTopRow = index < gridLength
    const indexIsOnTheLeftmostColumn = index % gridLength === 0
    const indexIsOnTheRightmostColumn = (index % gridLength) === (gridLength - 1)
    const indexIsOnTheBottomRow = (index > (lastIndexInGrid - gridLength)) && (index < (lastIndexInGrid + 1))

    const topLeftDiagonal = () => indexIsOnTheTopRow || indexIsOnTheLeftmostColumn ? [] : [directlyAbove()[0] - 1]
    const directlyAbove = () => indexIsOnTheTopRow ? [] : [index - gridLength]
    const topRightDiagonal = () => indexIsOnTheTopRow || indexIsOnTheRightmostColumn ? [] : [directlyAbove()[0] + 1]
    const directlyRight = () => indexIsOnTheRightmostColumn ? [] : [index + 1]
    const bottomRightDiagonal = () => indexIsOnTheBottomRow || indexIsOnTheRightmostColumn ? [] : [directlyBelow()[0] + 1]
    const directlyBelow = () => indexIsOnTheBottomRow ? [] : [index + gridLength]
    const directlyLeft = () => indexIsOnTheLeftmostColumn ? [] : [index - 1]
    const bottomLeftDiagonal = () => indexIsOnTheBottomRow || indexIsOnTheLeftmostColumn ? [] : [directlyBelow()[0] - 1]


    return [topLeftDiagonal(),
            directlyAbove(),
            topRightDiagonal(),
            directlyRight(),
            bottomRightDiagonal(),
            directlyBelow(),
            directlyLeft(),
            bottomLeftDiagonal()]
               .flatMap(x => x)
}