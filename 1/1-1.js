const texts = document.querySelector('body > pre:nth-child(1)').textContent.split("\n");
let result = 0;
for (let t of texts) {
  if (!isNaN(t) && t.length > 1) {
    result += parseInt(t)
  }
}
console.log('freq: ', result)
