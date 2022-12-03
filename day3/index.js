const fs = require('fs');

// Lowercase item types a through z have priorities 1 through 26.
// Uppercase item types A through Z have priorities 27 through 52.
const ALPHABET = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
let totalPoints = 0;

const rucksacks = [];

fs.readFileSync('input.txt', 'utf-8').split(/\r?\n/).forEach(line => {
    if (line) {
        rucksacks.push(line);
        const firstLetters = [...line.substring(0, (line.length / 2))];
        const secondLetters = [...line.substring(line.length / 2)];

        const intersection = firstLetters.find(x => secondLetters.includes(x));
        if (ALPHABET.indexOf(intersection)) {
            totalPoints += ALPHABET.indexOf(intersection) + 1
        }
    }
});

const chunkSize = 3;
let prioritiesSum = 0;
let rounds = 1;

for(let i = 0; i < rucksacks.length; i += chunkSize) {
    const [first, second, third] = rucksacks.slice(i, i + chunkSize).map(line => [...line]);
    const intersection = first.find(x => second.includes(x) && third.includes(x));
    console.log(`Round ${rounds++}: Common letter: ${intersection}, worth: ${ALPHABET.indexOf(intersection) + 1}`)
    if (ALPHABET.indexOf(intersection)) {
        prioritiesSum += ALPHABET.indexOf(intersection) + 1
    }
}


console.log(prioritiesSum);
