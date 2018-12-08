const sum = ar => ar.reduce((a, b) => a + b, 0)
const fs = require('fs')
const input = fs
  .readFileSync(`${__dirname}/input.txt`, 'utf8')
  .trim()
  .split(' ')
  .map(v => parseInt(v))

const doTheDew = input => {
  const [childCount, metaCount] = input.splice(0, 2)
  const rootValues = []
  for (let i = 1; i <= childCount; i++) {
    const [data, rootValue] = doTheDew(input)
    input = data
    rootValues.push(rootValue)
  }
  let output
  if (childCount === 0) {
    output = [input.slice(metaCount), sum(input.slice(0, metaCount))]
  } else {
    const rootValue = sum(
      input
        .slice(0, metaCount)
        .filter(m => m > 0 && m <= rootValues.length)
        .map(m => rootValues[m - 1])
    )
    output = [input.slice(metaCount), rootValue]
  }
  return output
}

console.log(`Part 2 answer: ${doTheDew(input)[1]}`)
