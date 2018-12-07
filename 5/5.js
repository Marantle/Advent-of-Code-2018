// BEGIN boring part
const fs = require("fs")
const input = fs.readFileSync(`${__dirname}/input.txt`, "utf8")

// END boring part
const doPart1 = (input) => {
    let result = input
    let rxString = ''
    let part2Rx = []
    for (i = 0; i < 26; i++) {
        const lc = String.fromCharCode(97 + i) 
        const uc = String.fromCharCode(65 + i) 
        const pairs = `${lc}${uc}|${uc}${lc}`
        i === 0 ? rxString = `${pairs}` : rxString += `|${pairs}`
        part2Rx.push(`${lc}|${uc}`)
    }
    const rx = new RegExp(rxString, 'g')
    while (true) {
        const beforeChange = result
        result = result.replace(rx, '')
        if (beforeChange.length === result.length) break
    }

    return { result, part2Rx }
}
const { result: reducedPolymer , part2Rx } = doPart1(input)
console.log(`part 1 answer: ${reducedPolymer.length}`) //?

const doPart2 = (input, part2Rx) => {
    result = input
    let shortestLength = result.length
    let shortestPolymer
    for (let i = 0; i < part2Rx.length; i++) {
        const dualRx = part2Rx[i];
        const cleanedPolymer = result.replace(new RegExp(dualRx, 'g'), '')
        const { result: cleanedReducedPolymer } = doPart1(cleanedPolymer)
        const newLength = cleanedReducedPolymer.length
        console.log(`shortest ${newLength} after ${dualRx}`)
        if (newLength < shortestLength) {
            shortestLength = newLength
            shortestPolymer = cleanedReducedPolymer
        }
    }

    return shortestPolymer 
}
const cleanedReducedPolymer = doPart2(reducedPolymer, part2Rx)
console.log(`part 2 answer: ${cleanedReducedPolymer.length}`)