const input = 1308;
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
    if (x == 33 && y == 45) {
      console.log(beginPower)
      console.log(increasedPower)
      console.log(multipliedPower)
      console.log(hundreths)
      console.log(powerLevel)
    }
    powerLevels[x][y] = powerLevel
  }
}
const totalPowerLevels = {}
let highestPower = 0
let highestX = 0
let highestY = 0
for (let x = 1; x <= gridSize; x++) {
  if (x > gridSize - 3) continue;
  totalPowerLevels[x] = {}
  for (let y = 1; y <= gridSize; y++) {
    totalPowerLevels[x][y] = 0
    for (let xx = x; xx < x + 3; xx++) {
      for (let yy = y; yy < y + 3; yy++) {
        if (powerLevels[xx] && powerLevels[xx][yy])
          totalPowerLevels[x][y] += powerLevels[xx][yy]
      }
    }
    if (totalPowerLevels[x][y] > highestPower) {
      highestPower = totalPowerLevels[x][y]
      highestX = x
      highestY = y
    }
  }
}
console.log(  totalPowerLevels[21][61])
console.log(highestPower)
console.log(highestX)
console.log(highestY)
