// BEGIN boring part
const fs = require("fs")
const input = fs.readFileSync(`${__dirname}/input.txt`, "utf8")
let result = input
// END boring part
let rxString = ''
let charss = []

for (i = 0; i < 26; i++) {
    const lc = String.fromCharCode(97 + i) //?
    const uc = String.fromCharCode(65 + i) //?
    const pairs = `${lc}${uc}|${uc}${lc}`
    i === 0 ? rxString = `${pairs}` : rxString += `|${pairs}`
}
const rx = new RegExp(rxString, 'g')
while (true) {
    const beforeChange = result
    result = result.replace(rx, '')
    if (beforeChange.length === result.length) break
}

console.log(result.length) //?

