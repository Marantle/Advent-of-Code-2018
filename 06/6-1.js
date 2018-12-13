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
// END boring part
const getLargestArea = (coordinates, mod = 0) => {
  const maxX = Math.max(...coordinates.map(xy => xy.x)) + mod
  const maxY = Math.max(...coordinates.map(xy => xy.y)) + mod
  const minX = Math.min(...coordinates.map(xy => xy.x)) - mod
  const minY = Math.min(...coordinates.map(xy => xy.y)) - mod
  const grid = {}
  for (let x = minX; x <= maxX; x++) {
    for (let y = minY; y <= maxY; y++) {
      const gridKey = `grid-${x}-${y}`
      const distances = {}
      coordinates.forEach(xy => {
        const nodeKey = `node-${xy.x}-${xy.y}`
        const a = Math.abs(y - xy.y)
        const b = Math.abs(x - xy.x)
        const distance = a + b
        distances[nodeKey] = distance
      });
      const nearestDistance = Math.min(...Object.values(distances))
      const nearestNodes = Object.entries(distances).filter(([key, value]) => value === nearestDistance)
      let nearestNode = '#'
      if (nearestNodes.length === 1) {
        nearestNode = nearestNodes[0][0]
      }
      grid[gridKey] = nearestNode
    }
  }
  const occurences = {}
  coordinates.forEach(xy => {
    const nodeKey = `node-${xy.x}-${xy.y}`
    occurences[nodeKey] = Object.values(grid).filter(g => g === nodeKey).length
  });

  return occurences
}

const getFiniteArea = (areas1, areas2) => {
  const finiteAreas = {}
  Object.keys(areas1).forEach(key => {
    if (areas1[key] === areas2[key]) {
      finiteAreas[key] = areas1[key]
    }
  })
  return finiteAreas
}
const areas1 = getLargestArea(coordinates)
const areas2 = getLargestArea(coordinates, 1)


console.log(Math.max(...Object.values(getFiniteArea(areas1, areas2))))