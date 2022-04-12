import { Rook } from '../pieces/Rook'
import { Night } from '../pieces/Night'
import { Bishop } from '../pieces/Bishop'
import { Queen } from '../pieces/Queen'
import { King } from '../pieces/King'
import { Pawn } from '../pieces/Pawn'

export function initBoard() {
    const board = []

    for(let i = 0; i < 8; i++) {
        if(i == 0) {
            board.push([
                new Rook('A1', 'W'),
                new Night('B1', 'W'),
                new Bishop('C1', 'W'),
                new Queen('D1', 'W'),
                new King('E1', 'W'),
                new Bishop('F1', 'W'),
                new Night('G1', 'W'),
                new Rook('H1', 'W')
            ])
        }

        else if(i == 1) {
            board.push([
                new Pawn('A2', 'W'),
                new Pawn('B2', 'W'),
                new Pawn('C2', 'W'),
                new Pawn('D2', 'W'),
                new Pawn('E2', 'W'),
                new Pawn('F2', 'W'),
                new Pawn('G2', 'W'),
                new Pawn('H2', 'W')
            ])
        }

        else if(i == 6) {
            board.push([
                new Pawn('A7', 'B'),
                new Pawn('B7', 'B'),
                new Pawn('C7', 'B'),
                new Pawn('D7', 'B'),
                new Pawn('E7', 'B'),
                new Pawn('F7', 'B'),
                new Pawn('G7', 'B'),
                new Pawn('H7', 'B')
            ])
        }

        else if(i == 7) {
            board.push([
                new Rook('A8', 'B'),
                new Night('B8', 'B'),
                new Bishop('C8', 'B'),
                new Queen('D8', 'B'),
                new King('E8', 'B'),
                new Bishop('F8', 'B'),
                new Night('G8', 'B'),
                new Rook('H8', 'B')
            ])
        }

        else {
            board.push(['0','0','0','0','0','0','0','0'])
        }
    }

    return board
}