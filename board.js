export const board = [
  [' ', ' ', ' '],
  [' ', ' ', ' '],
  [' ', ' ', ' '],
]

export function printBoard() {
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
    for (let col = 0; col < 3; col++) {
      board[row][col] = ' '
    }
  }
}
