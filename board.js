export const board = [
  [' ', ' ', ' '],
  [' ', ' ', ' '],
  [' ', ' ', ' '],
]

export function printBoard() {
  console.log('Tabuleiro: \n')
  console.log('   0   1   2')
  board.forEach((row, index) => {
    console.log(index, row.map((cell) => ` ${cell} `).join('|'))
    if (index < 2) {
      console.log('  ---|---|---')
    }
  })
}

export function resetBoard() {
  for (let row = 0; row < 3; row++) {
    board[row].fill(' ');
  }
}
