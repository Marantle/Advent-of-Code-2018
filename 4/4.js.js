// BEGIN boring part
const fs = require("fs")
const raw = fs.readFileSync(`${__dirname}/input.txt`, "utf8")
const lines = raw.split("\n").sort()
const input = lines.map(line => {
  const [time, state] = line
    .split(/[|]|Guard|falls|wakes/)
    .map(v => v.trim().replace(/\[|\]/g, ""))
  minute = new Date(time).getMinutes()
  return {
    state,
    minute
  }
})
// END boring part
const range = (start, end) =>
  Array.from({
    length: end - start
  }, (v, k) => k + start)
const getUpdatedSleptMinutes = (data, range) => {
  if (data.includes(1)) {
    console.log(1)
  }
  const newData = [...data]
  const lastMinute = range[range.length - 1]
  for (let i = range[0]; i <= lastMinute; i++) {
    newData[i] = newData[i] + 1
  }
  return newData
}

const guards = new Map()

let sleepTime = -1
let currentguard = ""

for (e of input) {
  const currentState = e.state.substring(0, 1)
  switch (currentState) {
    case "#": //shift begins
      currentguard = e.state.substring(1, e.state.indexOf(" "))
      if (!guards.has(currentguard)) {
        guards.set(currentguard, new Array(60).fill(0))
      }
      break
    case "a": //fell asleep
      sleepTime = e.minute
      break
    case "u": //up
      upTime = e.minute
      const newData = getUpdatedSleptMinutes(guards.get(currentguard), range(sleepTime, upTime))
      guards.set(currentguard, newData)
      break
    default:
      break
  }
}
const getSum = (total, num) =>  total + num

let sleepiestGuard
let sleepiestSleptFor = 0
let consistentGuard
let consistenceSleep = 0
let consistenceMinute = -1

guards.forEach(function (minutes, guardId) {
  if (minutes.reduce(getSum) > sleepiestSleptFor) {
    sleepiestGuard = guardId
    sleepiestSleptFor = minutes.reduce(getSum)
  }
  if (consistenceSleep < Math.max(...minutes)) {
    consistenceSleep = Math.max(...minutes)
    consistentGuard = guardId
    consistenceMinute = minutes.indexOf(consistenceSleep)
  }
})

const sleepiestGuardMinutes = guards.get(sleepiestGuard)
const sleepiestMinute = sleepiestGuardMinutes.indexOf(Math.max(...sleepiestGuardMinutes))

console.log(`part 1: guard ${sleepiestGuard}, slept for total of ${sleepiestSleptFor} minutes and most on minute ${sleepiestMinute}, the answer is ${Number(sleepiestGuard) * sleepiestMinute}` )
console.log(`part 2: guard ${consistentGuard} was most consistent, and was so on minute ${consistenceMinute} with ${consistenceSleep} minutes, the answer is ${Number(consistentGuard) * consistenceMinute}`)