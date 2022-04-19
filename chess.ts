import { Board } from './board/Board'
import { Piece } from './Piece'
import { Rook } from './pieces/Rook'

//const board = new Board()

const board = new Board()
const Pawn = board.board[1][0]
//const Rook = board.board[0][0]
const Queen = board.board[0][3]
const bPawn = board.board[6][0]
const Night = board.board[0][1]
const King = board.board[0][4]

board.insertPiece('E6', new Rook('E6', 'W'))

board.removePiece('D1')
board.removePiece('F1')
board.removePiece('G1')
board.removePiece('F2')
board.removePiece('C1')
board.removePiece('B1')

//board.removePiece('A2')

//console.log(Queen)

//Rook.moves(board)

//King.moves(board)
//board.castleCheck()
board.show(5, 7)
board.board[6][3].moves(board)
board.movePiece('D7', 'E6')

console.log('-------------------------')
//board.movePiece('E1', 'C1')
//board.movePiece('C1', 'D2')
board.show()
board.board[5][4].moves(board)
board.board[7][4].moves(board)
board.board[7][2].moves(board)
board.board[7][3].moves(board)

console.log('-------------------------')
board.movePiece('E6', 'E5')
board.movePiece('C7', 'C5')
board.board[7][3].moves(board)

board.show()

