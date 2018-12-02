const texts = document.querySelector('body > pre:nth-child(1)').textContent.split("\n").filter(t => (!isNaN(t) && t.length > 1));
let result = 0;
let count = 0;
const seen = new Set();
seen.add(0);
let done = false;
while (!done) {
  count++;
  for (let t of texts) {
    result = result + parseInt(t)
    if (seen.has(result)) {
      done = true;
      break;
    }
    seen.add(result);
  }
}
console.log("part 2: ", result)