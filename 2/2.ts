const input = (await Deno.readTextFile('./2.input.txt')).split('\n').map(v => v.split(' '))

const shapeScore: Record<string, number> = {
    'X': 1,
    'Y': 2,
    'Z': 3,
}

const scores: Record<string, Record<string, number>> = {
    'A': {
        'X': 3,
        'Y': 6,
        'Z': 0
    },
    'B': {
        'X': 0,
        'Y': 3,
        'Z': 6
    },
    'C': {
        'X': 6,
        'Y': 0,
        'Z': 3
    },
}

const part1 = input.map(round => scores[round[0]][round[1]] + shapeScore[round[1]]).reduce((tot, n) => tot + n)
console.log(part1)