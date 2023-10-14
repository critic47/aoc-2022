const input = (await Deno.readTextFile('./8/8.input.txt')).split('\n')

const grid = input.map((line) => line.split('').map((t) => parseInt(t)))

const checkSlice = (columm_from: number, column_to: number, row_from: number, row_to: number, val: number) => {
  for (let i = columm_from; i < column_to; i++) {
    for (let j = row_from; j < row_to; j++) {
      if (val <= grid[i][j]) {
        return false
      }
    }
  }

  return true
}

let visibles = 0
// Ignoring the edges of the grid
for (let i = 1; i < grid.length - 1; i++) {
  for (let j = 1; j < grid[i].length - 1; j++) {
    if (
      checkSlice(0, i, j, j + 1, grid[i][j]) || // up
      checkSlice(i + 1, grid.length, j, j + 1, grid[i][j]) || // down
      checkSlice(i, i + 1, 0, j, grid[i][j]) || // left
      checkSlice(i, i + 1, j + 1, grid[i].length, grid[i][j]) // right
    ) {
      visibles++
    }
  }
}

console.log(visibles + (grid.length + grid[0].length - 2) * 2) // VISIBLES + EDGES
