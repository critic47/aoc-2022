const input = (await Deno.readTextFile('./13/13.input.txt')).split('\n\n')

type Pairs = { left: number[]; right: number[] }[]

const pairs = input.map((group) => {
  const lines = group.split('\n')
  return { left: JSON.parse(lines[0]), right: JSON.parse(lines[1]) }
})

const compareArrays = (a: (number | number[])[], b: (number | number[])[]): boolean | undefined => {
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    const left = a[i]
    const right = b[i]
    // console.log(left, right, typeof left, typeof right)
    if (left === undefined && right !== undefined) {
      return true
    } else if (left !== undefined && right === undefined) {
      return false
    } else {
      if (typeof left === 'number') {
        if (typeof right === 'number') {
          if (left < right) return true
          if (left > right) return false
        } else {
          const decision = compareArrays([left], right)
          if (decision !== undefined) return decision
        }
      } else {
        if (typeof right === 'number') {
          const decision = compareArrays(left, [right])
          if (decision !== undefined) return decision
        } else {
          const decision = compareArrays(left, right)
          if (decision !== undefined) return decision
        }
      }
    }
  }
  return undefined
}

const result = pairs
  .map((pair, i) => {
    const { left, right } = pair
    const ordered = compareArrays(left, right)
    return ordered ? i + 1 : 0
  })
  .reduce((acc, i) => acc + i, 0)

console.log(result)

// part 2
const input2 = (await Deno.readTextFile('./13/13.input.txt'))
  .replace(/(^[ \t]*\n)/gm, '')
  .split('\n')
  .map((line) => JSON.parse(line))
input2.push([[2]], [[6]])
input2.sort((a, b) => (compareArrays(a, b) ? -1 : 1))

console.log(
  input2.reduce((acc, line, index) => {
    if (line.length === 1 && Array.isArray(line[0]) && line[0].length === 1 && (line[0][0] === 2 || line[0][0] === 6)) {
      return acc * (index + 1)
    }
    return acc
  }, 1)
)
