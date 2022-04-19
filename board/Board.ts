import { chessCoordinates, JSCoordinates } from '../Utilities'
import { Vector } from '../Vector'
import { Piece } from '../Piece' 
import { initBoard } from './initBoard'
import { Rook } from '../pieces/Rook'
import { King } from '../pieces/King'

export class Board{ 
    board: Array<any>

    constructor() {     
        this.board = initBoard()
    };

    show(from: number = -1, to: number = -1) : void {
        if(from != -1 && to != -1) {
            for(let i = to; i >= from; i--) {
                let line = []
    
                this.board[i].forEach(piece => {
                    if(piece?.type) line.push(piece.type)
                    else line.push(piece)
                })            
    
                console.log(...line)
            }

            return
        }

        if(from != -1) {
            let line = []
            
            this.board[from].forEach(piece => {
                if(piece?.type) line.push(piece.type)
                else line.push(piece)                
            })

            console.log(...line)
            return
        }
        

        for(let i = 7; i >= 0; i--) {
            let line = []

            this.board[i].forEach(piece => {
                if(piece?.type) line.push(piece.type)
                else line.push(piece)
            })            

            console.log(...line)
        }

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

    insertPiece(position: string, piece: Piece): void {
        const {row, column} = JSCoordinates(position)
        this.board[row][column] = piece
        return
    } 

    movePiece(fromPosition: string, toPosition: string) : void {
        const {row, column} = JSCoordinates(fromPosition)
        let piece = this.board[row][column]

        //If there's no piece in chosen position
        if(piece == '0') return

        //Verify if its a legal move
        if(piece.moves(this).includes(toPosition)) {  
            const fromVector = JSCoordinates(fromPosition)
            const toVector = JSCoordinates(toPosition)
            
            //isCastle? 
            if(piece.type == 'K' && toVector.subtraction(fromVector).module() == 2) {
                //Removing the castle vectors
                piece = new King(piece.position, piece.color)

                //King side castle
                if(toVector.subtraction(fromVector).row > 0) {
                    //Rook from castle
                    let rook = this.positionStatus(toVector.sum(new Vector(1,0)))
                    
                    //Remove the rook from its position
                    this.removePiece(rook.position)
                    
                    rook.position = chessCoordinates(toVector.sum(new Vector(-1,0)))
                    rook.haveMoved = true

                    //Move rook to its final position
                    this.insertPiece(rook.position, rook)
                    
                }

                //Queen Side castle
                if(toVector.subtraction(fromVector).row < 0) {
                    let rook = this.positionStatus(toVector.sum(new Vector(-2,0)))
                    
                    //Remove the rook from its position
                    this.removePiece(rook.position)
                    
                    rook.position = chessCoordinates(toVector.sum(new Vector(1,0)))
                    rook.haveMoved = true

                    //Move rook to its final position
                    this.insertPiece(rook.position, rook)
                    
                }
            }

            //If a pawn moves, it can't move 2 squares anymore
            if(piece.type = 'P') {
                piece.directions.pop()
            }

            //Update piece status
            piece.haveMoved = true
            piece.position = toPosition

            //Move piece
            this.insertPiece(toPosition, piece)
            this.removePiece(fromPosition)              
        }    

        return
    }

    //Verify if any king can perform a castle
    castleCheck() : void {
        const Kings = this.pieceOnBoard('K').filter(king => {return !king.haveMoved})
        const Rooks = this.pieceOnBoard('R').filter(rook => {return !rook.haveMoved})          
        
        if(!Kings.length) return

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
            
            //console.log(this.board[kingRow][kingColumn])
        })

        return
    }
    
}