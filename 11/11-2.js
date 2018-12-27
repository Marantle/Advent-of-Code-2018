const input = 18;
const gridSize = 300;
const powerLevels = {}
for (let x = 1; x <= gridSize; x++) {
  powerLevels[x] = {}
  const rackId = x + 10
  for (let y = 1; y <= gridSize; y++) {
    const beginPower = rackId * y
    const increasedPower = beginPower + input
    const multipliedPower = increasedPower * rackId
    const hundreths = multipliedPower % 1000
    let powerLevel = -5
    if (hundreths > 99) {
      powerLevel += Math.floor(hundreths / 100)
    }
    powerLevels[x][y] = powerLevel
  }
}
const maximumPowerLevels = {}
let finalPower = 0, finalX, finalY, finalSize
for (let x = 1; x <= gridSize; x++) {
  maximumPowerLevels[x] = {}
  for (let y = 1; y <= gridSize; y++) {
    const { highestPower, highestSize } = getMaximumPower(x, y, powerLevels)
    if (highestPower > finalPower) {
      finalPower = highestPower
      finalX = x
      finalY = y
      finalSize = highestSize
    }
    maximumPowerLevels[x][y] = { highestPower, highestSize }
  }
}

console.log(`part 2 answer is ${finalX},${finalY},${finalSize}`)

function getMaximumPower(beginX, beginY, powerLevels) {
  let currentMaxX = beginX + 1
  let currentMaxY = beginY + 1
  let currentX = beginX
  let currentY = beginY
  let powerAccumulator = powerLevels[beginX][beginY]
  let highestPower = powerLevels[beginX][beginY],
    highestSize
  while (currentMaxX < gridSize && currentMaxY < gridSize) {
    for (; currentX <= currentMaxX; currentX++) {
      powerAccumulator += powerLevels[currentX][currentMaxY]
      // console.log(`added ${currentX}, ${currentMaxY}`)
    }
    for (; currentY < currentMaxY; currentY++) {
      powerAccumulator += powerLevels[currentMaxX][currentY]
      // console.log(`added ${currentMaxX}, ${currentY}`)
    }
    if (highestPower < powerAccumulator) {
      highestSize = `${currentMaxX - beginX + 1}`
      highestPower = powerAccumulator
    }
    currentMaxX++
    currentMaxY++
    currentX = beginX
    currentY = beginY
    // console.log('end')
    // if (currentMaxX > 4) break;
  }
  return {
    highestPower,
    highestSize
  }
}
