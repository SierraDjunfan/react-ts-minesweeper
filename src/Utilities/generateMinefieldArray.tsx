import { fillFromZeroToN } from "./fillFromZeroToN";
import { shuffle } from "./shuffle";
import { neighboursOf } from "./neighboursOf";
import { MinefieldArrayArguments } from "../Interfaces";

export function generateMinefieldArray(args: MinefieldArrayArguments) {
    const indexes = fillFromZeroToN((args.gridlength * args.gridlength) - 1)
    const mineIndexes = shuffle(indexes).slice(0, args.numberOfMines)
    const minefield = indexes.map(i => ({
        isAMine: mineIndexes.includes(i),
        isFlagged: false,
        isDiscovered: false,
        numberOfNeighbouringMines: neighboursOf(i, args.gridlength).filter(x => mineIndexes.includes(x)).length
    }))
    const mineSquares = mineIndexes.map(i => minefield[i])
    return {minefield: minefield, mineSquares: mineSquares, numberOfMines: args.numberOfMines, gridlength: args.gridlength}
}
