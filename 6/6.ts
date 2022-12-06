const input = (await Deno.readTextFile('./6/6.input.txt'))

console.log(input)

//part 1
for (let i = 0; i < input.length-3; i++) {
    console.log(input.substring(i, i+4))
    const s = new Set(input.substring(i, i+4))
    if (s.size === 4) {
        console.log(i+4)
        break
    }
}

//part 2
for (let i = 0; i < input.length-13; i++) {
    console.log(input.substring(i, i+14))
    const s = new Set(input.substring(i, i+14))
    if (s.size === 14) {
        console.log(i+14)
        break
    }
}