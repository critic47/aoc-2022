const input = (await Deno.readTextFile('./2.input.txt')).split('\n').map(v => v.split(' '))

const shapeScore: Record<string, number> = {
    'A': 1,
    'B': 2,
    'C': 3,
}

const roundScore: Record<string, number> = {
    'X': 0,
    'Y': 3,
    'Z': 6,
}

const roundShape: Record<string, Record<string, string>> = {
    'A': {
        'X': 'C',
        'Y': 'A',
        'Z': 'B'
    },
    'B': {
        'X': 'A',
        'Y': 'B',
        'Z': 'C'
    },
    'C': {
        'X': 'B',
        'Y': 'C',
        'Z': 'A'
    },
}

const part2 = input.map(round => {
    const shape = roundShape[round[0]][round[1]]
    return shapeScore[shape] + roundScore[round[1]]
}).reduce((tot, n) => tot + n)
console.log(part2)