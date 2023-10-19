const input = (await Deno.readTextFile('./10/10.input.txt')).split('\n')

let cycle = 0
let register = 1
let acc = 0
const cycleCheck = [20, 60, 100, 140, 180, 220]

const checkCycle = (cycle: number) => {
  if (cycleCheck.includes(cycle)) {
    acc += register * cycle
  }
}

input.forEach((line) => {
  if (line.startsWith('noop')) {
    cycle++
    checkCycle(cycle)
  } else if (line.startsWith('addx')) {
    cycle++
    checkCycle(cycle)
    cycle++
    checkCycle(cycle)
    const [, x] = line.split(' ')
    register += parseInt(x)
  }
})

console.log(cycle, acc)
