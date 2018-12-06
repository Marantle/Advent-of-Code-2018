// BEGIN boring part
const fs = require("fs")
const raw = fs.readFileSync(`${__dirname}/input.txt`, "utf8")
const lines = raw.split("\n")
const input = lines.map(line => {
  const [time, state] = line
    .split(/[|]|Guard|falls|wakes/)
    .map(v => v.trim().replace(/\[|\]/g, ""))
  parsedTime = new Date(time)
  timestamp = Math.round(new Date(time).getTime() / 1000)
  minute = parsedTime.getMinutes()
  return { time, parsedTime, state, timestamp, minute }
})
// END boring part
const range = (start, end) =>
  Array.from({ length: end - start }, (v, k) => k + start)
const getUpdatedSleptMinutes = (data, range) => {
  const newData = []
  for (let i = range[0]; i < range[range.length - 1]; i++) {
    newData[i] = isNaN(data[i]) ? 1 : 2
	}
  return newData
}


const guards = new Map()
sortedEvents = input.sort((a, b) => a.timestamp - b.timestamp)

let sleepTime = -1
let currentguard = ""

for (e of sortedEvents) {
  const currentState = e.state.substring(0, 1)
  switch (currentState) {
    case "#": //shift begins
      currentguard = e.state.substring(0, e.state.indexOf(" "))
      if (!guards.has[currentguard]) {
        guards.set(currentguard, [])
      }
      break
    case "a": //fell asleep
      sleepTime = e.minute
      break
    case "u": //up
      upTime = e.minute
      const data = guards.get(currentguard)
      guards.set(
        currentguard,
        getUpdatedSleptMinutes(data, range(sleepTime, upTime))
      )
      break
    default:
      break
  }
}
guards.forEach(function(value, key) {
  console.log(key + " = " + JSON.stringify(value))
})
