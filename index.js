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

function startGame() {
    rl.question('Escolha o modo de jogo:\n1 - Contra outro jogador\n2 - Contra o computador\n', (mode) => {
        gameMode = mode.trim()

        if (mode.trim() === '1') {
            rl.question('Digite o seu nome 1 Jogador: ', nameX => {
                playerXName = nameX.trim()
                rl.question('Digite o seu nome 2 Jogador: ', nameO => {
                    playerOName = nameO.trim()
                    choosePlay()
                })
            })
        }

        if (mode.trim() === '2') {
            rl.question('Digite o seu nome Jogador: ', nameX => {
                playerXName = nameX.trim()
                playerOName = 'Computador'
                choosePlay()
            })
        }

        if (mode.trim() !== '1' && mode.trim() !== '2') {
            console.log('Escolha inválida. Por favor, escolha 1 ou 2.')
            startGame()
        }
    })
}

function choosePlay() {
    printBoard()

    if (isBotTurn()) {
        return botMove()
    }

    rl.question(`Jogador ${currentPlayer === 'X' ? playerXName : playerOName}, insira sua jogada (linha e coluna): `, input => {
        const trimmedInput = input.trim()
        const inputs = trimmedInput.split(' ').map(Number)
        if (inputs.length === 2) {
            const [row, col] = inputs
            if (row >= 0 && row < 3 && col >= 0 && col < 3) {
                if (makePlay(row, col)) {
                    return resetGame()
                }
            }
        } 
        if (inputs.length !== 2) {
            console.log('\n Posicao no board invalida, escolha outra posicao! \n')
        }
    })
}

function makePlay(row, col) {
    if (board[row][col] !== ' ') {
        return console.log('\n Posicao no board já preenchida, escolha outra posicao! \n')
    }

    board[row][col] = currentPlayer

    if (getWinner(board) === currentPlayer) {
        printBoard()
        console.log(`${currentPlayer === 'X' ? playerXName : playerOName} venceu!`)
        return resetGame()
    }

    if (checkDraw()) {
        printBoard()
        console.log('Empate!')
        return true
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'

    if (!isBotTurn()) {
        choosePlay()
    }
}

function resetGame() {
    if (gameMode === 1) {
        rl.question('Vocês desejam jogar novamente? (s/n) ', (answer) => {
            if (answer.trim().toLowerCase() === 's') {
                resetBoard()
                currentPlayer = 'X'
                return choosePlay()
            }
            rl.close()
        })
    }

    rl.question('Você deseja jogar novamente? (s/n) ', (answer) => {
        if (answer.trim().toLowerCase() === 's') {
            resetBoard()
            currentPlayer = 'X'
            return choosePlay()
        }
        rl.close()
    })
}

function checkDraw() {
    return board.flat().every(cell => cell !== ' ')
}

function isBotTurn() {
    return gameMode === '2' && currentPlayer === 'O'
}

function botMove() {
    console.log('\n O computador está pensando...')
    setTimeout(() => {
        const bestMove = minimax(board, 'O')
        makePlay(Math.floor(bestMove.index / 3), bestMove.index % 3)
    }, 2000)
}

startGame()