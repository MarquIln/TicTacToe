import { createInterface } from 'readline'
import { board, printBoard, resetBoard } from './board.js'
import { minimax } from './bot.js'
import { getWinner } from './utils.js'

let currentPlayer = 'X'
let playerXName
let playerOName
let gameMode

const rl = createInterface({
    input: process.stdin,
    output: process.stdout
})

function promptPlayerNames() {
    rl.question('Escolha o modo de jogo:\n1 - Contra outro jogador\n2 - Contra o computador\n', (mode) => {
        gameMode = mode.trim()

        if (mode.trim() === '1') {
            rl.question('Digite o seu nome 1 Jogador: ', nameX => {
                playerXName = nameX.trim()
                rl.question('Digite o seu nome 2 Jogador: ', nameO => {
                    playerOName = nameO.trim()
                    promptMove()
                })
            })
        }

        if (mode.trim() === '2') {
            rl.question('Digite o seu nome Jogador: ', nameX => {
                playerXName = nameX.trim()
                playerOName = 'Computador'
                promptMove()
            })
        }

        if (mode.trim() !== '1' && mode.trim() !== '2') {
            console.log('Escolha inválida. Por favor, escolha 1 ou 2.')
            promptPlayerNames()
        }
    })
}

function promptMove() {
    printBoard()
    if (isBotTurn()) {
        performBotMove()
    }
    rl.question(`\n Jogador ${currentPlayer === 'X' ? playerXName : playerOName}, insira sua jogada (linha e coluna): `, input => {
        const trimmedInput = input.trim()
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
        console.log('\n Posicao no board invalida, escolha outra posicao! \n')
        promptMove()
    })
}

function makeMove(row, col) {
    if (board[row][col] !== ' ') {
        return console.log('\n Posicao no board já preenchida, escolha outra posicao! \n')
    }

    board[row][col] = currentPlayer

    if (getWinner(board) === currentPlayer) {
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

    if (!isBotTurn()) {
        promptMove()
    }
}

function checkDraw() {
    return board.flat().every(cell => cell !== ' ')
}

function resetGame() {
    if (gameMode === 1) {
        rl.question('Vocês desejam jogar novamente? (s/n) ', (answer) => {
            if (answer.trim().toLowerCase() === 's') {
                resetBoard()
                currentPlayer = 'X'
                return promptMove()
            }
            rl.close()
        })
    }
    rl.question('Você deseja jogar novamente? (s/n) ', (answer) => {
        if (answer.trim().toLowerCase() === 's') {
            resetBoard()
            currentPlayer = 'X'
            return promptMove()
        }
        rl.close()
    })
}

function isBotTurn() {
    return gameMode === '2' && currentPlayer === 'O'
}

function performBotMove() {
    const bestMove = minimax(board, 'O')
    makeMove(Math.floor(bestMove.index / 3), bestMove.index % 3)
}

promptPlayerNames()
