const fs = require('fs');

// Lowercase item types a through z have priorities 1 through 26.
// Uppercase item types A through Z have priorities 27 through 52.
const ALPHABET = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
let totalPoints = 0;

fs.readFileSync('input.txt', 'utf-8').split(/\r?\n/).forEach(line => {
    if (line) {
        const firstLetters = [...line.substring(0, (line.length / 2))];
        const secondLetters = [...line.substring(line.length / 2)];

        const intersection = firstLetters.find(x => secondLetters.includes(x));
        if (ALPHABET.indexOf(intersection)) {
            totalPoints += ALPHABET.indexOf(intersection) + 1
        }
    }
});

console.log(totalPoints);
