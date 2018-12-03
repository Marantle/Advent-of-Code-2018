// BEGIN boring part
const fs = require('fs');
const raw = fs.readFileSync(`${__dirname}/smallinput.txt`, 'utf8')
const lines = raw.split('\n')
const input = lines.map(line => {
  return {
    id: Number(line.substring(line.indexOf('#') + 1, line.indexOf('@')).trim()),
    x: Number(line.substring(line.indexOf('@') + 1, line.indexOf(',')).trim()),
    y: Number(line.substring(line.indexOf(',') + 1, line.indexOf(':')).trim()),
    w: Number(line.substring(line.indexOf(':') + 1, line.indexOf('x')).trim()),
    h: Number(line.substring(line.indexOf('x') + 1).trim()),
  }
})
// END boring part

const doTheDew = (input) => {
  const seen = new Set()
  const overlaps = new Set()
  for (let i = 0; i < input.length; i++) {
    const value = input[i]
    for (let ix = value.x; ix < (value.x + value.w); ix++) {
      for (let iy = value.y; iy < (value.y + value.h); iy++) {
        let square = `${ix},${iy}`
        seen.has(square) ? overlaps.add(square) : seen.add(square)
      }
    }
  }
  return overlaps.size
}

console.log('Overlapping inches: ', doTheDew(input))