const input = (await Deno.readTextFile('./1.input.txt')).split('\n')

const elves: number[] = []

let currentElf = 0
let max = 0
let top3: [number, number, number] = [0, 0, 0]
for(const v of input) {
    const val = parseInt(v)
    if (!isNaN(val)) {
        elves[currentElf] = (elves[currentElf] || 0) + val
    } else {
        const [a, b, c] = top3
        max = elves[currentElf] > max ? elves[currentElf] : max
        if (elves[currentElf] > a) {
            top3 = [elves[currentElf], a, b]
        } else if (elves[currentElf] > b) {
            top3 = [a, elves[currentElf], b]
        } else if (elves[currentElf] > c) {
            top3 = [a, b, elves[currentElf]] 
        }
        currentElf++
    }
}

// question 1
console.log('Max:', max)
// question 2
console.log('Top3 total:', top3.reduce((tot, n) => tot + n, 0))