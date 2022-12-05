const input = (await Deno.readTextFile('./5/5.input.txt'))

const [topHalf, rest] = input.split("\n\n")

const inputRows = topHalf.split("\n").reverse().slice(1).map(v => v.match(/.{1,4}/g)) as string[][]

const stacks: string[][] = []

for (let i = 0; i < inputRows[0]?.length; i++) {
    const row: string[] = []
    inputRows.forEach(x => x[i].trim() ? row.push(x[i].trim().replace('[', '').replace(']', '')) : null)
    stacks.push(row)
}

console.log(stacks)

const procedures = (rest.split('\n').map(v => v.match(/\d+/g)) as string[][]).map(v => v.map(w => parseInt(w)))
procedures.forEach(p => {
    const [n, from, to] = p
    const picked = stacks[from - 1].splice(stacks[from - 1].length - n);
    stacks[to-1] = stacks[to-1].concat(picked.reverse())
})

console.log(
    stacks.reduce((str, v) => {
        return str + "" + v[v.length-1]
    }, '')
)