const element = document.querySelector('body > pre:nth-child(1)');
const text = element.textContent;
const texts = text.split("\n");
let result = 0;
for (let t of texts) {
  if (!isNaN(t) && t.length > 1) {
    console.log('val', parseInt(t))
    result += parseInt(t)
  }
}
console.log(result)