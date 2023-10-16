const input = (await Deno.readTextFile('./9/9.input.txt')).split('\n')

type Coord = [number, number]
type Move = ['U' | 'D' | 'L' | 'R', number]

const head: Coord = [0, 0]
const tail: Coord = [0, 0]
const tailPositions = new Set<string>()
tailPositions.add(`${tail[0]},${tail[1]}}`) // add starting position

const distance = (a: Coord, b: Coord) => Math.max(Math.abs(a[0] - b[0]), Math.abs(a[1] - b[1]))

input.forEach((line) => {
  const move = line.split(' ') as Move
  for (let i = 0; i < move[1]; i++) {
    switch (move[0]) {
      case 'U':
        head[1]++
        break
      case 'D':
        head[1]--
        break
      case 'L':
        head[0]--
        break
      case 'R':
        head[0]++
        break
    }
    if (distance(head, tail) > 1) {
      tail[0] = tail[0] + Math.sign(head[0] - tail[0])
      tail[1] = tail[1] + Math.sign(head[1] - tail[1])
      tailPositions.add(`${tail[0]},${tail[1]}}`)
    }
  }
})

console.log(tailPositions.size)
