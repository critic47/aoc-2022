const input = (await Deno.readTextFile('./15/15.input.txt')).split('\n')

const manhattanDistance = (x1: number, y1: number, x2: number, y2: number) => Math.abs(x1 - x2) + Math.abs(y1 - y2)

type Sensor = {
  x: number
  y: number
  xB: number
  yB: number
  r: number
}

const sensors: Sensor[] = input.map((line) => {
  const [x, y, xB, yB] = line.match(/[+-]?\d+/g)!.map((i) => parseInt(i))
  const r = manhattanDistance(x, y, xB, yB)

  return { x, y, xB, yB, r }
})

const isOutOfAllSensorRange = (x: number, y: number) => {
  return sensors.reduce((isOutOfRange, sensor) => {
    return isOutOfRange && manhattanDistance(x, y, sensor.x, sensor.y) > sensor.r
  }, true)
}

const bounds = [0, 4000000]
const found = { x: 0, y: 0 }
for (const sensor of sensors) {
  for (let xScan = sensor.x - sensor.r - 1; xScan <= sensor.x + sensor.r + 1; xScan++) {
    const yScan = sensor.y + sensor.r + 1 - Math.abs(sensor.x - xScan)
    const yScan2 = sensor.y - (sensor.r - Math.abs(sensor.x - xScan) + 1)
    if (isOutOfAllSensorRange(xScan, yScan)) {
      found.x = xScan
      found.y = yScan
      break
    }
    if (isOutOfAllSensorRange(xScan, yScan2)) {
      found.x = xScan
      found.y = yScan2
      break
    }
  }
  if (found.x >= bounds[0] && found.x <= bounds[1] && found.y >= bounds[0] && found.y <= bounds[1]) {
    console.log(found.x * 4000000 + found.y)
    break
  }
}
