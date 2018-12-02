const hasDupes = (o, m) => {
    return Object.values(o).filter(v => v === m).length > 0
}
const texts = document.querySelector('body > pre:nth-child(1)').textContent.split("\n").filter(t => t.length > 0);
const results = []
for (let text of texts) {
    const dupes = {}
    for (let c of text) {
        dupes[c] ? dupes[c] = dupes[c] + 1: dupes[c] = 1
    }    
    results.push(dupes)
}
const doubleBoxes = results.filter(c => hasDupes(c, 2))
const tripleBoxes = results.filter(c => hasDupes(c, 3))
const doubleCount = doubleBoxes.length
const tripleCount = tripleBoxes.length
console.log(doubleCount, tripleCount, doubleCount * tripleCount)
