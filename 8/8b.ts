const input = (await Deno.readTextFile('./8/8.input.txt')).split('\n')

const grid = input.map((line) => line.split('').map((t) => parseInt(t)))

let max_score = 0
// Ignoring the edges of the grid (distance 0)
for (let i = 1; i < grid.length - 1; i++) {
  for (let j = 1; j < grid[i].length - 1; j++) {
    let left_score = 0
    for (let r = j - 1; r >= 0; r--) {
      left_score++
      if (grid[i][r] >= grid[i][j]) {
        break
      }
    }
    let right_score = 0
    for (let r = j + 1; r < grid[i].length; r++) {
      right_score++
      if (grid[i][r] >= grid[i][j]) {
        break
      }
    }
    let up_score = 0
    for (let c = i - 1; c >= 0; c--) {
      up_score++
      if (grid[c][j] >= grid[i][j]) {
        break
      }
    }
    let down_score = 0
    for (let c = i + 1; c < grid.length; c++) {
      down_score++
      if (grid[c][j] >= grid[i][j]) {
        break
      }
    }

    max_score = Math.max(max_score, left_score * right_score * up_score * down_score)
  }
}

console.log(max_score) // VISIBLES + EDGES
