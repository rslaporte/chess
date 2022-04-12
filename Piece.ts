//const movement = require('./Pieces/movement')
import { JSCoordinates, chessCoordinates, isOnBoard } from './Utilities';
import { Vector } from './Vector'
import { Board } from './board/Board'

export abstract class Piece {
    haveMoved: boolean = false
    position: string;
    color: string;
    type: string;
    directions: Array<Vector>;
    isUnitary: boolean;


    constructor(position: string, color: string) {
        this.position = position
        this.color = color
    }

    moves(board: Board): Array<string> {
        const positionVector = new Vector(
            JSCoordinates(this.position).column, 
            JSCoordinates(this.position).row
        )

        let positions = []

        let range = [1, 7]
        if(this.isUnitary) range = [1, 1]

        this.directions.forEach(direction => {
            for(let i = range[0]; i <= range[1]; i++) {
                const movement = positionVector.sum(direction.scalar(i)) 

                if(isOnBoard(movement) && !positionVector.isEqual(movement)) {
                    const positionStatus = board.positionStatus(movement)
                    const coordinates = chessCoordinates(movement)
                    
                    if(this.color != positionStatus?.color) positions.push(coordinates)
                    if(positionStatus != '0') break
                }               
            }
        })
        
        console.log(positions)
            
        return positions
    }

    setPosition(position: string) {
        this.position = position
    }
}