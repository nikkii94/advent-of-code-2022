const fs = require('fs');
const ranges = [];

fs.readFileSync('input.txt', 'utf-8').split(/\r?\n/).forEach(line => {
    if (line) {
        const [first, second] = line.split(',');
        const firstRange = [...range(...first.split('-'))];
        const secondRange = [...range(...second.split('-'))];

        ranges.push({ firstRange, secondRange });
    }
});

function generateFirstAnswer() {
    let overlappingPairs = 0;
    ranges.forEach(({ firstRange, secondRange }) => {
        if (
            firstRange.every(n => secondRange.includes(n))
            || secondRange.every(n => firstRange.includes(n))
        ) {
            overlappingPairs++;
        }
    })

    return overlappingPairs;
}

function generateSecondAnswer() {
    let overlappingPairs = 0;
    ranges.forEach(({ firstRange, secondRange }) => {
        if (
            firstRange.some(n => secondRange.includes(n))
            || secondRange.some(n => firstRange.includes(n))
        ) {
            overlappingPairs++;
        }
    })

    return overlappingPairs;
}

console.log(`Total fully overlapping ranges: ${generateFirstAnswer()}`)
console.log(`Total overlapping ranges: ${generateSecondAnswer()}`)

function* range(start, end) {
    for (let i = +start; i <= +end; i++) {
        yield +i;
    }
}
