import { createInterface } from 'readline'
import { board, printBoard, resetBoard } from './board.js'

let currentPlayer = 'X'
let playerXName = ''
let playerOName = ''

const rl = createInterface({
    input: process.stdin,
    output: process.stdout
})

function promptPlayerNames() {
    rl.question('Digite o nome do jogador X: ', nameX => {
        playerXName = nameX.trim()
        rl.question('Digite o nome do jogador O: ', nameO => {
            playerOName = nameO.trim()
            promptMove()
        })
    })
}

promptPlayerNames()

function promptMove() {
    printBoard()
    rl.question(`Jogador ${currentPlayer === 'X' ? playerXName : playerOName}, insira sua jogada (linha e coluna): `, input => {
        const trimmedInput = input.trim();
        const inputs = trimmedInput.split(' ').map(Number)
        if (inputs.length === 2) {
            const [row, col] = inputs
            if (row >= 0 && row < 3 && col >= 0 && col < 3) {
                if (makeMove(row, col)) {
                    return resetGame()
                }
                return promptMove()
            }
        }
        console.log('Entrada inválida, tente novamente.')
        promptMove()
    })
}

function makeMove(row, col) {
    if (board[row][col] !== ' ') {
        console.log('Movimento inválido, tente novamente.')
        return false
    }

    board[row][col] = currentPlayer

    if (checkWin(currentPlayer)) {
        printBoard()
        console.log(`Jogador ${currentPlayer === 'X' ? playerXName : playerOName} venceu!`)
        return true
    }

    if (checkDraw()) {
        printBoard()
        console.log('Empate!')
        return true
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
    return false
}

function checkWin(player) {
    for (let row of board) {
        if (row.every(cell => cell === player)) return true
    }

    for (let col = 0; col < 3; col++) {
        if (board[0][col] === player && board[1][col] === player && board[2][col] === player) return true
    }

    if (board[0][0] === player && board[1][1] === player && board[2][2] === player) return true
    if (board[0][2] === player && board[1][1] === player && board[2][0] === player) return true

    return false
}

function checkDraw() {
    return board.flat().every(cell => cell !== ' ')
}

function resetGame() {
    rl.question('Você deseja jogar novamente? (s/n) ', (answer) => {
        if (answer.trim().toLowerCase() === 's') {
            resetBoard()
            currentPlayer = 'X'
            return promptMove()
        } 
        rl.close()
    })
}

promptMove()