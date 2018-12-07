// BEGIN boring part
const concat = (x, y) => x.concat(y)

const flatMap = (f, xs) => xs.map(f).reduce(concat, [])

Array.prototype.flatMap = function(f) {
  return flatMap(f, this)
}

const fs = require('fs')
const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8').split('\n')
// END boring part

// split to objects
const steps = input.map(line => {
  const [, id, , enables, ,] = line.split(/Step | must|step | can/)
  return { id, enables }
})
// collect and sort all stepIds for the set
const collect = [...steps.map(s => s.enables), ...steps.map(s => s.id)].sort()

const stepIds = new Set(collect)
const doneSteps = []

// map to each stepId its required stepIds
const stepRequirements = [...stepIds].map(stepId => {
  const requires = steps
    .filter(step => step.enables === stepId)
    .map(step => step.id)
  return { stepId, requires }
})

// do the thing
while (doneSteps.length < stepIds.size) {
  const completableIds = []
  stepIds.forEach(stepId => {
    const stepRequirement = stepRequirements.find(s => s.stepId === stepId).requires //?
    if (!doneSteps.includes(stepId) && (stepRequirement.length === 0 || stepRequirement.every(sr => doneSteps.includes(sr)))) {
      completableIds.push(stepId)
    }
  });
  if (completableIds.length > 0)
    doneSteps.push(completableIds[0])
}
console.log(`answer is: ${JSON.stringify(doneSteps.reduce((a, v) => `${a}${v}`), null, 2)}`)
