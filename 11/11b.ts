const input = (await Deno.readTextFile('./11/11.input.txt')).split('\n\n')

type Monkey = {
  id: number
  items: number[]
  inspectCount: number
  operation: (n: number) => number
  throw: (n: number) => number
  divisor: number
}

const monkeys = input.map((group, i) => {
  const lines = group.split('\n')
  return {
    id: i,
    items: lines[1]
      .trim()
      .replace('Starting items: ', '')
      .split(',')
      .map((i) => parseInt(i)),
    inspectCount: 0,
    operation: (n: number) => {
      const [op, x] = lines[2].trim().replace('Operation: new = old ', '').split(' ')
      const amount = x === 'old' ? n : parseInt(x)
      if (op === '+') return n + amount
      if (op === '*') return n * amount
      throw new Error(`Unknown operation: ${op}`)
    },
    throw: (n: number) => {
      const testVal = parseInt(lines[3].trim().replace('Test: divisible by ', ''))
      const trueVal = parseInt(lines[4].trim().replace('If true: throw to monkey ', ''))
      const falseVal = parseInt(lines[5].trim().replace('If false: throw to monkey ', ''))
      if (n % testVal === 0) {
        return trueVal
      } else {
        return falseVal
      }
    },
    divisor: parseInt(lines[3].trim().replace('Test: divisible by ', '')),
  }
})

const mcm = monkeys.reduce((acc, m) => {
  return acc * m.divisor
}, 1)

for (let round = 0; round < 10000; round++) {
  for (const monkey of monkeys) {
    while (monkey.items.length > 0) {
      monkey.inspectCount++
      const item = monkey.items.shift()!
      const worry = monkey.operation(item) % mcm
      const target = monkey.throw(worry)
      monkeys[target].items.push(worry)
    }
  }
}

const [a, b, ..._rest] = monkeys.map((m) => m.inspectCount).sort((a, b) => b - a)
console.log(a * b)
