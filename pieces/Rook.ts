import { Piece } from '../Piece'
import { Vector } from '../Vector'

export class Rook extends Piece {
    
    type = 'R'
    isUnitary = false
    directions = [
        new Vector(1,0),
        new Vector(-1,0),
        new Vector(0,1),
        new Vector(0,-1)
    ]
    
    constructor(position: string, color: string) {
        super(position, color)
    }
}