const input = (await Deno.readTextFile('./14/14.input.txt')).split('\n')

const tiles: Set<string> = new Set()

let maxDepth = 0
for (const line of input) {
  const scans = line.split(' -> ').map((i) => i.split(',').map((j) => parseInt(j)))
  for (let scan = 0; scan < scans.length - 1; scan++) {
    const [x1, y1] = scans[scan]
    const [x2, y2] = scans[scan + 1]
    maxDepth = Math.max(maxDepth, y1, y2)
    for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
      for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
        const key = `${x},${y}`
        tiles.add(key)
      }
    }
  }
}

let [x, y] = [500, 0]
let sand = 1
while (true) {
  if (!tiles.has(`${x},${y + 1}`)) {
    y += 1
  } else if (!tiles.has(`${x - 1},${y + 1}`)) {
    x -= 1
    y += 1
  } else if (!tiles.has(`${x + 1},${y + 1}`)) {
    x += 1
    y += 1
  } else {
    tiles.add(`${x},${y}`)
    sand += 1
    x = 500
    y = 0
    continue
  }

  if (y > maxDepth) {
    sand -= 1
    break
  }
}

console.log(sand)
