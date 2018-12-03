// BEGIN boring part
const fs = require('fs');
const raw = fs.readFileSync(`${__dirname}/input.txt`, 'utf8')
const lines = raw.split('\n')
const input = lines.map(line => {
  const [nan, id, x, y, w, h] = line.split(/#|@|:|,|"|x/).map(s => parseInt(s.trim()))
  return { id, x, y, w, h }
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

console.time('dew')
console.log('Overlapping inches: ', doTheDew(input))
console.timeEnd('dew')
module.exports = input