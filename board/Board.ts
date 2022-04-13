import { JSCoordinates } from '../Utilities'
import { Vector } from '../Vector'
import { Piece } from '../Piece' 
import { initBoard } from './initBoard'
import { Rook } from '../pieces/Rook'
import { King } from '../pieces/King'

export class Board{ 
    board: Array<any>

    constructor() {     
        this.board = initBoard()
    }

    priint() : void {       
        return this.board.forEach(row => console.log(row))
    }

    movePiece(position: string) : Array<string> {
        // const {row, column} = JSCoordinates(position)
        
        // let pieceMovement = this.board[row][column].moves()
        // let validMoves = []

        // pieceMovement.forEach(move => {
        //     let {row, column} = JSCoordinates(move)
        //     if(this.positionStatus(row, column) == '0') validMoves.push(move)
        // })
        
        return
    }

    pieceOnBoard(pieceType: string) : Array<Piece> {
        let pieces = []

        this.board.map(row => {
            row.forEach(piece => {
                if(piece?.type && piece.type == pieceType)  pieces.push(piece) 
            })
        })
        
        return pieces
    }

    positionStatus(position: Vector) : any{
        const {row, column} = position
        return this.board[row][column]
    }

    editBoard(position: string, value) : void{
        const {row, column} = JSCoordinates(position)
        this.board[row][column] = value
        return 
    }

    editPiece(position: string, vector: Vector) {

    }

    removePiece(position: string) : void {
        const {row, column} = JSCoordinates(position)
        this.board[row][column] = '0'
        return
    }

    castle() {
        const Kings = this.pieceOnBoard('K').filter(king => {return !king.haveMoved})
        const Rooks = this.pieceOnBoard('R').filter(rook => {return !rook.haveMoved})          
        
        Kings.map(king => {
            const castleRooks = Rooks.filter(rook => {return rook.color === king.color})
            const kingRow = JSCoordinates(king.position).row
            const kingColumn = JSCoordinates(king.position).column
        
            castleRooks.map(rook => {
                const rookColumn = JSCoordinates(rook.position).column                

                if(rookColumn - kingColumn < 0) {
                    const square1 = this.positionStatus(JSCoordinates(king.position).sum(new Vector(-1, 0))) == '0' ? true : false
                    const square2 = this.positionStatus(JSCoordinates(king.position).sum(new Vector(-2, 0))) == '0' ? true : false
                    const square3 = this.positionStatus(JSCoordinates(king.position).sum(new Vector(-3, 0))) == '0' ? true : false

                    if(square1 && square2 && square3) this.board[kingRow][kingColumn].directions.push(new Vector(-2, 0))
                }

                else {
                    const square1 = this.positionStatus(JSCoordinates(king.position).sum(new Vector(1, 0))) == '0' ? true : false
                    const square2 = this.positionStatus(JSCoordinates(king.position).sum(new Vector(2, 0))) == '0' ? true : false

                    if(square1 && square2) this.board[kingRow][kingColumn].directions.push(new Vector(2, 0))                
                }

                
            })
            console.log(this.board[kingRow][kingColumn])
        })
    }
    
}