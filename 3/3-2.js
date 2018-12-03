const input = require('./3-1.js')

const doTheDew = (input) => {
  const seenCount = {}
  for (let i = 0; i < input.length; i++) {
    const value = input[i]
    for (let ix = value.x; ix < (value.x + value.w); ix++) {
      for (let iy = value.y; iy < (value.y + value.h); iy++) {
        let square = `${ix},${iy}`
        seenCount[square] ? seenCount[square]++ : seenCount[square] = 1
      }
    }
  }
  const loneClaim = value => {
    for (let ix = value.x; ix < (value.x + value.w); ix++) {
      for (let iy = value.y; iy < (value.y + value.h); iy++) {
        let square = `${ix},${iy}`
        if (seenCount[square] > 1) return false
      }
    }
    return true
  }

  return input.filter(loneClaim)
}

console.log('Lone claim: ', doTheDew(input))