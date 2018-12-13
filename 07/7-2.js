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
let currentSecond = 0
const workerCount = [1, 2, 3, 4, 5]

const workers = workerCount.map(i => {
  return { name: `worker${i}`, workingUntil: 0, workingOn: '' }
})

// do the thing
while (doneSteps.length < stepIds.size) {
  workers.forEach(w => {
    if (currentSecond > 0 && w.workingUntil === currentSecond) {
      console.log(`${w.name} completed ${w.workingOn} at ${currentSecond}`)
      w.workingUntil = 0
      doneSteps.push(w.workingOn)
      w.workingOn = ''
    }
  })
  if (!workers.find(w => w.workingUntil <= currentSecond)) {
    currentSecond++
    continue
  }
  const completableIds = []
  stepIds.forEach(stepId => {
    const stepRequirement = stepRequirements.find(s => s.stepId === stepId)
      .requires
    if (
      !doneSteps.includes(stepId) &&
      (stepRequirement.length === 0 ||
        stepRequirement.every(sr => doneSteps.includes(sr)))
    ) {
      completableIds.push(stepId)
    }
  })
  while (
    completableIds.length > 0 &&
    workers.find(w => w.workingUntil <= currentSecond)
  ) {
    const worker = workers.find(w => w.workingUntil <= currentSecond)
    const stepToWorkOn = completableIds.shift()
    if (!workers.find(w => w.workingOn === stepToWorkOn)) {
      console.log(
        `${worker.name} begin work on ${stepToWorkOn} at ${currentSecond}`
      )
      const workDuration = stepToWorkOn.charCodeAt(0) - 4
      worker.workingUntil = currentSecond + workDuration
      worker.workingOn = stepToWorkOn
    }
  }
  currentSecond++
}
console.log(
  `part 1 answer is: ${JSON.stringify(
    doneSteps.reduce((a, v) => `${a}${v}`),
    null,
    2
  )}`
)
console.log(`part 2 answer: ${currentSecond - 1}`)
