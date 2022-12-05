const input = (await Deno.readTextFile('./4/4.input.txt')).split('\n').map(v => v.split(','))

let included = 0

for (const r of input) {
    const [a, b] = r.map(v => v.split('-').map(v => parseInt(v)))
    if ((a[0] >= b[0] && a[1] <= b[1]) || (a[0] <= b[0] && a[1] >= b[1])) {
        included++
    }
}

console.log(included)

// part 2
let overlapped = 0

for (const r of input) {
    const [a, b] = r.map(v => v.split('-').map(v => parseInt(v)))
    if ((a[0] >= b[0] && a[0] <= b[1]) || (a[1] >= b[0] && a[1] <= b[1]) || (b[0] >= a[0] && b[0] <= a[1]) || (b[1] >= a[0] && b[1] <= a[1])) {
        overlapped++
    }
}

console.log(overlapped)

