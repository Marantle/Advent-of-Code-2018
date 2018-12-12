const assert = require('assert')

const input = [468, 71010]
const megaInput = [468, 7101000]
const exampleInputs = [
  [7, 25, 32],
  [10, 1618, 8317],
  [13, 7999, 146373],
  [17, 1104, 2764],
  [21, 6111, 54718],
  [30, 5807, 37305],
]

const doTheThing = ([players, marbles]) => {
  const scores = new Array(players).fill(0)
  let currentMarble = {
    value: 0,
  }
  currentMarble.next = currentMarble
  currentMarble.prev = currentMarble
  
  for (let marble = 1; marble <= marbles; marble++) {
    let currentPlayer = marble % players
    if (marble % 23 === 0) {
      scores[currentPlayer] += marble
      // currentMarble = currentMarble.prev.prev.prev.prev.prev.prev
      currentMarble = goBack(5, currentMarble)
      scores[currentPlayer] += currentMarble.prev.value
      currentMarble.prev.prev.next = currentMarble
      currentMarble.prev = currentMarble.prev.prev
    } else {
      currentMarble = addAfter(marble, currentMarble.next)
    }
  }
  return Math.max(...scores)
}
const addAfter = (value, marble) => {
  const toAdd = {
    value,
    prev: marble,
    next: marble.next,
  }
  marble.next.prev = toAdd
  marble.next = toAdd
  return toAdd
}
const goBack = (times, marble) => {
  while (times-- >= 0) {
    marble = marble.prev
  }
  return marble
}

for (example of exampleInputs) {
  assert.strictEqual(doTheThing(example), example[2])
}

console.log(doTheThing(input))
console.log(doTheThing(megaInput))
