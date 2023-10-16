const input = (await Deno.readTextFile('./9/9.input.txt')).split('\n')

type Coord = [number, number]
type Move = ['U' | 'D' | 'L' | 'R', number]

const rope: Coord[] = [
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
]
const tailPositions = new Set<string>()
tailPositions.add(`${rope[9][0]},${rope[9][1]}}`) // add starting position

const distance = (a: Coord, b: Coord) => Math.max(Math.abs(a[0] - b[0]), Math.abs(a[1] - b[1]))

input.forEach((line) => {
  const move = line.split(' ') as Move
  const head = rope[0]
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
    for (let i = 1; i < rope.length; i++) {
      const prevKnot = rope[i - 1]
      const knot = rope[i]
      if (distance(prevKnot, knot) > 1) {
        knot[0] = knot[0] + Math.sign(prevKnot[0] - knot[0])
        knot[1] = knot[1] + Math.sign(prevKnot[1] - knot[1])
      }
    }
    tailPositions.add(`${rope[9][0]},${rope[9][1]}}`) // add tail position
  }
})

console.log(tailPositions.size)
