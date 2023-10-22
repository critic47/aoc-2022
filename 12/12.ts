const input = (await Deno.readTextFile('./12/12.input.txt')).split('\n').map((line) => [...line])

type Coord = { x: number; y: number }

let start: Coord = { x: 0, y: 0 }
let end: Coord = { x: 0, y: 0 }

// Transofrm input into a map of elevations and find start and end points
const elevationMap = input.map((row, y) =>
  row.map((cell, x) => {
    if (cell === 'S') {
      start = { x, y }
      return 1
    } else if (cell === 'E') {
      end = { x, y }
      return 26
    } else {
      return cell.charCodeAt(0) - 96
    }
  })
)

const findPaths = (queue: { coord: Coord; distance: number }[]) => {
  const paths: number[] = []
  const visitedPoints: Set<string> = new Set()
  while (queue.length > 0) {
    const { coord, distance } = queue.shift()!
    const { x, y } = coord
    const key = `${x},${y}`
    const elevation = elevationMap[y][x]
    if (visitedPoints.has(key)) {
      continue
    }
    visitedPoints.add(key)
    if (x === end.x && y === end.y) {
      paths.push(distance)
    }
    const neighbors = [
      { x: x + 1, y },
      { x: x - 1, y },
      { x, y: y + 1 },
      { x, y: y - 1 },
    ]
    for (const neighbor of neighbors) {
      const { x: neighborX, y: neighborY } = neighbor
      if (
        elevationMap[neighborY] &&
        elevationMap[neighborY][neighborX] &&
        elevationMap[neighborY][neighborX] <= elevation + 1 &&
        !visitedPoints.has(`${neighborX},${neighborY}`)
      ) {
        queue.push({ coord: neighbor, distance: distance + 1 })
      }
    }
  }
  return Math.min(...paths)
}

console.log('Part 1', findPaths([{ coord: start, distance: 0 }]))

//part 2
const paths: number[] = []
for (let y = 0; y < elevationMap.length; y++) {
  for (let x = 0; x < elevationMap[y].length; x++) {
    if (elevationMap[y][x] === 1) {
      paths.push(findPaths([{ coord: { x, y }, distance: 0 }]))
    }
  }
}
console.log('Part 2', Math.min(...paths))
