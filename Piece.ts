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
        const positionVector = JSCoordinates(this.position)

        let positions = []

        let range = [1, 7]
        if(this.isUnitary) range = [1, 1]

        this.directions.forEach(direction => {
            for(let i = range[0]; i <= range[1]; i++) {
                const movement = positionVector.sum(direction.scalar(i)) 

                if(isOnBoard(movement) && !positionVector.isEqual(movement)) {
                    const positionStatus = board.positionStatus(movement)
                    const coordinates = chessCoordinates(movement)

                    //Allowed spaces: every free position in movement direct until the end of board or the first space occupied by a bpiece from a different color
                    if(this.color != positionStatus?.color) positions.push(coordinates)

                    //End of the movement (after a piece from different color or end of board)
                    if(positionStatus != '0') break               
                }
            }
        })

        //If it's a pawn, it can threat diagonal pieces
        if(this.type == 'P') {

            if(this.color == 'W') {
                //A pawn can't go through another pieces
                const positionStatus = board.positionStatus(positionVector.sum(new Vector(0,1)))
                if(positionStatus != '0') positions = [] 

                //Pawn can take in diagonals

                //Right diagonal infos
                const rightDiagonalMovement = positionVector.sum(new Vector(1,1))
                const rightDiagonalSpace = board.positionStatus(rightDiagonalMovement) 

                //Left diagonal infos
                const leftDiagonalMovement = positionVector.sum(new Vector(-1, 1))
                const leftDiagonalSpace = board.positionStatus(leftDiagonalMovement)

                //If there's an opponent's piece on first diagonal square, add this movement to the list
                if(rightDiagonalSpace != '0' && rightDiagonalSpace?.color == 'B') positions.push(chessCoordinates(rightDiagonalMovement))
                if(leftDiagonalSpace != '0' && leftDiagonalSpace?.color == 'B') positions.push(chessCoordinates(leftDiagonalMovement))
            }

            else {
                //A pawn can't go through another pieces
                const positionStatus = board.positionStatus(positionVector.sum(new Vector(0,-1)))
                if(positionStatus != '0') positions = [] 

                //Pawn can take in diagonals

                //Right diagonal infos
                const rightDiagonalMovement = positionVector.sum(new Vector(1,-1))
                const rightDiagonalSpace = board.positionStatus(rightDiagonalMovement) 

                //Left diagonal infos
                const leftDiagonalMovement = positionVector.sum(new Vector(-1, -1))
                const leftDiagonalSpace = board.positionStatus(leftDiagonalMovement)

                //If there's an opponent's piece on first diagonal square, add this movement to the list
                if(rightDiagonalSpace != '0' && rightDiagonalSpace?.color == 'W') positions.push(chessCoordinates(rightDiagonalMovement))
                if(leftDiagonalSpace != '0' && leftDiagonalSpace?.color == 'W') positions.push(chessCoordinates(leftDiagonalMovement))
            }
        }
         
        console.log(positions)
        return positions
    }

    setPosition(position: string) {
        this.position = position
    }
}