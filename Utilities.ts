import { Vector } from './Vector'

export function JSCoordinates(position: string) : Vector{
    
    if(position.length != 2) return undefined

    const chessColumn = position[0]
    const chessRow = position[1]
    
    const column =  ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].indexOf(chessColumn)
    const row = parseInt(chessRow) - 1

    return new Vector(column, row)
}

export function chessCoordinates(position : Vector) : string {
    const {column, row} = position

    const chessColumn = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'][column]
    const chessRow = row + 1

    return chessColumn + chessRow
}

export function isOnBoard(vector : Vector) : boolean {
    if(vector.row > 7 || vector.row < 0 || vector.column > 7 || vector.column < 0) return false
    return true
}