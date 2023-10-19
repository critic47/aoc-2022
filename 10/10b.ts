const input = (await Deno.readTextFile('./10/10.input.txt')).split('\n')

let cycle = 0
let register = 1
const pixels: string[] = []

const drawPixel = (position: number) => {
  if (register >= position - 1 && register <= position + 1) {
    pixels.push('#')
  } else {
    pixels.push('.')
  }
}

input.forEach((line) => {
  if (line.startsWith('noop')) {
    drawPixel(cycle % 40)
    cycle++
  } else if (line.startsWith('addx')) {
    drawPixel(cycle % 40)
    cycle++
    drawPixel(cycle % 40)
    cycle++
    const [, x] = line.split(' ')
    register += parseInt(x)
  }
})

for (let i = 0; i < pixels.length / 40; i++) {
  console.log(pixels.slice(i * 40, (i + 1) * 40 - 1).join(''))
}
