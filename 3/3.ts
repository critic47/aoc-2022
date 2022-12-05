const input = (await Deno.readTextFile('./3/3.input.txt')).split('\n')

const rucksacks = input.map(v => [v.substring(0, v.length / 2), v.substring(v.length/2)])

const commonItems = []

for (const r of rucksacks) {
    for (const l of r[0]) {
        if (r[1].indexOf(l) >= 0) {
            commonItems.push(l.charCodeAt(0) > 96 ? l.charCodeAt(0) - 96 : l.charCodeAt(0) - 64 + 26)
            break
        }
    }
}

console.log(commonItems.reduce((tot, n) => tot + n))

//part two
const groupBadges = []

for (let i = 0; i < input.length; ) {
    for (const l of input[i]) {
        if (input[i+1].indexOf(l) >= 0 && input[i+2].indexOf(l) >= 0) {
            groupBadges.push(l.charCodeAt(0) > 96 ? l.charCodeAt(0) - 96 : l.charCodeAt(0) - 64 + 26)
            break
        }
    }
    i = i + 3
}

console.log(groupBadges.reduce((tot, n) => tot + n))