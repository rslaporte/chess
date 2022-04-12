import { Piece } from '../Piece'
import { Vector } from '../Vector'

export class Bishop extends Piece {

    type = 'B'
    isUnitary = false
    directions = [
        new Vector(1,1),
        new Vector(-1,1),
        new Vector(1,-1),
        new Vector(-1,-1)
    ]
    
    constructor(position: string, color: string) {
        super(position, color)
    }
}