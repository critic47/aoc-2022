const input = (await Deno.readTextFile('./15/15.input.txt')).split('\n')

const manhattanDistance = (x1: number, y1: number, x2: number, y2: number) => Math.abs(x1 - x2) + Math.abs(y1 - y2)

const targetY = 2000000
const targetRow = new Set<number>()

input.forEach((line) => {
  const [x, y, xB, yB] = line.match(/[+-]?\d+/g)!.map((i) => parseInt(i))
  const r = manhattanDistance(x, y, xB, yB)
  const targetR = Math.abs(y - targetY)

  //   console.log(x, y, xB, yB, manhattanDistance(x, y, xB, yB), manhattanDistance(x, y, x, targetY))

  if (targetR < r) {
    const diff = r - targetR
    // console.log(x - diff, '-', x + diff)
    for (let i = x - diff; i < x + diff; i++) {
      targetRow.add(i)
    }
  }
})

console.log(targetRow.size)
