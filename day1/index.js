const fs = require('fs');

const calories = [];
let currentElfTotal = 0;

fs.readFileSync('input.txt', 'utf-8').split(/\r?\n/).forEach(line =>  {
    if (+line) {
        currentElfTotal += +line;
    } else {
        calories.push(currentElfTotal);
        currentElfTotal = 0;
    }
});

const [firstAnswer] = calories.sort((a, b) => a - b).reverse();
console.log(firstAnswer);

const secondAnswer = calories.sort((a, b) => a - b).reverse().slice(0, 3).reduce((acc, curr) => acc + curr, 0);
console.log(secondAnswer);


