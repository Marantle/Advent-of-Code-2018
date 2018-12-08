// BEGIN boring part
const fs = require("fs")
const input = fs.readFileSync(`${__dirname}/input.txt`, "utf8")

const coordinates = input.split('\r\n').map(xy => {
  const [x, y] = xy.split(', ')
  return {
    x,
    y
  }
})

const maxX = Math.max(...coordinates.map(xy => xy.x))
const maxY = Math.max(...coordinates.map(xy => xy.y))
const minX = Math.min(...coordinates.map(xy => xy.x))
const minY = Math.min(...coordinates.map(xy => xy.y))

// END boring part


let regionSize = 0
for (let x = minX; x <= maxX; x++) {
  for (let y = minY; y <= maxY; y++) {
    const gridKey = `grid-${x}-${y}`
    const distances = []
    coordinates.forEach(xy => {
      const nodeKey = `node-${xy.x}-${xy.y}`
      const a = Math.abs(y - xy.y)
      const b = Math.abs(x - xy.x)
      const distance = a + b
      distances.push({
        target: nodeKey,
        distance
      })
    });
    const distanceToAllNodes = distances.map(d => d.distance).reduce((a, b) => a + b, 0)
    if (distanceToAllNodes < 10000) {
      regionSize++
    }
  }
}

console.log(regionSize)