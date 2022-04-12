import { Piece } from '../Piece'
import { Vector } from '../Vector'

export class Night extends Piece {

    type = 'N'
    isUnitary = true
    directions = [
        new Vector(1,2),
        new Vector(-1,2),
        new Vector(2,1),
        new Vector(-2,1),
        new Vector(2,-1),
        new Vector(-2,-1),
        new Vector(1,-2),
        new Vector(-1,-2)
    ]
    
    constructor(position: string, color: string) {
        super(position, color)
    }
}