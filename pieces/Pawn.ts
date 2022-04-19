import { Piece } from '../Piece'
import { Vector } from '../Vector'

export class Pawn extends Piece {

    type = 'P'
    isUnitary = true
    directions = [
        new Vector(0,1),
        new Vector(0,2)
    ] 
    
    constructor(position: string, color: string) {
        super(position, color)

        //If it's a black pawn, inverts the direction of movement
        if(color == 'B') {
            for(let i = 0; i < this.directions.length; i++) {
                this.directions[i] = this.directions[i].scalar(-1)
            }
        }
    }
}