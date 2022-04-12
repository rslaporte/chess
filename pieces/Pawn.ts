import { Piece } from '../Piece'
import { Vector } from '../Vector'

export class Pawn extends Piece {

    type = 'P'
    isUnitary = true
    directions = [
        new Vector(0,1)
    ] 
    
    constructor(position: string, color: string) {
        super(position, color)
        if(position.match(/2|7/)) this.directions.push(new Vector(0,2))

        if(color == 'B') {
            for(let i = 0; i < this.directions.length; i++) {
                this.directions[i] = this.directions[i].scalar(-1)
            }
        }
    }
}