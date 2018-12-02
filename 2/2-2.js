const texts = document.querySelector('body > pre:nth-child(1)').textContent.split("\n").filter(t => t.length > 0)
const doTheDew = (texts) => {
    for (ogText of texts) {
        for (targetText of texts) {
            let difference = 0
            ogText.split('').forEach((ogC, i) => {
                if (ogC !== targetText[i]) difference++;
            })
            if (difference === 1) {
                found = true
                commonCode = ''
                ogText.split('').forEach((ogC, i) => {
                    if (targetText[i] !== ogC) {
                        commonCode = ogText.slice(0, i) + ogText.slice(i + 1)
                    }
                })
                return {
                    ogText,
                    targetText,
                    commonCode
                };
            }
        }
    }
}