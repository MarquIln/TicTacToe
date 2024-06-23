import { getWinner } from './utils.js'

export function minimax(board, player) {
    const availableSpots = getAvailableSpots(board)
    const winner = getWinner(board)

    if (winner === 'X') return { score: -10 }
    if (winner === 'O') return { score: 10 }
    if (availableSpots.length === 0) return { score: 0 }

    const moves = []
    for (let i = 0; i < availableSpots.length; i++) {
        const move = {}
        move.index = availableSpots[i]
        const [row, col] = getRowColFromIndex(availableSpots[i])

        board[row][col] = player

        if (player === 'O') {
            const result = minimax(board, 'X')
            move.score = result.score
        } else {
            const result = minimax(board, 'O')
            move.score = result.score
        }

        board[row][col] = ' '
        moves.push(move)
    }

    let bestMove
    if (player === 'O') {
        let bestScore = -Infinity
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score
                bestMove = moves[i]
            }
        }
    } else {
        let bestScore = Infinity
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score
                bestMove = moves[i]
            }
        }
    }

    return bestMove
}

function getAvailableSpots(board) {
    const spots = []
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] === ' ') spots.push(i * 3 + j)
        }
    }
    return spots
}

function getRowColFromIndex(index) {
    return [Math.floor(index / 3), index % 3]
}
