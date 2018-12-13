const sum = (ar) => ar.reduce((a, b) => a + b, 0)
const fs = require('fs')
const input = fs.readFileSync(`${__dirname}/input2.txt`, 'utf8').trim().split(' ').map(v => parseInt(v))

input.length //?

const doTheDew = (input) => {
    const [ childCount, metaCount ] = input.splice(0, 2)
    let totals = 0
    for (let i = 1; i <= childCount; i++) {
        const [ total, data ] = doTheDew(input)
        input = data
        totals += total 
    }
    totals += sum(input.slice(0, metaCount))
    return [ totals/*?*/, input.slice(metaCount)] 
}
console.log(`Part 1 answer is ${doTheDew(input)[0]}`) //?
