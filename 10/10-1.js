let globalData
const getAreas = coord => {
  const minX = Math.min(...coord.map(i => i.x))
  const minY = Math.min(...coord.map(i => i.y))
  const maxX = Math.max(...coord.map(i => i.x))
  const maxY = Math.max(...coord.map(i => i.y))
  return [Math.abs(minX - maxX) * Math.abs(minY - maxY), getNextArea(coord)]
}
const getNextArea = coord => {
  const minX = Math.min(...coord.map(i => i.x + i.vx))
  const minY = Math.min(...coord.map(i => i.y + i.vy))
  const maxX = Math.max(...coord.map(i => i.x + i.vx))
  const maxY = Math.max(...coord.map(i => i.y + i.vy))
  return Math.abs(minX - maxX) * Math.abs(minY - maxY)
}

function setup() {
  fetch('input.txt')
    .then(r => r.text())
    .then(data => {
      data = data.trim().split('\n').map(line => {
          let [x, y, vx, vy] = line.match(/-?\d+/g).map(Number)
          return { x, y, vx, vy }
        })
      let [area, nextArea] = getAreas(data)
      let secondsPassed = 0
      while (nextArea < area) {
        secondsPassed++
        for (let light of data) {
          light.x += light.vx
          light.y += light.vy
        }
        ;[area, nextArea] = getAreas(data)
      }
      globalData = data
      console.log(`It took ${secondsPassed} for the message to appear`)
    })
  createCanvas(800, 800)
}

function draw() {
    scale(2)
  if (globalData) {
    background(220)
    for (let light of globalData) {
      point(light.x, light.y)
    }
  }
}
