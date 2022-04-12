import { Board } from './board/Board'

//const board = new Board()

const board = new Board()
const Pawn = board.board[1][0]
const Rook = board.board[0][0]
const Queen = board.board[0][3]
const bPawn = board.board[6][0]
const Night = board.board[0][1]
const King = board.board[0][4]

board.removePiece('D2')
board.removePiece('D1')
board.removePiece('F1')
board.removePiece('G1')

//board.removePiece('A2')

//console.log(Queen)

//Rook.moves(board)

//King.moves(board)
board.castle()
King.moves(board)
