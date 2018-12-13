const assert = require('assert');

const input = [468, 71010]
const exampleInputs = [
  [7, 25, 32],
  [10, 1618, 8317],
    [13, 7999, 146373],
    [17, 1104, 2764],
    [21, 6111, 54718],
    [30, 5807, 37305],
]

const doTheThing = ([players, marbleCount]) => {
  const scores = new Array(players).fill(0)
  const marbles = [0]
  let currentMarbleIx = 0
  for (let marble = 1; marble <= marbleCount; marble++) {
    if (marble % 23 === 0) {
      const removeIx = getRemoveIndex(marbles, currentMarbleIx)
      const removedMarble = marbles.splice(removeIx, 1)
      scores[marble % players] += marble + parseInt(removedMarble)
      currentMarbleIx = removeIx
    } else {
      currentMarbleIx = getInsertIndex(marbles, currentMarbleIx)
      marbles.splice(currentMarbleIx, 0, marble)
    }
  }
  return Math.max(...scores)
}

const getRemoveIndex = (ar, currentMarbleIx) => {
  let newIx = currentMarbleIx - 7
  if (newIx < 0) newIx = ar.length - Math.abs(newIx )

  return newIx
}

const getInsertIndex = (ar, currentMarbleIx) => {
  let newIx = currentMarbleIx + 2
  if (newIx > ar.length) newIx -= ar.length
  return newIx
}

for (example of exampleInputs) {
  assert.strictEqual(doTheThing(example), example[2])
}

console.log(doTheThing(input))
